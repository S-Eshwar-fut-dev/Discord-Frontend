"use client";

import { useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import MessageItem, { ChatMessage } from "./MessageItem";
import React from "react";

export default function MessageListVirtual({
  messages,
}: {
  messages: ChatMessage[];
}) {
  const [hasTopShadow, setHasTopShadow] = useState(false);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const Scroller = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(function Scroller(props, ref) {
    return <div ref={ref} {...props} />;
  });

  return (
    <div className="h-full w-full relative min-h-0">
      {/* container that takes full space; the internal scroller (Virtuoso) will be styled */}
      <div className="absolute inset-0 min-h-0">
        <Virtuoso
          data={messages}
          followOutput="auto"
          components={{
            Scroller: React.forwardRef((props: any, ref: any) => (
              <div
                ref={ref}
                {...props}
                className={`custom-scroll min-h-0 h-full ${
                  hasTopShadow ? "has-top-shadow" : ""
                }`}
              />
            )),
          }}
          atTopStateChange={(isTop) => {
            setHasTopShadow(!isTop);
          }}
          itemContent={(index, message) => (
            <div className="px-4 py-2">
              <MessageItem message={message} />
            </div>
          )}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}
