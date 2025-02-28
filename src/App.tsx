import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Star, Quote, Wine, Utensils, Wifi, Car, ChefHat, Salad, Phone, ChevronDown, Filter, ChevronUp, ArrowUpRight, X } from 'lucide-react';

// Menu data
const menuData = {
  lunch: [
    {
      category: "SOUP & SALAD",
      items: [
        { name: "Red Lentil Soup", description: "with pita, paprika oil, lemon and herbs.", price: 9 }
      ]
    },
    {
      category: "IN PITA",
      items: [
        { name: "Organic Chickpea Falafel", price: 15 },
        { name: "Roasted Chicken", price: 15 },
        { name: "Quinoa Mizuna Salad", description: "radish, kasseri cheese, pistachio, cucumber, raisins, nuts, apple with tahini vinaigrette", price: 16 },
        { name: "Braised Lamb Shoulder", price: 17 },
        { name: "Greek Chicken Salad", description: "lettuce, avocado, cucumber, tomato & feta", price: 18 },
        { name: "Chickpea Falafel Salad", description: "mix greens, tomato, cucumber, avocado, humus and pita", price: 17, note: "add chicken $6 / braised lamb $7 / salmon skewer $9" }
      ]
    },
    {
      category: "STARTERS",
      items: [
        { name: "Crispy Spiced Brussels Sprouts", description: "with aioli on the side", price: 13 },
        { name: "Cheese Borek", description: "with olives", price: 13 },
        { name: "Roasted Cauliflower", description: "with urfa chili, scallion and tzatziki", price: 15 },
        { name: "Warm Hummus w/ Za'atar Spiced Lamb", description: "with pita", price: 17 },
        { name: "Hummus, Tzatziki, Muhammara", price: 22, note: "Each - $10" },
        { name: "Turkish Spiced Fries", description: "with aioli", price: 9 }
      ]
    },
    {
      category: "ENTREES",
      items: [
        { name: "Chicken Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 22 },
        { name: "Lamb Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 24 },
        { name: "Salmon Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 24 },
        { name: "Braised Lamb Shoulder", description: "with rice, grilled shishito, tzatziki and harissa", price: 24 }
      ]
    },
    {
      category: "VEGETARIAN FEAST",
      items: [
        { 
          name: "Vegetarian Feast for Two", 
          price: 70,
          description: "Mezze Plate: Tzatkizi, Hummus, Muhammara, Falafel, Tomato and Cucumber with Pita\nRoasted Cauliflower\nCrispy Spiced Brussels Sprouts with Aioli\nGreek Salad\nVegetable Moussaka with Rice"
        }
      ]
    }
  ],
  dinner: [
    {
      category: "SOUP & SALAD",
      items: [
        { name: "Red Lentil Soup", description: "with pita, paprika oil, lemon and herbs.", price: 9 }
      ]
    },
    {
      category: "IN PITA",
      items: [
        { name: "Organic Chickpea Falafel", price: 15 },
        { name: "Roasted Chicken", price: 15 },
        { name: "Quinoa Mizuna Salad", description: "radish, kasseri cheese, pistachio, cucumber, raisins, nuts, apple with tahini vinaigrette", price: 16 },
        { name: "Braised Lamb Shoulder", price: 17 },
        { name: "Greek Chicken Salad", description: "lettuce, avocado, cucumber, tomato & feta", price: 18 },
        { name: "Chickpea Falafel Salad", description: "mix greens, tomato, cucumber, avocado, humus and pita", price: 17, note: "add chicken $6 / braised lamb $7 / salmon skewer $9" }
      ]
    },
    {
      category: "STARTERS",
      items: [
        { name: "Crispy Spiced Brussels Sprouts", description: "with aioli on the side", price: 13 },
        { name: "Cheese Borek", description: "with olives", price: 13 },
        { name: "Roasted Cauliflower", description: "with urfa chili, scallion and tzatziki", price: 15 },
        { name: "Warm Hummus w/ Za'atar Spiced Lamb", description: "with pita", price: 17 },
        { name: "Hummus, Tzatziki, Muhammara", price: 22, note: "Each - $10" },
        { name: "Turkish Spiced Fries", description: "with aioli", price: 9 }
      ]
    },
    {
      category: "ENTREES",
      items: [
        { name: "Chicken Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 22 },
        { name: "Lamb Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 24 },
        { name: "Salmon Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 24 },
        { name: "Braised Lamb Shoulder", description: "with rice, grilled shishito, tzatziki and harissa", price: 24 }
      ]
    },
    {
      category: "VEGETARIAN FEAST",
      items: [
        { 
          name: "Vegetarian Feast for Two", 
          price: 70,
          description: "Mezze Plate: Tzatkizi, Hummus, Muhammara, Falafel, Tomato and Cucumber with Pita\nRoasted Cauliflower\nCrispy Spiced Brussels Sprouts with Aioli\nGreek Salad\nVegetable Moussaka with Rice"
        }
      ]
    }
  ],
  brunch: [
    {
      category: "BRUNCH SPECIALS",
      items: [
        { name: "Greek Omelette", description: "with spinach, feta, avocado, tomato and pita", price: 17 },
        { name: "Shakshuka", description: "2 baked eggs in a rich tomato sauce with eggplant, peppers", price: 19 },
        { name: "Turkish Scramble", description: "tomato, red and green bell peppers, paprika, feta and pita", price: 16 },
        { name: "Beef Sausage Eggs", description: '"sucuklu yumurta" fried eggs with Turkish beef sausage, olives and pita', price: 18 },
        { name: "Eggplant Toast", description: "Rustic cut thick sourdough toast with eggs, avocado, eggplant and house made muhammara", price: 15 },
        { name: "Avocado Toast", description: "with labneh, cream cheese, cucumber, scrambled egg and zaatar", price: 14 },
        { name: "Nutella Banana Toast", description: "nutella, banana and almonds", price: 12 },
        { name: "Greek Yogurt Bowl", description: "with honey, fresh berries and crumbled walnuts", price: 12 },
        { name: "Simit", description: "turkish sesame bagel", price: 5 },
        { name: "Pogaca", description: "turkish savory cheese bun", price: 4.50 }
      ]
    },
    {
      category: "TURKISH BREAKFAST",
      items: [
        { 
          name: "Family Style", 
          price: 60,
          description: "On Tray:\nmarinated olives, selections of cheese, tomato cucumber salad, fresh fruits, tahini spread, kaymak with honey, labneh parfait, muhammara\n\nMain:\nshakshuka with beef sausage\n\nBread Basket:\nsimit, cheese borek and pita"
        }
      ]
    },
    {
      category: "SOUP & SALAD",
      items: [
        { name: "Red Lentil Soup", description: "with pita, paprika oil, lemon and herbs.", price: 9 },
        { name: "Quinoa Mizuna Salad", description: "radish, kasseri cheese, pistachio, cucumber, raisins, nuts, apple with tahini vinaigrette", price: 16 },
        { name: "Greek Chicken Salad", description: "lettuce, avocado, cucumber, tomato & feta", price: 18 },
        { name: "Chickpea Falafel Salad", description: "mix greens, tomato, cucumber, avocado, humus and pita", price: 17, note: "add chicken $6 / braised lamb $7 / salmon skewer $9" }
      ]
    },
    {
      category: "STARTERS",
      items: [
        { name: "Crispy Spiced Brussels Sprouts", description: "with aioli on the side", price: 13 },
        { name: "Cheese Borek", description: "with olives", price: 13 },
        { name: "Roasted Cauliflower", description: "with urfa chili, scallion and tzatziki", price: 15 },
        { name: "Warm Hummus w/ Za'atar Spiced Lamb", description: "with pita", price: 17 },
        { name: "Hummus, Tzatziki, Muhammara", price: 22, note: "Each - $10" },
        { name: "Turkish Spiced Fries", description: "with aioli", price: 9 }
      ]
    },
    {
      category: "ENTREES",
      items: [
        { name: "Chicken Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 26 },
        { name: "Lamb Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 28 },
        { name: "Salmon Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 29 }
      ]
    }
  ],
  dessert: [
    {
      category: "DESSERTS",
      items: [
        { name: "Chef Alex's warm chocolate lava cake", description: "with creme fraiche", price: 12 },
        { name: "Pistachio baklava", description: "flaky phyllo with pistachio & honey", price: 12 },
        { name: "Künefe", description: 'baked, crispy shredded "kataifi" with cheese & pistachio', price: 12 },
        { name: "LOKUM", description: "traditional variety of Turkish delights", price: 12 }
      ]
    },
    {
      category: "AFTER DINNER DRINKS",
      items: [
        { name: "Graham's Tawny Port", price: 12 },
        { name: "Coffee", price: 3.50 },
        { name: "Turkish coffee", price: 5 },
        { name: "Turkish tea (black)", price: 4 },
        { name: "Herbal Tea", price: 3.50 }
      ]
    }
  ],
  wine: [
    {
      category: "WHITES",
      items: [
        { name: "N/V Pol Clement Sparkling, Blanc de Blancs, France", price: "13" },
        { name: "Raeburn, Rosé, Sonoma County, CA '22", price: "13/52" },
        { name: "Joseph Drouhin, Macon-Villages, France '20", price: "14/56" },
        { name: "Cankaya, Narince, Turkey '21", price: "14/56" },
        { name: "Amethystos, Sauvignon Blanc Blend, Greece '22", price: "14/56" },
        { name: "Villa Solais, Vermentino, Italy '22", price: "13.50/54" }
      ]
    },
    {
      category: "REDS",
      items: [
        { name: "Scattered Peaks, Cabernet Sauvignon, CA '21", price: "16/62" },
        { name: "Amethystos, Cabernet Sauvignon, Greece '21", price: "15/56" },
        { name: "Domaine des Tourelles, Cab, Syrah Blend, Lebanon '21", price: "14/56" },
        { name: "Llama, Malbec, Argentina '21", price: "14/56" },
        { name: "Yakut, Öküzgözü-Boğazkere, Turkey '22", price: "14/54" },
        { name: "Raeburn, Pinot Noir, Russian River Valley, CA '22", price: "15/56" }
      ]
    },
    {
      category: "BEER",
      items: [
        { name: "East Brothers, Pilsener", price: 9 },
        { name: "Ruekeller, Lager", price: 9 },
        { name: "Almanac, Love Hazy IPA", price: 9 },
        { name: "Boont, Amber Ale", price: 9 },
        { name: "Mediterranean Beer (Seasonal)", price: 9 },
        { name: "Erdinger (NA)-Germany", price: 9 },
        { name: "Stem Real Dry Apple Cider", price: 9 }
      ]
    },
    {
      category: "MIMOSAS",
      items: [
        { name: "Pomogranate", price: 13 },
        { name: "Orange", price: 13 },
        { name: "Rose Bellini", price: 13 },
        { name: "Lavender", price: 13 }
      ]
    },
    {
      category: "LOW PROOF COCKTAILS",
      items: [
        { name: "Mint Mojito", price: 14 },
        { name: "Lemon Drop", price: 14 },
        { name: "Helen of Troy", description: "Rose, Pomegranate", price: 14 },
        { name: "Romeo and Juliet", description: "Cucumber, Lemon Juice, Rose", price: 14 },
        { name: "Lavender Spritz", price: 14 },
        { name: "Tropical Sunset Spritz", price: 14 }
      ],
      note: "Mocktails are available. Please ask your server."
    },
    {
      category: "BEVERAGES",
      items: [
        { name: "Diet Coke", price: 3 },
        { name: "Coke", price: 3 },
        { name: "Sparkling Water (750ml)", price: 9 },
        { name: "Fentimans - Rose Lemonade", price: 5 },
        { name: "Iced Tea or Coffee", price: 4 },
        { name: "Turkish Coffee", price: 5 },
        { name: "Turkish Tea", price: 4 },
        { name: "Herb Tea", price: 3.50 },
        { name: "Coffee", price: 3.50 },
        { name: "OJ (weekends only)", price: 6.50 }
      ]
    }
  ]
};

interface MenuItem {
  name: string;
  description?: string;
  price: number | string;
  note?: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  menuItems: MenuSection[];
}

// Modal Component
const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, title, menuItems }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-primary w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl border border-white/20">
        <div className="sticky top-0 bg-primary/80 backdrop-blur-xl border-b border-white/20 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <h3 className="text-xl font-semibold mb-6 text-accent border-b border-accent/20 pb-2">{section.category}</h3>
              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline gap-4">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="text-right whitespace-nowrap border-b border-dotted border-text-secondary/30 flex-1"></div>
                        <div className="text-right whitespace-nowrap font-medium">
                          ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-text-secondary text-sm mt-1 whitespace-pre-line">{item.description}</p>
                      )}
                      {item.note && (
                        <p className="text-accent text-sm mt-1 italic">{item.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isReservationExpanded, setIsReservationExpanded] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'lunch' | 'dinner' | 'brunch' | 'dessert' | 'wine' | null>(null);
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
                        <button
                          onClick={() => {
                            setActiveMenu('lunch');
                            setIsMenuDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Lunch Menu
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenu('dinner');
                            setIsMenuDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Dinner Menu
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenu('brunch');
                            setIsMenuDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Brunch Menu
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenu('dessert');
                            setIsMenuDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Dessert Menu
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenu('wine');
                            setIsMenuDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          Wine List
                        </button>
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

      {/* Menu Modals */}
      <MenuModal
        isOpen={activeMenu === 'lunch'}
        onClose={() => setActiveMenu(null)}
        title="Lunch Menu"
        menuItems={menuData.lunch}
      />
      <MenuModal
        isOpen={activeMenu === 'dinner'}
        onClose={() => setActiveMenu(null)}
        title="Dinner Menu"
        menuItems={menuData.dinner}
      />
      <MenuModal
        isOpen={activeMenu === 'brunch'}
        onClose={() => setActiveMenu(null)}
        title="Brunch Menu"
        menuItems={menuData.brunch}
      />
      <MenuModal
        isOpen={activeMenu === 'dessert'}
        onClose={() => setActiveMenu(null)}
        title="Dessert Menu"
        menuItems={menuData.dessert}
      />
      <MenuModal
        isOpen={activeMenu === 'wine'}
        onClose={() => setActiveMenu(null)}
        title="Wine List"
        menuItems={menuData.wine}
      />
    </div>
  );
}

export default App;