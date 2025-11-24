"use client";

import React, { useState } from "react";
import { useFriendsStore } from "@/store/friends";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/components/modals/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFriendModal({
  isOpen,
  onClose,
}: AddFriendModalProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const addFriend = useFriendsStore((s) => s.addFriend);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = username.trim();
    if (!trimmed) {
      setError("Please enter a username");
      return;
    }

    // Validate format (username#1234)
    if (!trimmed.includes("#")) {
      setError("Please use format: Username#1234");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newFriend = {
      id: uuidv4(),
      username: trimmed.split("#")[0],
      tag: `#${trimmed.split("#")[1] || "0000"}`,
      avatar: null,
      status: "offline" as const,
      lastMessage: "",
      unread: 0,
    };

    addFriend(newFriend);
    setLoading(false);
    setUsername("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Friend" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-[#b5bac1]">
          You can add friends with their Discord username.
        </p>

        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username#1234"
          error={error}
          required
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Send Friend Request
          </Button>
        </div>
      </form>
    </Modal>
  );
}
