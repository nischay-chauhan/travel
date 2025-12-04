import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const otherMember = chat?.members?.find((member) => member._id !== currentUser._id);
        setUserData(otherMember);
    }, [chat, currentUser]);

    useEffect(() => {
        if (chat) {
            setMessages(chat.messages || []);
        }
    }, [chat]);

    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.senderId === userData?._id) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const message = {
            senderId: currentUser._id,
            text: newMessage,
            chatId: chat._id,
        };

        const otherMember = chat.members.find((member) => {
            const memberId = member?._id || member;
            return memberId !== currentUser._id;
        });
        const receiverId = otherMember?._id || otherMember;
        setSendMessage({ ...message, receiverId });

        try {
            const res = await axios.post("/api/chat/message", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-box-container bg-card border border-border rounded-lg shadow-md h-full flex flex-col">
            {chat ? (
                <>
                    <div className="chat-header p-4 border-b border-border flex items-center gap-4 bg-muted rounded-t-lg">
                        <img
                            src={`${userData?.profileImagePath.replace("public", "")}`}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-lg text-foreground">
                                {userData?.firstName} {userData?.lastName}
                            </span>
                        </div>
                    </div>

                    {chat.property && (
                        <div
                            onClick={() => navigate(`/properties/${chat.property._id}`)}
                            className="p-3 border-b border-border bg-muted/50 hover:bg-muted cursor-pointer transition-colors flex items-center gap-3"
                        >
                            {chat.property.listingPhotoPaths && chat.property.listingPhotoPaths[0] && (
                                <img
                                    src={`${chat.property.listingPhotoPaths[0].replace("public", "")}`}
                                    alt={chat.property.title}
                                    className="w-16 h-16 rounded-md object-cover"
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-foreground truncate">
                                    {chat.property.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {chat.property.city}, {chat.property.province} • ${chat.property.price}/night
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="chat-body flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                ref={scroll}
                                className={`message flex flex-col ${(message.sender?._id === currentUser._id || message.sender === currentUser._id)
                                    ? "items-end"
                                    : "items-start"
                                    }`}
                            >
                                <div
                                    className={`p-3 rounded-2xl max-w-[70%] ${(message.sender?._id === currentUser._id || message.sender === currentUser._id)
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-muted text-foreground rounded-bl-none"
                                        }`}
                                >
                                    <span>{message.text}</span>
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">{format(message.createdAt)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="chat-sender p-4 border-t border-border bg-muted rounded-b-lg flex items-center gap-2">
                        <div className="flex-1">
                            <InputEmoji
                                value={newMessage}
                                onChange={setNewMessage}
                                cleanOnEnter
                                onEnter={handleSend}
                                placeholder="Type a message..."
                            />
                        </div>
                        <button
                            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Tap on a chat to start conversation...
                </div>
            )
            }
        </div >
    );
};

export default ChatBox;
