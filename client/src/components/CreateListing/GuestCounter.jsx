import PropTypes from 'prop-types';
import { Plus, Minus } from 'lucide-react'; // Replaced react-icons
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // For consistency, though p tag is also fine

const GuestCounter = ({ label, count, setCount }) => {
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    // Allow decrementing to 0 if label implies it (e.g. bathrooms)
    // For guests, beds, bedrooms, min is 1.
    // This logic can be made more flexible if needed by passing a minCount prop.
    const minValue = (label === "Bathrooms" || label === "Badezimmer") ? 0 : 1;
    if (count > minValue) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  
  return (
    <div className="flex flex-col space-y-2 items-start p-3 border border-border rounded-lg">
      <Label className="text-base font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-center justify-between w-full">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8" // Smaller buttons
          onClick={handleDecrement}
          // Disable if count is at min value
          disabled={count <= ((label === "Bathrooms" || label === "Badezimmer") ? 0 : 1)}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease {label}</span>
        </Button>
        <span className="text-lg font-semibold w-10 text-center">{count}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8" // Smaller buttons
          onClick={handleIncrement}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase {label}</span>
        </Button>
      </div>
    </div>
  );
};


GuestCounter.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
};

export default GuestCounter;
