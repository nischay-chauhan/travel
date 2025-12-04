
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Technology', 'Pricing', 'Documentation'],
    Company: ['About', 'Careers', 'Press', 'Partners'],
    Support: ['Help Center', 'Contact', 'Status', 'Community'],
    Legal: ['Privacy', 'Terms', 'Security', 'Compliance']
  };

  const socialIcons = [
    { name: 'Twitter', icon: '𝕏', href: '#' },
    { name: 'GitHub', icon: '⚡', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' }
  ];

  return (
    <footer className="relative py-20 border-t border-neon-blue/20">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold text-glow-blue">NEXUS</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pioneering the future of technology with revolutionary solutions 
                that transform industries and empower innovation.
              </p>
              <div className="flex space-x-4">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="w-10 h-10 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full flex items-center justify-center text-lg hover:glow-blue transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li key={link}>
                    <motion.a
                      href="#"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                      whileHover={{ x: 5, color: 'hsl(var(--neon-blue))' }}
                      className="text-muted-foreground hover:text-neon-blue transition-all duration-300 block relative group"
                    >
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-neon-purple/20 pt-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-glow-purple mb-2">Stay Updated</h4>
              <p className="text-muted-foreground">Get the latest updates on our revolutionary technology.</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-black/50 border border-neon-blue/30 px-4 py-2 rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:border-neon-blue transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-2 rounded-full text-black font-semibold hover:glow-blue transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-neon-blue/20 pt-8 text-center"
        >
          <p className="text-muted-foreground">
            © 2024 NEXUS. All rights reserved. Built with 🚀 for the future.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
