import React, { useState, useEffect } from 'react';
import Header from "../Components/Header";
import { Facebook, Twitter, Linkedin, Mail, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer';

export default function Digithek() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);

  // Show or hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCourseHover = (index) => {
    setExpandedCourse(index);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const courses = [
    {
      title: "Confiance et Estime de Soi",
      instructor: "Marie",
      lessons: 20,
      duration: "3h 30m",
      rating: "6k",
      color: "blue-600",
      textColor: "white"
    },
    {
      title: "Prise de parole en public",
      instructor: "Françoise",
      lessons: 20,
      duration: "3h 30m",
      rating: "6k",
      color: "blue-500",
      textColor: "white"
    },
    {
      title: "Gestion du stress et émotions",
      instructor: "Lucie",
      lessons: 20,
      duration: "3h 30m",
      rating: "6.8k",
      color: "yellow-400",
      textColor: "black"
    },
    {
      title: "Leadership Féminin",
      instructor: "Diana",
      lessons: 20,
      duration: "3h 30m",
      rating: "6k",
      color: "purple-900",
      textColor: "white"
    },
    {
      title: "L'AFFIRMATION DE SOI",
      subtitle: "Affirmation de ses droits",
      instructor: "Claire",
      lessons: 20,
      duration: "3h 30m",
      rating: "6k",
      color: "blue-900",
      textColor: "white"
    }
  ];

  const testimonials = [
    {
      name: "Pauline Sarkha",
      role: "Étudiante",
      content: "Je suis très satisfaite d'avoir choisi un programme de formation, car cela m'a permis de trouver ma voie dans le domaine numérique.",
      featured: true
    },
    {
      name: "Sophie Martin",
      role: "Professionnelle",
      content: "La formation sur le leadership féminin a transformé ma façon d'aborder les réunions. Je suis maintenant plus confiante et assertive.",
      featured: false
    },
    {
      name: "Julie Dupont",
      role: "Entrepreneure",
      content: "Grâce à ces formations, j'ai pu lancer ma startup avec les compétences et la confiance nécessaires pour réussir.",
      featured: true
    },
    {
      name: "Emmanuelle Bernard",
      role: "Étudiante",
      content: "Un parcours enrichissant qui m'a permis de développer des compétences essentielles pour ma carrière dans le digital.",
      featured: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-purple-600 text-white py-4"
        >
          <div className="container mx-auto px-4">
            <ul className="space-y-3">
              <li><a href="#" className="block py-2 hover:bg-purple-700 px-3 rounded">Accueil</a></li>
              <li><a href="#" className="block py-2 hover:bg-purple-700 px-3 rounded">Formations</a></li>
              <li><a href="#" className="block py-2 hover:bg-purple-700 px-3 rounded">À Propos</a></li>
              <li><a href="#" className="block py-2 hover:bg-purple-700 px-3 rounded">Contact</a></li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="absolute inset-0 z-0">
          <img src="/../assets/images/solidarite(31).jpg" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-purple-900 opacity-60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32 text-white">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              variants={fadeInUp}
            >
              Découvrez nos formations qui feront ressortir le meilleur de vous.
            </motion.h1>
            
            <motion.p 
              className="mb-8 text-lg"
              variants={fadeInUp}
            >
              Une nouvelle initiative qui permettra un avancement dans le monde.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <motion.button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-all duration-300 flex items-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir
                <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={16} />
              </motion.button>
              
              <motion.button 
                className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Former
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-between items-center mt-16 gap-4"
              variants={fadeInUp}
            >
              <motion.div 
                className="bg-pink-200 bg-opacity-80 text-pink-800 px-4 py-2 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  24k +
                </motion.div>
                <div className="text-sm">Apprenantes</div>
              </motion.div>
              
              <motion.div 
                className="bg-pink-200 bg-opacity-80 text-pink-800 px-4 py-2 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  10k +
                </motion.div>
                <div className="text-sm">Enseignants</div>
              </motion.div>
              
              <motion.div 
                className="bg-pink-200 bg-opacity-80 text-pink-800 px-4 py-2 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  6k +
                </motion.div>
                <div className="text-sm">Certificats</div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-between items-center mt-8 gap-4"
              variants={fadeInUp}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.img 
                    key={i} 
                    src={`/api/placeholder/40/40`} 
                    alt={`User ${i}`} 
                    className="h-8 w-8 rounded-full border-2 border-white" 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 * i, duration: 0.3 }}
                  />
                ))}
              </div>
              
              <motion.div 
                className="text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-xl font-bold">40k +</div>
                <div className="text-sm">Membres</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 z-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a 
            href="#partners" 
            className="bg-white text-purple-600 rounded-full p-2 transform translate-y-1/2 hover:bg-purple-100 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('partners').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </a>
        </motion.div>
      </section>
      
      {/* Partners Section */}
      <section id="partners" className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl font-bold text-purple-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nos partenaires
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              >
                <img src={`/api/placeholder/120/40`} alt={`Partner ${i}`} className="max-h-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section id="courses" className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl font-bold text-purple-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nos Formations
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courses.map((course, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => handleCourseHover(index)}
                onMouseLeave={() => handleCourseHover(null)}
              >
                <div className={`relative h-32 bg-${course.color}`}>
                  <img src="/api/placeholder/300/150" alt={course.title} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-${course.color} bg-opacity-50 flex items-center justify-center`}>
                    <h3 className={`text-${course.textColor} text-lg font-bold text-center px-2`}>{course.title}</h3>
                  </div>
                  <motion.div 
                    className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="h-6 w-6 flex items-center justify-center">
                      <span className="text-xs">{course.duration}</span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-4">
                  <div className="text-sm font-bold">{course.subtitle || course.title}</div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center">
                      <img src="/api/placeholder/30/30" alt="Instructor" className="h-6 w-6 rounded-full mr-2" />
                      <span className="text-xs">{course.instructor}</span>
                    </div>
                    <div className="text-xs text-gray-500">{course.lessons} leçons</div>
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-xs ml-1">{course.rating}</span>
                    </div>
                  </div>
                  
                  {expandedCourse === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-gray-100"
                    >
                      <button className="w-full py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors duration-300">
                        S'inscrire
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <button className="flex items-center gap-2 py-2 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300">
              Voir plus de formations
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl font-bold text-purple-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ce que nos étudiants disent sur nous
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={i} 
                className={`bg-white rounded-lg shadow-md p-6 relative overflow-hidden ${
                  activeTestimonial === i ? 'ring-2 ring-purple-400' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                onClick={() => setActiveTestimonial(i)}
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.span 
                      key={star} 
                      className="text-yellow-400"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * star }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                
                <p className="text-sm mb-6">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center">
                  <img src="/api/placeholder/50/50" alt="Student" className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <div className="font-bold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-pink-500">{testimonial.role}</div>
                  </div>
                </div>
                
                {testimonial.featured && (
                  <motion.div 
                    className="absolute top-4 right-4 bg-purple-600 text-white text-sm h-6 w-6 flex items-center justify-center rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <span>99</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Testimonial Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                className={`h-2 w-2 rounded-full ${activeTestimonial === i ? 'bg-purple-600' : 'bg-gray-300'}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
            <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </div>
  );
}