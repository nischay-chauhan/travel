
const Place = () => {
  return (
    <div className="flex flex-col w-full mt-6">
    <h3 className="text-2xl font-bold">
      Where is Your Place Located
    </h3>
    <div className="mt-4 w-full flex flex-col p-2">
      <label htmlFor="streetAddress" className="text-lg mb-1">
        Street address
      </label>
      <input
        id="streetAddress"
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
        type="text"
        placeholder="Street name or Address"
        name="streetAddress"
        required
      />
    </div>
    <div className="w-full flex mb-2 p-2">
      <div className="w-full">
        <label htmlFor="aptSuite" className="text-lg mb-1">
          Apartment or suite
        </label>
        <input
          id="aptSuite"
          type="text"
          name="aptSuite"
          placeholder="Apartment or suite"
          required
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
        />
      </div>
      <div className="w-full ml-4">
        <label htmlFor="city" className="text-lg mb-1">
          City
        </label>
        <input
          id="city"
          type="text"
          required
          name="city"
          placeholder="City .."
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
        />
      </div>
    </div>
    <div className="w-full flex mb-2 p-2">
      <div className="w-full">
        <label htmlFor="province" className="text-lg mb-1">
          Province
        </label>
        <input
          id="province"
          type="text"
          placeholder="Province .."
          required
          name="province"
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
        />
      </div>
      <div className="w-full ml-4">
        <label htmlFor="country" className="text-lg mb-1">
          Country
        </label>
        <input
          id="country"
          type="text"
          required
          name="country"
          placeholder="Country"
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
        />
      </div>
    </div>
  </div>
  )
}

export default Place