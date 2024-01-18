import Listing from "../models/Listing.js"


export const createListing = async(req , res) => {
    try {

        const {
          creator,
          category,
          type,
          streetAddress,
          aptSuite,
          city,
          province,
          country,
          guestCount,
          bedroomCount,
          bedCount,
          bathroomCount,
          amenities,
          title,
          description,
          highlight,
          highlightDesc,
          price,
        } = req.body;

        const listingPhotos = req.files

        if (!listingPhotos || listingPhotos.length === 0) {
            return res.status(400).json({
              status: "failure",
              message: "No file uploaded.",
            });
          }
      
        
         const listingPhotoPaths = listingPhotos.map((file) => file.path)

         const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price,
          })

          await newListing.save()

          res.status(200).json({
            status : "success",
            newListing
          })

    }catch(error){
        console.log(error)
        res.status(409).json({
            status : "Failure",
            message : "Fail to create Listing",
            error : error.message,
        })
    }
}


export const getListingData = async(req , res) => {
    const qCategory = req.query.category

    try {
        let listings
        if (qCategory) {
          listings = await Listing.find({ category: qCategory }).populate("creator")
        } else {
          listings = await Listing.find().populate("creator")
        }
    
        res.status(200).json({
            status: "success",
            message: "Listings fetched successfully.",
            listings,
        });
      
      } catch (err) {
        res.status(404).json({
          status: "failure",
          message: "Failed to fetch listings.",
          error: err.message,
        });
        console.log(err);
      }
};