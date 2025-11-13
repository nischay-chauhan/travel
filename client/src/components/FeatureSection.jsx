import { motion } from 'framer-motion';

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6
    }
  }
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Unique Stays",
      description: "Discover extraordinary places to stay around the world",
      icon: "🏠"
    },
    {
      title: "Verified Hosts",
      description: "All our hosts are verified for your safety and peace of mind",
      icon: "✅"
    },
    {
      title: "24/7 Support",
      description: "Get help whenever you need it, day or night",
      icon: "🛟"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Wanderlust?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the world like never before with our curated selection of unique accommodations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;