import PropTypes from 'prop-types';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const GuestCounter = ({ label, count, setCount }) => {
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  
  return (
    <div className="flex items-center justify-between p-2 bg-gray-200 rounded-md">
      <p className="text-lg">{label}</p>
      <div className="flex items-center">
        <button
        type='button'
          className="bg-blue-500 text-white px-2 py-1 rounded-md"
          onClick={handleIncrement}
        >
          <AiOutlinePlus size={20} />
        </button>
        <span className="mx-2">{count}</span>
        <button
        type='button'
          className="bg-red-500 text-white px-2 py-1 rounded-md"
          onClick={handleDecrement}
        >
          <AiOutlineMinus size={20} />
        </button>
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
