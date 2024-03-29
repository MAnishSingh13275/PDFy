"use client";
import React, { useEffect } from "react";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import MessageList from "./MessageList";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = {
  chatId: number;
};

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="max-h-screen flex flex-col justify-between"
      id="message-container"
    >
      <div className="m-2">
        <h2 className="font-bold text-xl">Chats</h2>
      </div>
      <div>
        <div className="mx-3 h-[85vh] overflow-scroll no-scrollbar">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
        <form className="sticky bottom-0" onSubmit={handleSubmit}>
          <div className="flex gap-2 mx-1 mt-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Your PDF"
            />
            <Button>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
