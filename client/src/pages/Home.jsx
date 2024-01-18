import Carousal from "../components/Carousal"
import Categories from "../components/Category"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <div>
        <Navbar />
        <Carousal />
        <Categories />
    </div>
  )
}

export default Home