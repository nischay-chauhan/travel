import  { useState } from 'react';
import PropTypes from 'prop-types';
import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';

const GuestCounter = ({ name }) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="relative bg-gray-100 p-4 w-1/2 rounded-md items-center mb-4">
      <p className="text-2xl mr-4">{name}</p>
      <div className="flex items-center">
        <IoRemoveCircleOutline
          className="text-2xl hover:cursor-pointer"
          onClick={handleDecrement}
        />
        <span className="text-2xl mx-4">{count}</span>
        <IoAddCircleOutline
          className="text-2xl hover:cursor-pointer"
          onClick={handleIncrement}
        />
      </div>
    </div>
  );
};

GuestCounter.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GuestCounter;
