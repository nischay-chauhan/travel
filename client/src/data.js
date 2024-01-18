import {
 FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import {  MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";




export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <FaKey />
  },
  {
    name: " Pet allowed",
    icon: <MdPets />
  }
];