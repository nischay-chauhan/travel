import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

const iconVariants = {
  initial: { opacity: 0, scale: 0.6, rotate: -90 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.6, rotate: 90, transition: { duration: 0.25, ease: "easeIn" } },
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Default to light theme if no preference is saved
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
