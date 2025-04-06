import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ExternalLink, MessageSquare, Mail, Search, X, AlertTriangle, Shield, Heart, HeartPulse, UserRound, BadgeHelp, Scale, ShieldAlert, Flame, Building2, Headphones, Users } from 'lucide-react';

const HelplineSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSOS, setShowSOS] = useState(false);
  
  const categories = ['All', 'Emergency', 'Women', 'Mental Health', 'Legal Aid', 'Cyber Crime', 'Child'];
  
  const helplines = [
    {
      id: 1,
      icon: <Shield className="text-red-600" size={28} />,
      title: 'National Emergency Number',
      description: 'Universal emergency helpline for police, fire, and medical emergencies',
      contact: '112',
      category: 'Emergency',
      isUrgent: true,
      website: 'https://www.emergency.gov',
      chat: true
    },
    {
      id: 2,
      icon: <UserRound className="text-pink-600" size={28} />,
      title: 'Women Helpline',
      description: 'Immediate assistance for women facing violence or harassment',
      contact: '1091',
      category: 'Women',
      isUrgent: true,
      email: 'help@womensupport.org'
    },
    {
      id: 3,
      icon: <HeartPulse className="text-red-600" size={28} />,
      title: 'Ambulance Service',
      description: 'Emergency medical transport service',
      contact: '108',
      category: 'Emergency',
      isUrgent: true
    },
    {
      id: 4,
      icon: <Headphones className="text-purple-600" size={28} />,
      title: 'Mental Health Helpline',
      description: '24x7 counseling and support for mental health issues',
      contact: '1800-599-0019',
      category: 'Mental Health',
      website: 'https://www.mentalhealth.org',
      chat: true,
      email: 'support@mentalhealth.org'
    },
    {
      id: 5,
      icon: <Users className="text-orange-600" size={28} />,
      title: 'Child Helpline',
      description: 'Support for children in distress or danger',
      contact: '1098',
      category: 'Child',
      isUrgent: true,
      website: 'https://www.childline.org'
    },
    {
      id: 6,
      icon: <ShieldAlert className="text-teal-600" size={28} />,
      title: 'Cyber Crime Helpline',
      description: 'Report online fraud, harassment, and cyber crimes',
      contact: '1930',
      category: 'Cyber Crime',
      website: 'https://www.cybercrime.gov',
      email: 'report@cybercrime.gov'
    },
    {
      id: 7,
      icon: <Scale className="text-blue-600" size={28} />,
      title: 'Legal Aid Helpline',
      description: 'Free legal advice and guidance',
      contact: '1516',
      category: 'Legal Aid',
      website: 'https://www.legalaid.gov'
    },
    {
      id: 8,
      icon: <Flame className="text-orange-600" size={28} />,
      title: 'Fire Emergency',
      description: 'Report fires and request fire department assistance',
      contact: '101',
      category: 'Emergency',
      isUrgent: true
    },
    {
      id: 9,
      icon: <Building2 className="text-blue-600" size={28} />,
      title: 'COVID-19 Helpline',
      description: 'Information and assistance related to COVID-19',
      contact: '1075',
      category: 'Emergency',
      website: 'https://www.covidhelp.gov'
    },
    {
      id: 10,
      icon: <Heart className="text-purple-600" size={28} />,
      title: 'Suicide Prevention Helpline',
      description: '24/7 emotional support for those in crisis',
      contact: '9152987821',
      category: 'Mental Health',
      isUrgent: true,
      website: 'https://www.suicideprevention.org',
      chat: true
    },
    {
      id: 11,
      icon: <BadgeHelp className="text-blue-600" size={28} />,
      title: 'Senior Citizen Helpline',
      description: 'Support and assistance for elderly citizens',
      contact: '14567',
      category: 'Legal Aid',
      website: 'https://www.eldercare.gov'
    },
    {
      id: 12,
      icon: <ShieldAlert className="text-pink-600" size={28} />,
      title: 'Women\'s Safety Helpline',
      description: 'For women facing domestic violence or harassment',
      contact: '181',
      category: 'Women',
      isUrgent: true,
      website: 'https://www.womensafety.gov'
    }
  ];
  
  const filteredHelplines = helplines.filter(helpline => {
    const matchesSearch = 
      helpline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      helpline.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      helpline.contact.includes(searchQuery);
    
    const matchesCategory = activeCategory === 'All' || helpline.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const urgentHelplines = helplines.filter(helpline => helpline.isUrgent);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: 50,
      opacity: 0
    }
  };
  
  // Reset search when category changes
  useEffect(() => {
    setSearchQuery('');
  }, [activeCategory]);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header & Search */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-rose-800 mb-4">Emergency & Support Helplines</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          Quick access to emergency services and support helplines. Find the help you need, when you need it.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search helplines..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category 
                ? 'bg-rose-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </motion.button>
        ))}
      </div>
      
      {/* Helpline Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {filteredHelplines.length > 0 ? (
            filteredHelplines.map((helpline) => (
              <motion.div
                key={helpline.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-slate-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 ${
                  helpline.category === 'Emergency' ? 'border-red-500' :
                  helpline.category === 'Women' ? 'border-pink-500' :
                  helpline.category === 'Mental Health' ? 'border-purple-500' :
                  helpline.category === 'Legal Aid' ? 'border-blue-500' :
                  helpline.category === 'Cyber Crime' ? 'border-teal-500' :
                  helpline.category === 'Child' ? 'border-orange-500' : 'border-gray-500'
                }`}
              >
                <div className="flex items-start mb-4">
                  <div className="mr-3">{helpline.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{helpline.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{helpline.description}</p>
                  </div>
                </div>
                
                <a 
                  href={`tel:${helpline.contact}`}
                  className="flex items-center justify-center w-full py-2 px-4 bg-rose-300 hover:bg-rose-400 text-white font-medium rounded-md transition-colors mt-4"
                >
                  <Phone size={18} className="mr-2" />
                  <span className="text-lg font-semibold">{helpline.contact}</span>
                </a>
                
                {/* Additional contact options */}
                <div className="flex justify-center gap-3 mt-3">
                  {helpline.website && (
                    <a 
                      href={helpline.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-rose-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="Visit Website"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {helpline.chat && (
                    <a 
                      href="#" 
                      className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                      title="Chat Support"
                    >
                      <MessageSquare size={18} />
                    </a>
                  )}
                  {helpline.email && (
                    <a 
                      href={`mailto:${helpline.email}`} 
                      className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                      title="Email Support"
                    >
                      <Mail size={18} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500">No helplines found matching your search.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-3 text-rose-600 hover:text-rose-800 font-medium"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* SOS Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-rose-600 text-white shadow-lg flex items-center justify-center hover:bg-red-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSOS(true)}
      >
        <AlertTriangle size={24} />
      </motion.button>
      
      {/* SOS Modal */}
      <AnimatePresence>
        {showSOS && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-red-600 p-4 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center">
                  <AlertTriangle size={20} className="mr-2" />
                  Emergency Helplines
                </h3>
                <button 
                  onClick={() => setShowSOS(false)}
                  className="p-1 hover:bg-red-700 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                {urgentHelplines.map((helpline) => (
                  <div key={helpline.id} className="py-3 border-b border-gray-200 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">{helpline.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{helpline.title}</h4>
                          <p className="text-xs text-gray-500">{helpline.category}</p>
                        </div>
                      </div>
                      
                      <a 
                        href={`tel:${helpline.contact}`}
                        className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-1.5 rounded transition-colors"
                      >
                        <Phone size={16} />
                        {helpline.contact}
                      </a>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">For immediate emergencies, please dial 112</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelplineSection;