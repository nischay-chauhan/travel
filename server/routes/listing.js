import express from "express"
import multer from "multer"
import { createListing, getListingById, getListingData } from "../controllers/Listing.js";

const router = express.Router();

const storage  = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , 'public/images')
    },
    filename: function(req , file , cb){
        cb(null , file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
  };
  
  const limits = {
    fileSize: 1024 * 1024 * 5, 
  };
  
  const upload = multer({
    storage,
    fileFilter,
    limits,
  });
  

router.post('/create' , upload.array("listingPhotos") , createListing)

router.get('/' , getListingData)
router.get('/:listingId', getListingById)

export default router