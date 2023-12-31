import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end": message.role === "user",
              "justify-start": message.role === "assistant",
            })}
          >
            <div
              className={cn("bg-gray-200 p-2 rounded-lg", {
                "bg-blue-200": message.role === "user",
                "bg-gray-200": message.role === "assistant",
              })}
            >
              <p
                className={cn("text-sm", {
                  "text-black": message.role === "user",
                  "text-gray-900": message.role === "assistant",
                })}
              >
                {message.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
