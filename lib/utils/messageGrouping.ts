import type { ChatMessage } from "@/types/chat";

export function shouldGroupMessages(
  current: ChatMessage,
  previous?: ChatMessage
): boolean {
  if (!previous) return false;

  // Different authors
  if (current.author.id !== previous.author.id) return false;

  // More than 7 minutes apart
  const currentTime = new Date(current.createdAt).getTime();
  const previousTime = new Date(previous.createdAt).getTime();
  const diffMinutes = (currentTime - previousTime) / (1000 * 60);

  return diffMinutes < 7;
}

export function getDaySeparator(date: string): string {
  const messageDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time for comparison
  const resetTime = (d: Date) => {
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const messageDateReset = resetTime(new Date(messageDate));
  const todayReset = resetTime(new Date(today));
  const yesterdayReset = resetTime(new Date(yesterday));

  if (messageDateReset.getTime() === todayReset.getTime()) {
    return "Today";
  } else if (messageDateReset.getTime() === yesterdayReset.getTime()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
}

export function shouldShowDaySeparator(
  current: ChatMessage,
  previous?: ChatMessage
): boolean {
  if (!previous) return true;

  const currentDay = new Date(current.createdAt).toDateString();
  const previousDay = new Date(previous.createdAt).toDateString();

  return currentDay !== previousDay;
}
