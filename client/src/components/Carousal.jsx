
import { motion } from 'framer-motion';
import FloatingHomeCards from './FloatingHomeCards';

const Carousel = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden" >
      <FloatingHomeCards />
      
      <div className="relative z-10 text-foreground text-center animate-in fade-in-50 slide-in-from-bottom-5 duration-1000 ease-out -mt-32">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Welcome Home! 
          <br />
          <span className="text-4xl md:text-6xl">Anywhere you roam</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground"
        >
          Stay with ease
        </motion.p>
      </div>
    </div>
  );
};

export default Carousel;
