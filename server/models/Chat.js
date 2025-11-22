import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        members: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            default: [],
        },
        messages: {
            type: [
                {
                    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                    text: { type: String },
                    createdAt: { type: Date, default: Date.now },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
