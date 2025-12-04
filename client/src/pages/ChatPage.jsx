import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import axios from "axios";

const ChatPage = () => {
    const user = useSelector((state) => state.user);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const socket = useRef();

    useEffect(() => {
        const socketUrl = import.meta.env.VITE_API_URL || undefined;
        socket.current = io(socketUrl);
        socket.current.emit("registerUser", user?._id);

        socket.current.on("receiveMessage", (data) => {
            setReceivedMessage(data);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (sendMessage) {
            socket.current.emit("sendMessage", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        const getChats = async () => {
            try {
                const res = await axios.get(`/api/chat/${user._id}`);
                setChats(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (user) getChats();
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="chat-page container mx-auto p-4 min-h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
                <div className="chat-list-container h-full">
                    <ChatList
                        chats={chats}
                        currentChat={currentChat}
                        setCurrentChat={setCurrentChat}
                    />
                </div>

                <div className="chat-box-container h-full">
                    <ChatBox
                        chat={currentChat}
                        currentUser={user}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                    />
                </div>
            </div>
        </>
    );
};

export default ChatPage;
