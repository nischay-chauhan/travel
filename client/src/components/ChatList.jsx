import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatList = ({ chats, currentChat, setCurrentChat }) => {
    const user = useSelector((state) => state.user);

    return (
        <div className="chat-list flex flex-col gap-4 overflow-y-auto h-full p-4 bg-card border border-border shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-foreground">Chats</h2>
            {chats.map((chat) => {
                const otherMember = chat.members.find((member) => member._id !== user._id);
                return (
                    <div
                        key={chat._id}
                        onClick={() => setCurrentChat(chat)}
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${currentChat?._id === chat._id ? "bg-primary/10 border-l-4 border-primary" : ""
                            }`}
                    >
                        <img
                            src={`${otherMember?.profileImagePath.replace("public", "")}`}
                            alt="profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-semibold text-lg text-foreground">
                                {otherMember?.firstName} {otherMember?.lastName}
                            </span>
                            {chat.property && (
                                <span className="text-xs text-muted-foreground truncate">
                                    📍 {chat.property.title}
                                </span>
                            )}
                            {!chat.property && (
                                <span className="text-sm text-muted-foreground">Online</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatList;
