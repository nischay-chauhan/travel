import Carousal from "../components/Carousal"
import Categories from "../components/Category"
import Listings from "../components/Listings"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <div>
        <Navbar />
        <Carousal />
        <Categories />
        <Listings />
    </div>
  )
}

export default Home