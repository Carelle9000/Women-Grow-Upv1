import React, { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import AddArticleButton from './AddArticleButton'; // Assurez-vous que le chemin est correct
export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample article data
  const articles = [
    {
      id: 1,
      title: '10 Ways to Reduce Your Household Waste',
      description: 'Simple yet effective strategies to minimize waste generation in your home and contribute to a cleaner environment.',
      author: 'Emma Johnson',
      date: 'May 15, 2025',
      readTime: '5 min read',
      category: 'Waste Reduction',
      image: '/src/assets/images/economie1.jpeg',
    },
    {
      id: 2,
      title: 'The Impact of Single-Use Plastics on Marine Life',
      description: 'An in-depth look at how disposable plastics are affecting our oceans and marine ecosystems.',
      author: 'Michael Rivera',
      date: 'May 12, 2025',
      readTime: '10 min read',
      category: 'Environmental Impact',
      image: '/src/assets/images/economie1.jpeg',
    },
    {
      id: 3,
      title: 'Composting 101: A Beginner\'s Guide',
      description: 'Learn how to start your own composting system at home and turn waste into valuable garden resource.',
      author: 'Sarah Wilson',
      date: 'May 10, 2025',
      readTime: '8 min read',
      category: 'Composting',
      image: '/src/assets/images/social.jpeg',
    },
    {
      id: 4,
      title: 'Innovative Recycling Technologies',
      description: 'Explore cutting-edge technologies transforming how we process recyclable materials.',
      author: 'David Chen',
      date: 'May 8, 2025',
      readTime: '7 min read',
      category: 'Recycling',
      image: '/src/assets/images/solidarite(45).jpg',
    },
    {
      id: 5,
      title: 'Community-Led Zero Waste Initiatives',
      description: 'Success stories from communities around the world implementing zero waste programs.',
      author: 'Lisa Thompson',
      date: 'May 5, 2025',
      readTime: '6 min read',
      category: 'Community Action',
      image: '/src/assets/images/solidarite(43).jpg',
    },
    {
      id: 6,
      title: 'Smart Tech for Sustainable Living',
      description: 'How IoT and smart home devices can help you reduce your environmental footprint.',
      author: 'James Wilson',
      date: 'May 3, 2025',
      readTime: '9 min read',
      category: 'Technology',
      image: '/src/assets/images/solidarite(41).jpg',
    }
  ];

  const categories = [
    'All', 
    'Waste Reduction', 
    'Recycling', 
    'Composting', 
    'Environmental Impact', 
    'Community Action', 
    'Technology'
  ];

  // Filter articles based on search query and active filter
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network request delay
    const timer = setTimeout(() => {
      const results = articles.filter(article => {
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

  // Handle filter selection
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 m-6">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="w-1/3 p-3 pl-10 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition"
            placeholder="Search articles..."
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
              <AddArticleButton />
        
      </div>

      {/* Featured Articles Header */}
      <h2 className="text-2xl font-bold text-fuchsia-500 mb-6">Featured Articles</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No articles found matching your search criteria.</p>
          <button 
            className="mt-4 text-purple-500 font-medium hover:text-purple-700 transition"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Articles Grid */}
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
                    <button className="text-fuchsia-500 font-medium flex items-center hover:text-fuchsia-600 transition">
                      Read more
                      <ChevronRight size={16} className="ml-1" />
                    </button>
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