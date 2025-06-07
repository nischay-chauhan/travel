import PropTypes from 'prop-types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Place = ({ formLocation, setFormLocation }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6 pt-6"> {/* Replaced margin with padding for consistency within CardContent */}
      <h3 className="text-xl font-semibold">Where is Your Place Located?</h3> {/* Adjusted heading size */}

      <div className="space-y-2">
        <Label htmlFor="streetAddress" className="text-base">
          Street address
        </Label>
        <Input
          id="streetAddress"
          name="streetAddress"
          value={formLocation.streetAddress}
          onChange={handleInputChange}
          type="text"
          placeholder="E.g., 123 Main St"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="aptSuite" className="text-base">
            Apartment, suite, etc. (optional)
          </Label>
          <Input
            id="aptSuite"
            type="text"
            name="aptSuite"
            value={formLocation.aptSuite}
            onChange={handleInputChange}
            placeholder="E.g., Apt #101"
            // Not making this required as per original placeholder, but was required in input
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city" className="text-base">
            City
          </Label>
          <Input
            id="city"
            type="text"
            required
            name="city"
            value={formLocation.city}
            onChange={handleInputChange}
            placeholder="E.g., San Francisco"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="province" className="text-base">
            State / Province
          </Label>
          <Input
            id="province"
            type="text"
            placeholder="E.g., California"
            required
            name="province"
            value={formLocation.province}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country" className="text-base">
            Country
          </Label>
          <Input
            id="country"
            type="text"
            required
            name="country"
            value={formLocation.country}
            onChange={handleInputChange}
            placeholder="E.g., United States"
          />
        </div>
      </div>
    </div>
  );
};



Place.propTypes = {
  formLocation: PropTypes.shape({
    streetAddress: PropTypes.string.isRequired,
    aptSuite: PropTypes.string, // Made aptSuite optional based on placeholder
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  setFormLocation: PropTypes.func.isRequired,
};

export default Place;
