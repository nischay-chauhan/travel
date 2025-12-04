import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

console.log("🔧 Initializing Cloudinary config...");
console.log("   Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME || "❌ MISSING");
console.log("   API Key:", process.env.CLOUDINARY_API_KEY || "❌ MISSING");
console.log("   API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Present" : "❌ MISSING");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("✅ Cloudinary configured successfully\n");

export default cloudinary;
