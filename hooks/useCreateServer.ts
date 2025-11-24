"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGuild } from "@/services/api/guilds";
import { createChannel } from "@/services/api/channels";
import { useFileUpload } from "@/hooks/useFileUpload";

export function useCreateServer(onClose: () => void) {
  const router = useRouter();
  const [step, setStep] = useState<"start" | "customize">("start");
  const [serverName, setServerName] = useState("");
  const [loading, setLoading] = useState(false);

  // Reuse existing upload hook for the icon
  const { files, addFiles, uploadFiles, removeFile } = useFileUpload();
  const iconFile = files[0];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverName.trim()) return;

    setLoading(true);
    try {
      let iconUrl = undefined;
      if (iconFile) {
        const uploaded = await uploadFiles();
        if (uploaded.length > 0) {
          iconUrl = uploaded[0].url;
        }
      }

      // 2. Create Guild
      const guild = await createGuild({
        name: serverName,
        icon: iconUrl,
      });

      // 3. Create Default Channels
      await createChannel({ guildId: guild.id, name: "general", type: "text" });
      await createChannel({
        guildId: guild.id,
        name: "General",
        type: "voice",
      });

      // 4. Redirect & Close
      router.push(`/channels/${guild.id}`);
      onClose();

      // Reset State
      setStep("start");
      setServerName("");
      if (iconFile) removeFile(iconFile.id);
    } catch (error) {
      console.error("Failed to create server:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    serverName,
    setServerName,
    iconFile,
    addFiles,
    loading,
    handleCreate,
  };
}
