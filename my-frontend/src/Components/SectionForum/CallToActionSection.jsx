import { motion } from "framer-motion";

function CallToActionSection() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-roseClair via-pink-200 to-indigoClair text-center">
      <div className="max-w-2xl mx-auto px-6">
        {/* Animation du texte */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Rejoignez Notre Communauté Aujourd'hui
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Connectez-vous avec des personnes partageant les mêmes intérêts,
          participez à des discussions inspirantes et créez des liens durables.
        </motion.p>

        {/* Bouton */}
        <motion.button
          className="bg-fuchsia-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-fuchsia-800 transition shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/memberspage" >
          Commencer Maintenant
          </a>
        </motion.button>
      </div>
    </section>
  );
}

export default CallToActionSection;
