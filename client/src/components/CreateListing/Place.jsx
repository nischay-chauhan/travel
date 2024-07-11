import PropTypes from 'prop-types'
const Place = ({ formLocation, setFormLocation }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
    
  };

  return (
    <div className="flex flex-col w-full mt-6">
      <h3 className="text-2xl font-bold">Where is Your Place Located</h3>
      <div className="mt-4 w-full flex flex-col p-2">
        <label htmlFor="streetAddress" className="text-lg mb-1">
          Street address
        </label>
        <input
          id="streetAddress"
          name="streetAddress"
          value={formLocation.streetAddress}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
          type="text"
          placeholder="Street name or Address"
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
            value={formLocation.aptSuite}
            onChange={handleInputChange}
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
            value={formLocation.city}
            onChange={handleInputChange}
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
            value={formLocation.province}
            onChange={handleInputChange}
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
            value={formLocation.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};


Place.propTypes = {
  formLocation: PropTypes.shape({
  streetAddress: PropTypes.string.isRequired,
  aptSuite: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  }).isRequired,
  setFormLocation: PropTypes.func.isRequired,
};


export default Place;
