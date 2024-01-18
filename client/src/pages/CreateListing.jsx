import Navbar from "../components/Navbar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { categories, facilities, types } from "../data";
import Place from "../components/CreateListing/Place";
import GuestCounter from "../components/CreateListing/GuestCounter";
import { useState } from "react";
import { BiTrash, BiUpload } from "react-icons/bi";

const CreateListing = () => {
  const [photos, setPhotos] = useState([]);

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
              {categories.map((item, index) => (
                <div
                  key={index}
                  className="w-36 h-24 m-2 relative overflow-hidden rounded-md transition-transform duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0  bg-black opacity-70 transition-opacity duration-300 hover:opacity-0"></div>
                  <div className="absolute  inset-0 flex items-center justify-center">
                    <div className="text-white  text-center">
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
                    className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-2"
                  >
                    <div className="flex flex-col">
                      <h4 className="text-xl font-bold">{item.name}</h4>
                      <p className="mr-2">{item.description}</p>
                    </div>
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                ))}
              </div>
              <Place />
              <div className="flex w-full flex-col mt-6">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold mr-4">
                    Share some basics about Your Place
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mt-4">
                  <GuestCounter name={"Guests"} />
                  <GuestCounter name={"Bedrooms"} />
                  <GuestCounter name={"Beds"} />
                  <GuestCounter name={"Bathrooms"} />
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
                  className="flex hover:cursor-pointer justify-between items-center bg-gray-200 p-4 rounded-md mb-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  key={index}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <p>{item.name}</p>
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
                    required
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg">Highlight Details</p>
                  <textarea
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                    type="text"
                    placeholder="Highlight Details..."
                    name="highlightDescription"
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
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
