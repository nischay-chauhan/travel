import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const FloatingHomeCards = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: -100, rotate: -15 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: -15,
          y: [0, -20, 0]
        }}
        transition={{ 
          opacity: { duration: 1, delay: 0.5 },
          x: { duration: 1, delay: 0.5 },
          rotate: { duration: 1, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute left-[10%] top-[20%] transform -rotate-12"
      >
        <Card className="w-64 h-40 bg-white/90 backdrop-blur-sm shadow-2xl overflow-hidden">
          <div className="relative h-full">
            <img 
              src="/travel.jpg" 
              alt="Cozy Apartment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-semibold text-lg">Cozy Apartment</h3>
              <p className="text-sm opacity-90">$89/night</p>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">🏠 Featured</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Right tilted card */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 15,
          y: [0, 20, 0]
        }}
        transition={{ 
          opacity: { duration: 1, delay: 0.7 },
          x: { duration: 1, delay: 0.7 },
          rotate: { duration: 1, delay: 0.7 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[10%] top-[30%] transform rotate-12"
      >
        <Card className="w-64 h-40 bg-white/90 backdrop-blur-sm shadow-2xl overflow-hidden">
          <div className="relative h-full">
            <img 
              src="/travel2.jpg" 
              alt="Beach Villa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-semibold text-lg">Beach Villa</h3>
              <p className="text-sm opacity-90">$250/night</p>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">⭐ Popular</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default FloatingHomeCards;
