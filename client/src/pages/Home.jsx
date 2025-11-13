import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Carousal from '../components/Carousal';
import Categories from '../components/Category';
import Listings from '../components/Listings';

const Home = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Carousal />
        <Categories />
        <Listings />
      </main>
    </div>
  );
};

export default Home;