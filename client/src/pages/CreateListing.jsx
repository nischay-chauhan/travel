import Navbar from "../components/Navbar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { categories, facilities, types } from "../data";
import Place from "../components/CreateListing/Place";
import GuestCounter from "../components/CreateListing/GuestCounter";
import { useState } from "react";
import { BiTrash, BiUpload } from "react-icons/bi";

const CreateListing = () => {
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
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex mt-6 flex-col items-center">
          <p
            className="text-4xl font-bold"
            style={{
              background: "linear-gradient(to right, #4F46E5, #F469A9)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Publish Your Place
          </p>
        </div>
        <form className="mt-10  m-4 flex flex-col">
          <div className="border border-gray-300 p-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold">
                Step : 1 Tell us about Your Place
              </h3>
            </div>
            <div className="flex flex-wrap justify-center">
              {categories?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setCategory(item.label)}
                  className={`w-36 h-24 m-2 relative overflow-hidden rounded-md transition-transform duration-300 transform hover:scale-105 category ${
                    category === item.label ? "border-4 border-red-500" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-black opacity-70 transition-opacity duration-300 hover:opacity-0"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl">{item.icon}</div>
                      <p className="mt-2">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 w-full">
                <h2 className="text-2xl font-bold">
                  What type of Places will guests have ?
                </h2>
              </div>
              <div className="mt-4 w-full">
                {types?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center bg-gray-200 p-4 rounded-md mb-2 type ${
                      type === item.name ? "border-4 border-green-500" : ""
                    }`}
                    onClick={() => setType(item.name)}
                  >
                    <div className="flex flex-col">
                      <h4 className="text-xl font-bold">{item.name}</h4>
                      <p className="mr-2">{item.description}</p>
                    </div>
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                ))}
              </div>
              <Place
                formLocation={formLocation}
                setFormLocation={setFormLocation}
              />
              <div className="flex w-full flex-col mt-6">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold mr-4">
                    Share some basics about Your Place
                  </h3>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 mt-4">
                  <GuestCounter
                    label="Guests"
                    count={guestCount}
                    setCount={setGuestCount}
                  />
                  <GuestCounter
                    label="Bedrooms"
                    count={bedroomCount}
                    setCount={setBedroomCount}
                  />
                  <GuestCounter
                    label="Beds"
                    count={bedCount}
                    setCount={setBedCount}
                  />
                  <GuestCounter
                    label="Bathrooms"
                    count={bathroomCount}
                    setCount={setBathroomCount}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-6 border border-gray-300 p-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold">
                Step2 : Make Your place Stand Out
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {facilities?.map((item, index) => (
                <div
                  className={`flex hover:cursor-pointer justify-between items-center bg-gray-200 p-4 rounded-md mb-2 h-24  transition-transform duration-300 hover:scale-105 hover:shadow-lg ${
                    amenities.includes(item.name)
                      ? "border-4 border-blue-500"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="text-2xl ">{item.icon}</div>
                  <p className="text-lg">{item.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 mb-4">
              <h3 className=" text-2xl">Upload photos of Your Place</h3>
            </div>
            <div>
              <DragDropContext onDragEnd={handleDragPhoto}>
                <Droppable droppableId="photos" direction="horizontal">
                  {(provided) => (
                    <div
                      className="flex"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {photos.length < 1 && (
                        <>
                          <input
                            id="image"
                            className="w-full text-black bg-white "
                            type="file"
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            style={{ display: "none" }}
                            multiple
                          />
                          <label htmlFor="image">
                            <div className="flex flex-col justify-center p-4 items-center w-50 h-40 bg-gray-200 rounded-md">
                              <BiUpload className="text-4xl" />
                              <p className="text-md">Upload from your device</p>
                            </div>
                          </label>
                        </>
                      )}
                      {photos.length >= 1 && (
                        <div className="flex flex-wrap gap-4">
                          {photos.map((photo, index) => (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="flex flex-col items-center w-50 h-50 bg-gray-200 rounded-md shadow-md p-4"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`Place ${index + 1}`}
                                    className="object-cover w-40 h-40 rounded-md mb-2"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                    className="text-red-500 hover:text-red-700 transition"
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          <>
                            <input
                              id="image"
                              className="w-full text-black bg-white"
                              type="file"
                              accept="image/*"
                              onChange={handleUploadPhotos}
                              style={{ display: "none" }}
                              multiple
                            />
                            <label htmlFor="image">
                              <div className="flex flex-col justify-center items-center w-50 h-40 bg-gray-200 rounded-md p-4 hover:cursor-pointer">
                                <BiUpload className="text-4xl" />
                                <p className="text-md">
                                  Upload from your device
                                </p>
                              </div>
                            </label>
                          </>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div className="mt-6 mb-4">
              <h3 className="text-2xl">
                What makes your place attractive and exciting?
              </h3>
              <div className="flex flex-col w-full p-4 bg-white rounded-md shadow-md">
                <div className="mb-4">
                  <p className="text-lg">Title</p>
                  <input
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                    type="text"
                    placeholder="Title..."
                    name="title"
                    value={formDescription.title}
                    onChange={handleChangeDescription}
                    required
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg">Description</p>
                  <textarea
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                    type="text"
                    placeholder="Description..."
                    name="description"
                    value={formDescription.description}
                    onChange={handleChangeDescription}
                    required
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg">Highlight</p>
                  <input
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                    type="text"
                    placeholder="Highlight..."
                    name="highlight"
                    value={formDescription.highlight}
                    onChange={handleChangeDescription}
                    required
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg">Highlight Details</p>
                  <textarea
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                    type="text"
                    placeholder="Highlight Details..."
                    name="highlightDesc"
                    value={formDescription.highlightDesc}
                    onChange={handleChangeDescription}
                    required
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-2">Set Your Price</p>
                  <div className="flex items-center">
                    <span className="text-lg">$</span>
                    <input
                      className="ml-2 w-40 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                      type="number"
                      placeholder="20"
                      name="price"
                      value={formDescription.price}
                      onChange={handleChangeDescription}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              CREATE YOUR LISTING
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
