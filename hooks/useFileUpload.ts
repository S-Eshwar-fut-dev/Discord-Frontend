"use client";

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export interface UploadFile {
  id: string;
  file: File;
  url?: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

interface UseFileUploadReturn {
  files: UploadFile[];
  uploading: boolean;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  uploadFiles: () => Promise<Array<{ url: string; filename: string }>>;
  clearFiles: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/zip",
];

export function useFileUpload(): UseFileUploadReturn {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const uploading = files.some((f) => f.status === "uploading");

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "File type not allowed";
    }
    return null;
  };

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const total = prev.length + newFiles.length;
      if (total > MAX_FILES) {
        alert(`Maximum ${MAX_FILES} files allowed`);
        return prev;
      }

      const validated = newFiles.map((file) => ({
        id: uuidv4(),
        file,
        progress: 0,
        status: "pending" as const,
        error: validateFile(file) || undefined,
      }));

      return [...prev, ...validated];
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const uploadFiles = useCallback(async () => {
    const pendingFiles = files.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) return [];

    const results: Array<{ url: string; filename: string }> = [];

    for (const uploadFile of pendingFiles) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: "uploading", progress: 0 }
            : f
        )
      );

      try {
        // Simulate upload with progress
        const url = await simulateUpload(uploadFile.file, (progress) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f))
          );
        });

        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, url, status: "success", progress: 100 }
              : f
          )
        );

        results.push({ url, filename: uploadFile.file.name });
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Upload failed",
                }
              : f
          )
        );
      }
    }

    return results;
  }, [files]);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    uploading,
    addFiles,
    removeFile,
    uploadFiles,
    clearFiles,
  };
}

// Mock upload function - replace with real API
async function simulateUpload(
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Generate a mock URL
        const url = URL.createObjectURL(file);
        resolve(url);
      }
    }, 100);
  });
}
