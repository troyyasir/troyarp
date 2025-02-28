import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Star, Quote, Wine, Utensils, Wifi, Car, ChefHat, Salad, Phone, ChevronDown, Filter, ChevronUp, ArrowUpRight } from 'lucide-react';

function App() {
  const [isReservationExpanded, setIsReservationExpanded] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const reservationRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reservationRef.current && !reservationRef.current.contains(event.target as Node)) {
        setIsReservationExpanded(false);
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)) {
        setIsMenuDropdownOpen(false);
      }
    };

    if (isReservationExpanded || isMenuDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isReservationExpanded, isMenuDropdownOpen]);

  const menuHighlights = [
    {
      id: 1,
      name: "Lamb Kebab",
      description: "Marinated lamb with sumac, served with bulgur pilaf and grilled vegetables",
      image: "./Images/2.jpg"
    },
    {
      id: 2,
      name: "Moussaka",
      description: "Layered eggplant, with a creamy sauce",
      image: "./Images/3.jpg"
    },
    {
      id: 3,
      name: "Vegetarian Feast",
      description: "Tzatkizi, Hummus, Muhammara, Falafel, Tomato and Cucumber with Pita",
      image: "./Images/4.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <img 
              src="./Images/4.jpg" 
              alt="Turkish breakfast spread"
              className="object-cover w-full h-full"
            />
            <img 
              src="./Images/8.jpg" 
              alt="Restaurant service"
              className="object-cover w-full h-full"
            />
            <img 
              src="./Images/3.jpg" 
              alt="Mediterranean dishes"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 pb-24 lg:pb-0">
          {/* Main Content */}
          <div className="flex-1">
            {/* Restaurant Header */}
            <div className="mb-8 p-6 rounded-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-4">Troya SF</h1>
                  <div className="flex flex-row flex-wrap items-center gap-4 text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Utensils className="w-6 min-w-[24px]" />
                      Mediterranean & Turkish Cuisine
                    </span>
                    <a 
                      href="https://maps.apple.com/?address=2125+Fillmore+Street,San+Francisco,CA"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in Maps"
                      aria-label="Open restaurant location in Maps"
                      className="flex items-center gap-1 opacity-85 hover:opacity-100 hover:text-accent 
                        group relative cursor-pointer px-2 py-1 -mx-2 rounded hover:bg-white/5"
                    >
                      <MapPin className="w-6 min-w-[24px] group-hover:scale-110 transition-transform" />
                      <span className="group-hover:underline">2125 Fillmore Street</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 
                        rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none 
                        border border-white/20 whitespace-nowrap">
                        Open in Maps
                      </span>
                    </a>
                    <a 
                      href="tel:+14159680696" 
                      title="Call AI Host"
                      aria-label="Call AI Host"
                      className="flex items-center gap-1 opacity-85 hover:opacity-100 hover:text-accent 
                        group relative cursor-pointer px-2 py-1 -mx-2 rounded hover:bg-white/5"
                    >
                      <Phone className="w-6 min-w-[24px] group-hover:scale-110 transition-transform" />
                      <span className="group-hover:underline">(415) 968-0696</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 
                        rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none 
                        border border-white/20 whitespace-nowrap">
                        Call AI Host
                      </span>
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="fill-rating text-rating w-7" />
                  <span className="text-2xl font-bold">4.8</span>
                  <span className="text-text-secondary">(324)</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-text-secondary leading-relaxed">
                Troya SF offers an intimate Mediterranean and Turkish dining experience in the heart of San Francisco. 
                Our executive chef brings authentic recipes featuring seasonal ingredients. The restaurant's elegant 
                atmosphere, complete with a charming outdoor garden, provides the perfect setting for both special 
                occasions and casual dining.
              </p>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 bg-primary p-6 rounded-xl">
              <div className="flex items-center gap-2 text-text-secondary">
                <ChefHat className="w-6" />
                <span>Family Owned</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Wifi className="w-6" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Car className="w-6" />
                <span>Street Parking</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Wine className="w-6" />
                <span>Extensive Wine List</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Salad className="w-6" />
                <span>Vegetarian Options</span>
              </div>
            </div>

            {/* Menu Highlights */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Menu Highlights</h2>
                <div ref={menuDropdownRef} className="relative">
                  <button
                    onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
                    className="text-accent hover:text-accent/80 flex items-center gap-1 transition-colors group relative"
                  >
                    View Full Menu
                    <ChevronDown className={`w-4 transition-transform ${isMenuDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMenuDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden">
                      <div className="py-1">
                        <a
                          href="https://www.troyasf.com/lunch"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Lunch Menu
                        </a>
                        <a
                          href="https://www.troyasf.com/menus"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Dinner Menu
                        </a>
                        <a
                          href="https://www.troyasf.com/brunch"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Brunch Menu
                        </a>
                        <a
                          href="https://www.troyasf.com/desert"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Dessert Menu
                        </a>
                        <a
                          href="https://www.troyasf.com/wine-list"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Wine List
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-4">
                {menuHighlights.map((item) => (
                  <div key={item.id} className="bg-tertiary hover:bg-secondary/80 transition-colors rounded-lg p-4 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-text-secondary text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reservation Panel */}
          <div className="fixed lg:relative lg:w-[480px]">
            <div className={`
              ${!isReservationExpanded ? 
                'lg:bg-transparent lg:p-6 lg:rounded-xl lg:sticky lg:top-4' : 
                'fixed inset-0 bg-transparent backdrop-blur-md z-50 flex items-center justify-center lg:relative lg:inset-auto lg:bg-transparent lg:rounded-xl lg:sticky lg:top-4'
              }
            `}>
              {!isReservationExpanded ? (
                <button 
                  onClick={() => setIsReservationExpanded(true)}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:static lg:bottom-auto
                    bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 bg-white/10 backdrop-blur-md border border-white/20 
                    hover:from-purple-500/30 hover:to-fuchsia-500/30 hover:bg-white/20 text-white font-semibold 
                    py-4 px-6 rounded-full lg:rounded-lg w-[calc(100%-3rem)] lg:w-full max-w-md
                    transition-all duration-300 shadow-lg
                    flex items-center justify-center gap-2"
                >
                  <span>Reserve a Table</span>
                  <ChevronDown className="w-6" />
                </button>
              ) : (
                <div ref={reservationRef} className="w-full h-[calc(100vh-40px)] max-w-[95vw] lg:max-w-none rounded-[30px] lg:rounded-lg overflow-hidden border border-white/20 bg-transparent backdrop-blur-xl shadow-lg">
                  <div className="flex items-center justify-between p-8 lg:p-6 border-b border-white/20 bg-transparent backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsReservationExpanded(false)}
                        className="text-white hover:text-white/80 transition-colors lg:hidden"
                      >
                        <ChevronDown className="w-6 rotate-90" />
                      </button>
                      <h2 className="font-semibold text-white">Reserve a Table</h2>
                    </div>
                    <button 
                      onClick={() => setIsReservationExpanded(false)}
                      className="text-white hover:text-white/80 transition-colors hidden lg:block"
                    >
                      <ChevronUp className="w-6" />
                    </button>
                  </div>
                  <div className="h-[calc(100vh-104px)] lg:h-[694px] w-full overflow-hidden">
                    <div className="rounded-[20px] overflow-hidden h-full w-full bg-transparent">
                      <iframe 
                        src="https://assets.thetroy.io/embed/reservation/zkAWe2jK2rMd-nU6QQN_tvKON85QpMch9d-4_zHwSqM24--ElqIIgm-MK6Ggt-BrRIYnKKWY5EFPbYAbSoyoqg" 
                        allowFullScreen={true}
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;