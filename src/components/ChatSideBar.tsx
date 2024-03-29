"use client";

import { DrizzleChat } from "../lib/DB/schema";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "../lib/utils";
import axios from "axios";
import Subscribe from "./ui/Subscribe";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [loading, setLoading] = React.useState(false);


  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border border-white  hover:bg-slate-800">
          <PlusCircle className="w-4 h-4 mr-2" />
          <h1>Create New Chat</h1>
        </Button>
      </Link>

      <div className="flex flex-col gap-4 mt-4">
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <p className="w-full text-sm truncate">{chat.pdfName}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex flex-col items-left gap-2 text-sm text-slate-500 flex-wrap">
          <Link href="/">Home</Link>
       {/* <Subscribe /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
