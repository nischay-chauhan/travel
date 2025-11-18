import Navbar from "../components/Navbar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { categories, facilities, types } from "../data";
import Place from "../components/CreateListing/Place"; // Will refactor later
import GuestCounter from "../components/CreateListing/GuestCounter"; // Will refactor later
import { useState } from "react";
import { Trash2, UploadCloud, GripVertical } from "lucide-react"; // Replaced BiTrash, BiUpload
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // For horizontal scroll of photos

const CreateListing = () => {
  const navigate = useNavigate(); // Changed Navigate to navigate
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files); // Ensure it's an array
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    e.target.value = null; // Reset file input
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1); // Corrected variable name
    items.splice(result.destination.index, 0, reorderedItem); // Corrected variable name

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription((prev) => ({ // Use functional update
      ...prev,
      [name]: name === "price" ? Math.max(0, parseFloat(value)) : value, // Ensure price is not negative
    }));
  };

  const creatorId = useSelector((state) => state.user?._id); // Safe access

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creatorId) {
      toast.error("You must be logged in to create a listing.");
      return;
    }

    const listingData = new FormData(); // Renamed for clarity
    listingData.append("creator", creatorId);
    listingData.append("category", category);
    listingData.append("type", type);
    listingData.append("streetAddress", formLocation.streetAddress);
    listingData.append("aptSuite", formLocation.aptSuite);
    listingData.append("city", formLocation.city);
    listingData.append("province", formLocation.province);
    listingData.append("country", formLocation.country);
    listingData.append("guestCount", guestCount.toString());
    listingData.append("bedroomCount", bedroomCount.toString());
    listingData.append("bedCount", bedCount.toString());
    listingData.append("bathroomCount", bathroomCount.toString());
    listingData.append("amenities", amenities.join(",")); // Join amenities array into string
    listingData.append("title", formDescription.title);
    listingData.append("description", formDescription.description);
    listingData.append("highlight", formDescription.highlight);
    listingData.append("highlightDesc", formDescription.highlightDesc);
    listingData.append("price", formDescription.price.toString());

    if (photos.length === 0) {
      toast.error("Please upload at least one photo for the listing.");
      return;
    }
    photos.forEach((photo) => {
      listingData.append("listingPhotos", photo);
    });

    // More robust required fields check
    const requiredFields = {
        category, type,
        streetAddress: formLocation.streetAddress,
        city: formLocation.city,
        province: formLocation.province,
        country: formLocation.country,
        title: formDescription.title,
        description: formDescription.description,
        price: formDescription.price
    };

    for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === "") || (typeof fieldValue === 'number' && fieldValue <=0 && fieldName === 'price') ) {
            toast.error(`Please fill in the '${fieldName}' field.`);
            return;
        }
    }
    if (amenities.length === 0) {
        toast.error("Please select at least one amenity.");
        return;
    }


    try {
      const response = await axios.post(
        "/properties/create",
        listingData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200 || response.status === 201) { // Handle 201 Created
        toast.success("Listing created successfully!");
        navigate("/");
      } else {
         // This might not be hit if server throws error for non-2xx
        toast.error(response.data.message || "Failed to create listing.");
      }
    } catch (error) {
      console.error("Create listing error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl"> {/* Centered and max-width */}
        <Toaster position="top-center" reverseOrder={false} />
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--destructive)))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Publish Your Place
          </h1>
          <p className="text-muted-foreground mt-2">Share your space with the world.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: About the Place */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Step 1: Tell us about Your Place</CardTitle>
              <CardDescription>Select a category and type that best describes your space.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Which of these best describes your place?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories?.map((item) => (
                    <Button
                      key={item.label}
                      variant={category === item.label ? "default" : "outline"}
                      onClick={() => setCategory(item.label)}
                      className="h-auto py-4 flex flex-col items-center justify-center space-y-2 text-center"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">What type of place will guests have?</h3>
                <div className="space-y-3">
                  {types?.map((item) => (
                    <Button
                      key={item.name}
                      variant={type === item.name ? "default" : "outline"}
                      onClick={() => setType(item.name)}
                      className="w-full h-auto py-4 flex justify-between items-center text-left"
                    >
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-2xl ml-4">{item.icon}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Placeholder for Place component - to be refactored separately */}
              <Place formLocation={formLocation} setFormLocation={setFormLocation} />

              <div>
                <h3 className="text-xl font-semibold mb-4">Share some basics about your place</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Placeholders for GuestCounter components - to be refactored separately */}
                  <GuestCounter label="Guests" count={guestCount} setCount={setGuestCount} />
                  <GuestCounter label="Bedrooms" count={bedroomCount} setCount={setBedroomCount} />
                  <GuestCounter label="Beds" count={bedCount} setCount={setBedCount} />
                  <GuestCounter label="Bathrooms" count={bathroomCount} setCount={setBathroomCount} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Make it Stand Out */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Step 2: Make Your place Stand Out</CardTitle>
              <CardDescription>Select amenities and upload photos of your place.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Tell guests what your place has to offer</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {facilities?.map((item) => (
                    <Button
                      key={item.name}
                      variant={amenities.includes(item.name) ? "default" : "outline"}
                      onClick={() => handleSelectAmenities(item.name)}
                      className="h-auto py-3 flex flex-col items-center justify-center space-y-1 text-center"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs">{item.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Upload photos of Your Place</h3>
                <DragDropContext onDragEnd={handleDragPhoto}>
                  <Droppable droppableId="photos" direction="horizontal">
                    {(provided) => (
                      <ScrollArea className="w-full whitespace-nowrap rounded-md border border-dashed p-4">
                        <div className="flex space-x-4 pb-4" ref={provided.innerRef} {...provided.droppableProps}>
                          {photos.map((photo, index) => (
                            <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                              {(providedDrag) => (
                                <div
                                  ref={providedDrag.innerRef}
                                  {...providedDrag.draggableProps}
                                  className="relative w-40 h-40 shrink-0 group"
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`Place ${index + 1}`}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                  <div {...providedDrag.dragHandleProps} className="absolute top-1 left-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                                     <GripVertical className="h-4 w-4 text-white" />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                           <Label htmlFor="photo-upload" className="w-40 h-40 shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground rounded-md cursor-pointer hover:border-primary transition-colors">
                              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">Upload Photos</span>
                              <Input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleUploadPhotos}
                                multiple
                                className="hidden"
                              />
                            </Label>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    )}
                  </Droppable>
                </DragDropContext>
                 {photos.length > 0 && <p className="text-xs text-muted-foreground mt-2">Drag to reorder photos.</p>}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">What makes your place attractive and exciting?</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="E.g., Cozy Beachfront Cottage" value={formDescription.title} onChange={handleChangeDescription} required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Tell guests about your place..." value={formDescription.description} onChange={handleChangeDescription} required rows={5} />
                  </div>
                  <div>
                    <Label htmlFor="highlight">Highlight</Label>
                    <Input id="highlight" name="highlight" placeholder="E.g., Perfect for romantic getaways" value={formDescription.highlight} onChange={handleChangeDescription} required />
                  </div>
                  <div>
                    <Label htmlFor="highlightDesc">Highlight Details</Label>
                    <Textarea id="highlightDesc" name="highlightDesc" placeholder="Describe the highlight..." value={formDescription.highlightDesc} onChange={handleChangeDescription} required rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per night ($)</Label>
                    <Input id="price" name="price" type="number" placeholder="Enter price" value={formDescription.price > 0 ? formDescription.price : ""} onChange={handleChangeDescription} required min="0" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg" className="text-lg">
              CREATE YOUR LISTING
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
