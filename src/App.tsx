import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Star, Quote, Wine, Utensils, Wifi, Car, ChefHat, Salad, Phone, ChevronDown, Filter, ChevronUp, ArrowUpRight, X, ChevronRight } from 'lucide-react';

// Menu data
const menuData = {
  lunch: [
    {
      category: "SOUP & SALAD",
      items: [
        { name: "Red Lentil Soup", description: "with pita, paprika oil, lemon and herbs", price: 9 },
        { name: "Quinoa Mizuna Salad", description: "radish, kasseri cheese, pistachio, cucumber, raisins, nuts, apple with tahini vinaigrette", price: 16 },
        { name: "Greek Chicken Salad", description: "lettuce, avocado, cucumber, tomato & feta", price: 18 },
        { name: "Chickpea Falafel Salad", description: "mix greens, tomato, cucumber, avocado, humus and pita", price: 17, note: "add chicken $6 / braised lamb $7 / salmon skewer $9" }
      ]
    },
    {
      category: "IN PITA",
      items: [
        { name: "Organic Chickpea Falafel", price: 15 },
        { name: "Roasted Chicken", price: 15 },
        { name: "Vegetable Moussaka with Rice", price: 70 },
        { name: "Braised Lamb Shoulder", price: 17 }
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
          description: "Mezze Plate: Tzatziki, Hummus, Muhammara, Falafel, Tomato and Cucumber with Pita\nRoasted Cauliflower\nCrispy Spiced Brussels Sprouts with Aioli\nGreek Salad",
          price: 70
        }
      ]
    }
  ],
  dinner: [
    {
      category: "STARTERS",
      items: [
        { name: "Red Lentil Soup", description: "with pita, paprika oil, lemon and herbs", price: 9 },
        { name: "Quinoa Mizuna Salad", description: "radish, kasseri cheese, pistachio, cucumber, raisins, nuts & apple with tahini vinaigrette", price: 16, note: "add chicken $6 / braised lamb $7 / salmon skewer $9" },
        { name: "Crispy Spiced Brussels Sprouts", description: "with aioli on the side", price: 13 },
        { name: "Cheese Borek", description: "with olives", price: 13 },
        { name: "Chickpea Falafel", description: "with hummus, pita, and pickles, harissa", price: 13 },
        { name: "Roasted Cauliflower", description: "with urfa chili, scallion and tzatziki", price: 15 },
        { name: "Baked Eggplant", description: "with herb yogurt, dill, almonds and raisins", price: 14 },
        { name: "Warm Hummus w/ Za'atar Spiced Lamb", description: "with pita", price: 17 },
        { name: "Hummus, Tzatziki, Muhammara", description: "with pita", price: 22, note: "Each - $10" },
        { name: "Turkish Spiced Fries", description: "with aioli", price: 9 }
      ]
    },
    {
      category: "ENTREES",
      items: [
        { name: "Chicken Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 26 },
        { name: "Lamb Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 28 },
        { name: "Salmon Skewers", description: "with rice, grilled shishito, tzatziki and harissa", price: 29 },
        { name: "Braised Lamb Shoulder", description: "with almonds, raisins, rice, tzatziki and harissa", price: 26 },
        { name: "Vegetable Moussaka", description: "with rice", price: 23 },
        { name: "Manti Turkish Beef Dumplings", description: "with yogurt sauce and paprika oil", price: 23 },
        { name: "Baby Lamb Chops", description: "with roasted potatoes and warm humus", price: 39 }
      ]
    },
    {
      category: "VEGETARIAN FEAST",
      items: [
        { 
          name: "Vegetarian Feast for Two", 
          description: "Mezze Plate: Tzatziki, Hummus, Muhammara, Falafel, Tomato and Cucumber with Pita\nRoasted Cauliflower\nCrispy Spiced Brussels Sprouts with Aioli\nGreek Salad\nVegetable Moussaka with Rice",
          price: 70
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
          description: "On Tray:\nmarinated olives, selections of cheese, tomato cucumber salad, fresh fruits, tahini spread, kaymak with honey, labneh parfait, muhammara\n\nMain:\nshakshuka with beef sausage\n\nBread Basket:\nsimit, cheese borek and pita",
          price: 60
        }
      ]
    },
    {
      category: "SOUP & SALAD",
      items: [
        { name: "Red Lentil Soup", description: "with pita, paprika oil, lemon and herbs", price: 9 },
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
        { name: "Hummus, Tzatziki, Muhammara", description: "with pita", price: 22, note: "Each - $10" },
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
        { name: "Rose", price: 13 },
        { name: "Bellini", price: 13 },
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
  ],
  afterDinner: [
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
  ]
};

// Types
type MenuType = 'lunch' | 'dinner' | 'brunch' | 'dessert' | 'wine';

interface MenuItem {
  name: string;
  description?: string;
  price: number | string;
  note?: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
  note?: string;
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuSection[];
}

// Modal Component
const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, menuItems }) => {
  const [activeSection, setActiveSection] = useState<string>(menuItems[0]?.category || '');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize refs for each section
      menuItems.forEach((section) => {
        if (!sectionRefs.current[section.category]) {
          sectionRefs.current[section.category] = null;
        }
      });

      // Reset scroll position when modal opens
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      // Set initial active section
      setActiveSection(menuItems[0]?.category || '');
    }
  }, [isOpen, menuItems]);

  // Handle scroll events with debounce
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const container = contentRef.current;
    const handleScroll = () => {
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const headerOffset = 120; // Increased offset to account for both headers

        let maxVisibleSection = {
          id: activeSection,
          visibleHeight: 0,
          distance: Infinity
        };

        Object.entries(sectionRefs.current).forEach(([category, element]) => {
          if (!element) return;

          const rect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const topOffset = rect.top - containerRect.top;
          
          // Calculate how much of the section is visible
          const visibleHeight = Math.min(
            rect.height,
            Math.max(0, containerHeight - Math.max(0, topOffset - headerOffset))
          );

          // Calculate distance from the top of the viewport (accounting for header)
          const distance = Math.abs(topOffset - headerOffset);

          // Prioritize sections that are closer to the top and more visible
          if (visibleHeight > 0 && (
            distance < maxVisibleSection.distance || 
            (distance === maxVisibleSection.distance && visibleHeight > maxVisibleSection.visibleHeight)
          )) {
            maxVisibleSection = {
              id: category,
              visibleHeight: visibleHeight,
              distance: distance
            };
          }
        });

        if (maxVisibleSection.id !== activeSection) {
          setActiveSection(maxVisibleSection.id);
          // Center the active button in the navigation
          if (navRef.current) {
            const button = navRef.current.querySelector(`[data-category="${maxVisibleSection.id}"]`) as HTMLButtonElement;
            if (button) {
              const container = navRef.current;
              const scrollLeft = button.offsetLeft - (container.offsetWidth / 2) + (button.offsetWidth / 2);
              container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
          }
        }

        lastScrollTop.current = scrollTop;
      }, 50); // Small delay to debounce scroll events
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for active section
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [isOpen, activeSection]);

  const scrollToSection = (category: string) => {
    const element = sectionRefs.current[category];
    if (element && contentRef.current) {
      const containerTop = contentRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const headerOffset = 120; // Match the offset used in scroll handling
      
      contentRef.current.scrollTo({
        top: contentRef.current.scrollTop + (elementTop - containerTop - headerOffset),
        behavior: 'smooth'
      });
      
      setActiveSection(category);

      // Scroll navigation to center the active button
      if (navRef.current) {
        const button = navRef.current.querySelector(`[data-category="${category}"]`) as HTMLButtonElement;
        if (button) {
          const container = navRef.current;
          const scrollLeft = button.offsetLeft - (container.offsetWidth / 2) + (button.offsetWidth / 2);
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }
  };

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
      <div className="bg-primary w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl border border-white/20 flex flex-col">
        <div className="sticky top-0 z-10">
          <div className="bg-primary/80 backdrop-blur-xl border-b border-white/20 p-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Our Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div 
            ref={navRef}
            className="bg-primary/60 backdrop-blur-xl border-b border-white/20 overflow-x-auto scrollbar-hide"
          >
            <div className="flex gap-2 p-2 min-w-max">
              {menuItems.map((section) => (
                <button
                  key={section.category}
                  data-category={section.category}
                  onClick={() => scrollToSection(section.category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeSection === section.category
                      ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white'
                      : 'hover:bg-purple-500/10'
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div 
          ref={contentRef}
          className="overflow-y-auto flex-1 scroll-smooth"
        >
          <div className="p-6">
            {menuItems.map((section) => (
              <div
                key={section.category}
                id={section.category}
                ref={(el) => (sectionRefs.current[section.category] = el)}
                className="mb-12 last:mb-0 scroll-mt-32"
              >
                <h3 className="text-xl font-semibold mb-6 text-purple-300 border-b border-purple-500/20 pb-2">
                  {section.category}
                </h3>
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
                          <p className="text-text-secondary text-sm mt-1 whitespace-pre-line">
                            {item.description}
                          </p>
                        )}
                        {item.note && (
                          <p className="text-purple-500 text-sm mt-1 italic">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {section.note && (
                  <p className="text-purple-500 text-sm mt-4 italic">
                    {section.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isReservationExpanded, setIsReservationExpanded] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuType>('lunch');
  const reservationRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  // Organize menu sections into five main categories
  const allMenuSections: MenuSection[] = [
    {
      category: "LUNCH",
      items: [
        { name: "SOUP & SALAD", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.lunch[0].items,
        { name: "IN PITA", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.lunch[1].items,
        { name: "STARTERS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.lunch[2].items,
        { name: "ENTREES", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.lunch[3].items,
        { name: "VEGETARIAN FEAST", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.lunch[4].items
      ]
    },
    {
      category: "DINNER",
      items: [
        { name: "STARTERS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.dinner[0].items,
        { name: "ENTREES", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.dinner[1].items,
        { name: "VEGETARIAN FEAST", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.dinner[2].items
      ]
    },
    {
      category: "BRUNCH",
      items: [
        { name: "BRUNCH SPECIALS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.brunch[0].items,
        { name: "TURKISH BREAKFAST", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.brunch[1].items,
        { name: "SOUP & SALAD", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.brunch[2].items,
        { name: "STARTERS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.brunch[3].items,
        { name: "ENTREES", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.brunch[4].items
      ]
    },
    {
      category: "DESSERT",
      items: [
        { name: "DESSERTS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.dessert[0].items,
        { name: "AFTER DINNER DRINKS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.afterDinner[0].items
      ]
    },
    {
      category: "DRINKS",
      items: [
        { name: "WHITE WINES", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.wine[0].items,
        { name: "RED WINES", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.wine[1].items,
        { name: "BEER", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.wine[2].items,
        { name: "MIMOSAS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.wine[3].items,
        { name: "LOW PROOF COCKTAILS", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.wine[4].items,
        { name: "BEVERAGES", price: "", description: "━━━━━━━━━━━━━━━━━━━━━━" },
        ...menuData.wine[5].items
      ],
      note: "Please ask your server about our seasonal wine selections and daily specials."
    }
  ];

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
      name: "Lamb Skewers",
      description: "With rice, grilled shishito, tzatziki and harissa",
      image: "./Images/2.jpg"
    },
    {
      id: 2,
      name: "'Manti' Turkish Beef Dumplings",
      description: "with yogurt sauce and paprika oil",
      image: "./Images/Manti.jpg"
    },
    {
      id: 3,
      name: "Baked Eggplant",
      description: "With yogurt sauce and paprika oil ",
      image: "./Images/Baked Eggplant.png"
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
              src="./Images/1.jpg" 
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
                      className="flex items-center gap-1 opacity-85 
                        hover:opacity-100 hover:text-purple-500
                        group relative cursor-pointer px-2 py-1 -mx-2 rounded hover:bg-white/5"
                    >
                      <MapPin className="w-6 min-w-[24px] group-hover:scale-110 transition-transform" />
                      <span className="group-hover:underline">2125 Fillmore Street</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                        bg-purple-500/10 backdrop-blur-md px-2 py-1 
                        rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none 
                        border border-purple-500/20 whitespace-nowrap">
                        Open in Maps
                    </span>
                    </a>
                    <a 
                      href="tel:+14159680696" 
                      title="Call AI Host"
                      aria-label="Call AI Host"
                      className="flex items-center gap-1 opacity-85 
                        hover:opacity-100 hover:text-purple-500
                        group relative cursor-pointer px-2 py-1 -mx-2 rounded hover:bg-white/5"
                    >
                      <Phone className="w-6 min-w-[24px] group-hover:scale-110 transition-transform" />
                      <span className="group-hover:underline">(415) 968-0696</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                        bg-purple-500/10 backdrop-blur-md px-2 py-1 
                        rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none 
                        border border-purple-500/20 whitespace-nowrap">
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
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="text-purple-600 hover:text-fuchsia-500 flex items-center gap-1 transition-colors"
                >
                  View Full Menu
                  <ChevronRight className="w-4 h-4" />
                </button>
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
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={allMenuSections}
      />
    </div>
  );
};

export default App;