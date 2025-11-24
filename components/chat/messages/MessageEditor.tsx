"use client";

import React, { useState, useRef, useEffect } from "react";

interface MessageEditorProps {
  initialContent: string;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}

export default function MessageEditor({
  initialContent,
  onSave,
  onCancel,
}: MessageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-focus and resize on mount
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleSave = () => {
    if (content.trim() === "") return; // Don't save empty
    if (content.trim() === initialContent) {
      onCancel(); // No change
      return;
    }
    onSave(content.trim());
  };

  return (
    <div className="w-full bg-[#383a40] rounded-[4px] mt-1 p-2 pr-4">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          adjustHeight();
        }}
        onKeyDown={handleKeyDown}
        rows={1}
        className="w-full bg-transparent text-[#dbdee1] resize-none outline-none font-light text-[15px] leading-[1.375rem] custom-scroll overflow-hidden"
      />
      <div className="text-[11px] text-[#b5bac1] mt-2">
        escape to{" "}
        <span
          className="text-[#00a8fc] hover:underline cursor-pointer"
          onClick={onCancel}
        >
          cancel
        </span>{" "}
        • enter to{" "}
        <span
          className="text-[#00a8fc] hover:underline cursor-pointer"
          onClick={handleSave}
        >
          save
        </span>
      </div>
    </div>
  );
}
