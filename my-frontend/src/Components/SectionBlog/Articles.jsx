import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { MessageCircle, Eye } from 'lucide-react';

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const articles = [
    {
      id: 1,
      title: 'Empowerment et Leadership',
      description: 'Comment renforcer la présence des femmes dans les rôles de direction ?',
      author: 'Emma Johnson',
      date: 'May 15, 2025',
      readTime: '5 min read',
      category: 'Leadership',
      image: '/src/assets/images/empowerment.jpg',
      link: '/ArticleB1',
    },
    {
      id: 2,
      title: 'Éducation et Développement Personnel',
      description: "L'éducation des femmes en Afrique est essentielle pour réduire les inégalités de genre.",
      author: 'Michael Rivera',
      date: 'May 12, 2025',
      readTime: '10 min read',
      category: 'Education',
      image: '/src/assets/images/devopp.jpg',
      link: '/ArticleB2',
    },
    {
      id: 3,
      title: 'Entrepreneuriat et Indépendance Financière',
      description: 'Apprendre à être indépendante dans le milieu entrepreneurial.',
      author: 'Sarah Wilson',
      date: 'May 10, 2025',
      readTime: '8 min read',
      category: 'Entrepreunariat',
      image: '/src/assets/images/entrepreunariat2.webp',
      link: '/ArticleB3',
    },
    {
      id: 4,
      title: 'Bien-être et Santé mentale',
      description: 'Explorez les technologies de pointe qui transforment notre rapport à la santé mentale.',
      author: 'David Chen',
      date: 'May 8, 2025',
      readTime: '7 min read',
      category: 'Sante mentale',
      image: '/src/assets/images/Bienetre.jpg',
      link: '/ArticleB4',
    },
    {
      id: 5,
      title: 'Droits Humains',
      description: "Comprendre l'impact et l'importance de la connaissance des droits des femmes.",
      author: 'Lisa Thompson',
      date: 'May 5, 2025',
      readTime: '6 min read',
      category: 'Droits Juridiques',
      image: '/src/assets/images/DroitsHumains.jpg',
      link: '/ArticleB5',
    },
    {
      id: 6,
      title: 'Société, Culture et Engagement Social',
      description: 'Comment s’impliquer et émerger dans une société paternaliste et institutionnelle ?.',
      author: 'James Wilson',
      date: 'May 3, 2025',
      readTime: '9 min read',
      category: 'Sociologie',
      image: '/src/assets/images/Engagement.jpg',
      link: '/ArticleB6',
    }
  ];

  const categories = [
    'All',
    'Leadership',
    'Education',
    'Entrepreunariat',
    'Sante mentale',
    'Droits Juridiques',
    'Sociologie',
  ];

  // Fonction pour ajouter des données factices pour `views` et `comments`
  const enrichArticlesWithStats = (articles) => {
    return articles.map((article) => ({
      ...article,
      views: Math.floor(Math.random() * 500 + 100), // entre 100 et 600 vues
      comments: Math.floor(Math.random() * 20 + 1), // entre 1 et 20 commentaires
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const enrichedArticles = enrichArticlesWithStats(articles);
      const results = enrichedArticles.filter((article) => {
        const matchesQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             article.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || article.category === activeFilter;
        return matchesQuery && matchesFilter;
      });
      setFilteredArticles(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, activeFilter]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 m-6">
      <div className="mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="w-1/3 p-3 pl-10 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-fuchsia-500 mb-6">Articles Vedettes</h2>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {!isLoading && filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Aucun article ne correspond à votre recherche.</p>
          <button 
            className="mt-4 text-purple-500 font-medium hover:text-purple-700 transition"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
          >
            Nettoyer les filtres
          </button>
        </div>
      )}

      {!isLoading && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-xl hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 relative">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="inline-block bg-purple-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                      {article.category}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{article.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="text-sm text-gray-500">
                      By {article.author} • {article.date}
                    </div>
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} /> {article.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={16} /> {article.views}
                      </div>
                    </div>
                    <Link to={article.link}>
                      <button className="text-fuchsia-500 font-medium flex items-center hover:text-fuchsia-600 transition">
                        Lire Plus
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
