import multer from 'multer';
import cloudinary from './cloudinary.js';
import { Readable } from 'stream';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 20, // 20MB
};

export const uploadListingPhotos = multer({
    storage,
    fileFilter,
    limits,
});

export const uploadProfileImage = multer({
    storage,
    fileFilter,
    limits,
});

const uploadToCloudinary = (buffer, folder, transformation) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                transformation: transformation,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        const bufferStream = Readable.from(buffer);
        bufferStream.pipe(uploadStream);
    });
};

export const uploadProfileToCloudinary = async (file) => {
    const transformation = [{ width: 500, height: 500, crop: 'limit' }];
    const result = await uploadToCloudinary(file.buffer, 'travel/profiles', transformation);
    return result.secure_url;
};

export const uploadListingPhotosToCloudinary = async (files) => {
    const transformation = [{ width: 1200, height: 800, crop: 'limit' }];
    const uploadPromises = files.map(file =>
        uploadToCloudinary(file.buffer, 'travel/listings', transformation)
    );
    const results = await Promise.all(uploadPromises);
    return results.map(result => result.secure_url);
};
