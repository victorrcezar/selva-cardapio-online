import { useState, useEffect } from 'react';
import { Product, Category, Order, Customer, LoyaltyConfig, LUNCH_CATEGORIES, LUNCH_PRODUCTS, DINNER_CATEGORIES, DINNER_PRODUCTS, INITIAL_LOYALTY_CONFIG } from '../types';

export type MenuType = 'lunch' | 'dinner';

export function useStore() {
  const [menuType, setMenuType] = useState<MenuType>('dinner');
  const [isOpen, setIsOpen] = useState(false);

  const checkTimeStatus = () => {
      // 1. Get current time in Brasília Time (UTC-3)
      const now = new Date();
      // Format to get components in correct timezone
      const options: Intl.DateTimeFormatOptions = { 
          timeZone: "America/Sao_Paulo", 
          hour: 'numeric', 
          minute: 'numeric',
          weekday: 'short', 
          hour12: false 
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      
      const getPart = (type: string) => parts.find(p => p.type === type)?.value;
      const hour = parseInt(getPart('hour') || '0');
      const minute = parseInt(getPart('minute') || '0');
      const weekday = getPart('weekday'); // "Mon", "Tue", ... "Sun"

      // Convert current time to minutes from start of day (0 - 1439)
      const currentMinutes = hour * 60 + minute;

      // 2. Define Schedule Ranges (in minutes)
      // Mon-Wed: 17:30 (1050) - 22:45 (1365)
      // Thu: 17:15 (1035) - 22:45 (1365)
      // Fri, Sat, Sun: 
      //    Lunch: 11:00 (660) - 15:00 (900) [Fri] or 14:45 (885) [Sat/Sun]
      //    Dinner: 17:30 (1050) - 22:45 (1365)

      let isopen = false;
      let type: MenuType = 'dinner';

      if (['Mon', 'Tue', 'Wed'].includes(weekday || '')) {
          if (currentMinutes >= 1050 && currentMinutes <= 1365) isopen = true;
      } 
      else if (weekday === 'Thu') {
          if (currentMinutes >= 1035 && currentMinutes <= 1365) isopen = true;
      }
      else if (['Fri', 'Sat', 'Sun'].includes(weekday || '')) {
          const lunchEnd = weekday === 'Fri' ? 900 : 885;
          
          if (currentMinutes >= 660 && currentMinutes <= lunchEnd) {
              isopen = true;
              type = 'lunch';
          } else if (currentMinutes >= 1050 && currentMinutes <= 1365) {
              isopen = true;
              type = 'dinner';
          }
      }

      // If closed, default to dinner for display purposes unless it's early in the day
      if (!isopen) {
          if (currentMinutes < 900) type = 'lunch';
          else type = 'dinner';
      }

      setIsOpen(isopen);
      setMenuType(type);
      return type;
  };

  // Initial State Set based on Time
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Periodically check time to switch menu automatically
  useEffect(() => {
    const updateMenu = () => {
        const currentType = checkTimeStatus();
        
        if (currentType === 'lunch') {
            setProducts(LUNCH_PRODUCTS);
            setCategories(LUNCH_CATEGORIES);
        } else {
            setProducts(DINNER_PRODUCTS);
            setCategories(DINNER_CATEGORIES);
        }
    };

    updateMenu(); // Run immediately
    const interval = setInterval(updateMenu, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gastro_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('gastro_customers');
    return saved ? JSON.parse(saved) : [];
  });

  const [loyaltyConfig, setLoyaltyConfig] = useState<LoyaltyConfig>(() => {
    const saved = localStorage.getItem('gastro_loyalty_config');
    return saved ? JSON.parse(saved) : INITIAL_LOYALTY_CONFIG;
  });

  // Persistence Effects (Only for orders/customers, products are static/time-based now)
  useEffect(() => { localStorage.setItem('gastro_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('gastro_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('gastro_loyalty_config', JSON.stringify(loyaltyConfig)); }, [loyaltyConfig]);

  // Actions
  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    
    // Loyalty Logic: Update Customer Points
    if (loyaltyConfig.enabled) {
      setCustomers(prev => {
        const existingCustomerIndex = prev.findIndex(c => c.phone === order.customerPhone);
        
        let newCustomers = [...prev];
        
        if (existingCustomerIndex >= 0) {
          // Update existing
          const customer = newCustomers[existingCustomerIndex];
          newCustomers[existingCustomerIndex] = {
            ...customer,
            points: customer.points + order.pointsEarned - order.pointsRedeemed,
            totalSpent: customer.totalSpent + order.total,
            lastOrderDate: Date.now(),
            name: order.customerName // Update name in case it changed
          };
        } else {
          // Create new
          newCustomers.push({
            id: crypto.randomUUID(),
            name: order.customerName,
            phone: order.customerPhone,
            points: order.pointsEarned,
            totalSpent: order.total,
            lastOrderDate: Date.now()
          });
        }
        return newCustomers;
      });
    }
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const getCustomerByPhone = (phone: string) => {
    return customers.find(c => c.phone === phone);
  };

  return {
    menuType,
    isOpen,
    products,
    categories,
    orders,
    customers,
    loyaltyConfig,
    addOrder,
    updateOrderStatus,
    getCustomerByPhone
  };
}