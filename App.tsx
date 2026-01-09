import React from 'react';
import { useStore } from './services/store';
import { MenuPage } from './components/CustomerComponents';

function App() {
  const { 
    products, 
    categories, 
    loyaltyConfig,
    menuType
  } = useStore();

  return (
    <MenuPage 
      categories={categories} 
      products={products} 
      loyaltyConfig={loyaltyConfig}
      menuType={menuType}
    />
  );
}

export default App;