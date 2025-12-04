import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// Create a new chat or return existing one
router.post("/", async (req, res) => {
    const { senderId, receiverId, propertyId } = req.body;
    try {
        const searchCriteria = {
            members: { $all: [senderId, receiverId] },
        };

        if (propertyId) {
            searchCriteria.property = propertyId;
        }

        const existingChat = await Chat.findOne(searchCriteria);

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const newChat = new Chat({
            members: [senderId, receiverId],
            property: propertyId || null,
        });
        const savedChat = await newChat.save();
        res.status(200).json(savedChat);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all chats for a user
router.get("/:userId", async (req, res) => {
    try {
        const chats = await Chat.find({
            members: { $in: [req.params.userId] },
        })
            .populate("members", "firstName lastName profileImagePath")
            .populate("messages.sender", "firstName lastName profileImagePath")
            .populate("property", "title city province country listingPhotoPaths price");
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Find chat between two users
router.get("/find/:firstId/:secondId", async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a message to a chat
router.post("/message", async (req, res) => {
    const { chatId, senderId, text } = req.body;
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json("Chat not found");

        const newMessage = {
            sender: senderId,
            text,
            createdAt: new Date(),
        };

        chat.messages.push(newMessage);
        await chat.save();
        res.status(200).json(newMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
