import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw", // Slide in from left
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw", // Slide out to right
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const RootLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
};

export default RootLayout;
