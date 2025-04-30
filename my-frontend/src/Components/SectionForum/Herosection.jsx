import { motion } from "framer-motion";

function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden shadow-2xl mb-8">
      {/* Image de fond */}
      <img
        src="/src/assets/images/femme1.jpg"
        alt="Fond Féminin"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay noir semi-transparent */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      {/* Contenu animé */}
      <motion.div
        className="relative z-10 text-center text-white p-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1
          className="text-5xl font-bold mb-4 text-fuchsia drop-shadow-lg"
          variants={itemVariants}
        >
          Bienvenue sur Women Grow up 🌸
        </motion.h1>

        <motion.p
          className="text-xl mb-6 text-roseClair drop-shadow"
          variants={itemVariants}
        >
          Un espace d'échange doux et vibrant pour toutes 💬
        </motion.p>

        <motion.button
            className="mt-4 md:mt-0 bg-fuchsia-700 hover:bg-fuchsia-800 text-white py-1.5 text-sm px-5 rounded-lg transition-transform transform hover:scale-105"
            variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Découvrir
        </motion.button>
      </motion.div>
    </div>
  );
}

export default HeroSection;
