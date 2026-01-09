import React, { useState, useEffect } from 'react';
import { Product, Category, LoyaltyConfig } from '../types';
import { Search, X, ArrowLeft, Star, MapPin, Utensils, Clock, DollarSign, ExternalLink, Bike, Calendar, Wand2, Leaf, ChevronRight, ChevronLeft, Instagram, Flame, Trophy, Heart, Salad, Beer, Baby, UtensilsCrossed, Pizza } from './Icons';
import { useStore } from '../services/store';

// --- Global Type Definition for Facebook Pixel ---
declare global {
  interface Window {
    fbq: any;
  }
}

// --- Official Icons (SVGs) ---
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 17.472C16.128 18.816 14.328 19.608 12.384 19.608C8.4 19.608 5.16 16.368 5.16 12.384C5.16 10.44 5.952 8.64 7.296 7.296C10.08 4.512 14.664 4.512 17.472 7.296C20.256 10.08 20.256 14.664 17.472 17.472ZM12.384 2.16C6.744 2.16 2.16 6.744 2.16 12.384C2.16 14.208 2.688 15.912 3.6 17.376L2.4 21.6L6.768 20.448C8.4 21.6 10.32 22.296 12.384 22.296C17.856 22.296 22.296 17.856 22.296 12.384C22.296 6.912 17.856 2.16 12.384 2.16ZM16.344 15.552C16.176 15.552 15.864 15.48 15.48 15.288C15.024 15.072 13.992 14.568 13.68 14.4C13.56 14.328 13.392 14.232 13.32 14.352C13.2 14.52 12.864 14.928 12.744 15.072C12.648 15.192 12.528 15.216 12.336 15.12C11.664 14.808 10.848 14.328 10.152 13.704C9.6 13.2 9.216 12.672 9.096 12.48C9.024 12.312 9.12 12.216 9.216 12.12C9.312 12.024 9.408 11.856 9.504 11.736C9.624 11.592 9.672 11.52 9.744 11.376C9.816 11.232 9.792 11.088 9.72 10.992C9.672 10.896 9.168 9.696 8.976 9.216C8.784 8.76 8.568 8.808 8.424 8.808C8.304 8.808 8.16 8.808 8.016 8.808C7.8 8.808 7.512 8.88 7.296 9.12C6.984 9.456 6.168 10.224 6.168 11.808C6.168 13.392 7.32 14.904 7.488 15.12C7.68 15.36 9.696 18.432 12.72 19.728C14.736 20.616 15.528 20.496 16.344 20.4C17.256 20.28 18.24 19.752 18.672 18.528C19.128 17.304 19.128 16.272 18.984 16.032C18.864 15.864 18.648 15.744 18.336 15.672L16.344 15.552Z" fill="currentColor"/>
        <path d="M12.384 21.624C10.464 21.624 8.664 21.096 7.104 20.184L2.832 21.312L3.984 17.16C2.976 15.696 2.448 13.968 2.448 12.144C2.448 6.672 6.912 2.208 12.384 2.208C17.856 2.208 22.32 6.672 22.32 12.144C22.32 17.616 17.856 21.624 12.384 21.624Z" stroke="white" strokeWidth="0.5" strokeOpacity="0.1"/>
    </svg>
);

// --- Helper for Icons ---
const getCategoryIcon = (id: string, size = 18) => {
    switch (id) {
        case 'destaques': return <Flame size={size} />;
        case 'promocao': return <DollarSign size={size} />;
        case 'top1': return <Trophy size={size} />;
        case 'amadas': return <Heart size={size} />;
        case 'entradas': return <UtensilsCrossed size={size} />;
        case 'saladas': return <Salad size={size} />;
        case 'kids': return <Baby size={size} />;
        case 'bebidas': return <Beer size={size} />;
        case 'banquete': return <Utensils size={size} />;
        case 'almoco': return <Utensils size={size} />;
        default: return <Pizza size={size} />;
    }
}

// --- Product Detail Modal ---
interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const handleIfoodClick = () => {
      // Track InitiateCheckout with Product Details
      if (window.fbq) {
          window.fbq('track', 'InitiateCheckout', {
              content_name: product.name,
              content_ids: [product.id],
              content_type: 'product',
              value: product.price,
              currency: 'BRL'
          });
      }
      window.open('https://www.ifood.com.br/delivery/vila-velha-es/selva-pizzaria-praia-da-costa/a8ba6e5e-9fec-4c67-89f6-97b18fd6674f?utm_medium=share', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={onClose} />
        <div className="bg-jungle-950 w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col max-h-[90vh]">
            <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors">
                <X size={20} />
            </button>
            <div className="h-64 sm:h-80 w-full relative shrink-0">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jungle-950 via-transparent to-transparent opacity-90"></div>
                {product.isPopular && (
                    <div className="absolute top-4 left-4 bg-jungle-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1 backdrop-blur-sm border border-white/10">
                        <Leaf size={12} fill="currentColor" /> Popular
                    </div>
                )}
            </div>
            <div className="p-6 -mt-12 relative z-10 flex flex-col flex-1 overflow-y-auto">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-100 mb-2 leading-tight">{product.name}</h2>
                <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl font-bold text-jungle-400">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-stone-400 line-through">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
                    )}
                </div>
                <p className="text-stone-300 leading-relaxed font-light text-base mb-8">{product.description}</p>
                <div className="mt-auto pt-4">
                    <button onClick={handleIfoodClick} className="w-full bg-[#EA1D2C] hover:bg-red-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-red-900/20 transition-all active:scale-98 flex items-center justify-center gap-2 text-lg">
                        <span>Pedir no iFood</span>
                        <ExternalLink size={20} />
                    </button>
                    <p className="text-center text-stone-500 text-xs mt-3">Você será redirecionado para o iFood</p>
                </div>
            </div>
        </div>
    </div>
  );
};

// --- Main Components ---

interface MenuPageProps {
  categories: Category[];
  products: Product[];
  loyaltyConfig: LoyaltyConfig;
  menuType?: 'lunch' | 'dinner';
}

export const MenuPage: React.FC<MenuPageProps> = ({ categories, products, loyaltyConfig, menuType = 'dinner' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const { isOpen } = useStore();

  // Filter out hidden upsell categories from main list
  const visibleCategories = categories.filter(c => c.id !== 'upsell_hidden');

  // Group products
  const categorizedProducts = visibleCategories.map(cat => ({
    ...cat,
    products: products.filter(p => p.categoryId === cat.id && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(group => group.products.length > 0);

  const scrollToCategory = (id: string) => {
    setSelectedCategory(id);
    const element = document.getElementById(`category-${id}`);
    if (element) {
        const yOffset = -180; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const handleIfoodClick = () => {
      // Track General Click
      if (window.fbq) {
          window.fbq('track', 'InitiateCheckout', {
              content_name: 'General iFood Floating Button'
          });
      }
      window.open('https://www.ifood.com.br/delivery/vila-velha-es/selva-pizzaria-praia-da-costa/a8ba6e5e-9fec-4c67-89f6-97b18fd6674f?utm_medium=share', '_blank');
  };

  return (
    <div className="bg-jungle-1000 min-h-screen pb-0 font-sans selection:bg-jungle-400 selection:text-white flex flex-col relative overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Pattern - Subtle Noise/Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0" 
        style={{ 
            backgroundImage: 'url("https://static.wixstatic.com/media/1f17f3_7d8b1399a98d4a3b825b571f15e79b97~mv2.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Floating iFood Button - Bottom Centered (Mobile) / Bottom Right (Desktop) */}
      {!selectedProduct && !showHoursModal && (
         <button 
            onClick={handleIfoodClick}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-50 bg-[#EA1D2C] text-white px-6 py-3.5 rounded-full shadow-xl shadow-red-900/30 hover:scale-105 transition-all flex items-center gap-2 font-bold animate-pulse text-sm border border-white/10 w-[90%] md:w-auto justify-center backdrop-blur-sm"
         >
            <span className="font-extrabold tracking-wide uppercase">Pedir no iFood</span>
            <ExternalLink size={16} />
        </button>
      )}

      {/* Hero Banner / Header */}
      <div className="relative z-10 pb-0 rounded-b-[2rem] overflow-hidden bg-jungle-950/50 backdrop-blur-md border-b border-white/5 shadow-2xl">
          
          {/* Hero Image - Facade */}
          <div className="h-[200px] md:h-[320px] w-full bg-cover bg-[center_top] relative group" style={{ backgroundImage: 'url("https://static.wixstatic.com/media/1f17f3_25277367fb2d4ee8a9d91ab6b2532581~mv2.webp")' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-jungle-1000 via-jungle-1000/30 to-transparent"></div>
          </div>
          
          {/* Header Content Container - Overlapping Image */}
          <div className="max-w-6xl mx-auto px-5 md:px-8 relative -mt-20 md:-mt-28 z-20">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                   
                   {/* Logo - Profile Picture Style */}
                   <div className="w-28 h-28 md:w-48 md:h-48 bg-jungle-1000 rounded-full flex items-center justify-center shrink-0 border-[4px] border-jungle-950 shadow-2xl overflow-hidden relative z-20">
                        <img src="https://static.wixstatic.com/media/1f17f3_3930e4dea898411e95810ab096731d82~mv2.png" className="w-full h-full object-contain p-2" alt="Selva Logo" />
                   </div>

                   {/* Title and Info */}
                   <div className="flex-1 pb-4 md:pb-6 pt-2 md:pt-0 flex flex-col items-center md:items-start">
                         <h1 className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4 mb-4 leading-none">
                            <span className="font-display font-black text-5xl md:text-7xl text-stone-100 tracking-tighter uppercase drop-shadow-lg">
                                SELVA
                            </span>
                            <span className="font-display font-bold text-jungle-400 text-2xl md:text-5xl tracking-tight uppercase drop-shadow-md">
                                Pizza e Cozinha
                            </span>
                         </h1>
                         
                         {/* Info Row: Rating, Hours, Socials */}
                         <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs md:text-sm font-medium text-stone-400">
                             {/* Rating */}
                             <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                                <span className="text-gold-400 flex items-center gap-1 font-bold">
                                    <Star size={12} fill="currentColor" /> 4.8
                                </span>
                                <span className="w-px h-3 bg-white/10 mx-1"></span>
                                <span className="text-stone-300 uppercase text-[10px] font-bold tracking-widest">PREMIUM</span>
                             </div>
                             
                             {/* Hours Button */}
                             <button 
                                onClick={() => setShowHoursModal(true)}
                                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all cursor-pointer border border-white/10 active:scale-95 group text-stone-300 hover:text-stone-100 backdrop-blur-sm"
                             >
                                <Clock size={13} className="text-jungle-400 group-hover:text-jungle-300 transition-colors"/> 
                                <span>Ver Horários</span>
                             </button>

                             {/* Divider */}
                             <span className="hidden md:block w-1 h-1 bg-stone-700 rounded-full mx-1"></span>

                             {/* Socials - Now Inline & Unified Style */}
                             <div className="flex items-center gap-2">
                                <a href="https://www.instagram.com/selvapizzaria/" target="_blank" className="bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all border border-white/10 text-stone-300 hover:text-white group flex items-center justify-center w-8 h-8" aria-label="Instagram">
                                    <Instagram size={16} />
                                </a>
                                <a href="https://wa.me/5527988286687" target="_blank" className="bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all border border-white/10 text-stone-300 hover:text-white group flex items-center justify-center w-8 h-8" aria-label="WhatsApp">
                                    <WhatsAppIcon size={16} />
                                </a>
                             </div>
                         </div>
                    </div>
              </div>
          </div>
          
          {/* Menu Type Selector */}
          <div className="mt-2 md:mt-4 px-5 md:px-8 pb-3">
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-3 overflow-x-auto no-scrollbar items-center">
                    {/* Active Status Indicator */}
                    <div className={`flex items-center gap-2 text-[10px] md:text-xs font-bold px-4 py-2 rounded-full border border-opacity-30 backdrop-blur-md transition-all ${
                        isOpen 
                        ? 'text-jungle-300 bg-jungle-900/40 border-jungle-500' 
                        : 'text-red-300 bg-red-900/40 border-red-500'
                    }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-jungle-400 shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse' : 'bg-red-500'}`}></div>
                        {isOpen ? 'Aberto agora' : 'Fechado agora'}
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* Search & Categories (Sticky) */}
      <div className="sticky top-0 bg-jungle-1000/80 backdrop-blur-xl z-30 shadow-lg border-b border-white/5 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-3 px-4 md:px-8 py-3">
            {/* Search */}
            <div className="relative group w-full md:w-72 shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-jungle-400 transition-colors" size={16} />
                <input 
                    type="text" 
                    placeholder="O que você quer comer?" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-jungle-950/60 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-jungle-400/30 focus:bg-jungle-950/80 transition-all placeholder:text-stone-500 text-stone-200 border border-white/5 font-light"
                />
            </div>
            
            {/* Categories Scroller */}
            <div className="flex-1 w-full overflow-x-auto no-scrollbar flex items-center gap-2 pb-1 md:pb-0 mask-gradient-right">
                {visibleCategories.map(cat => (
                    <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`whitespace-nowrap text-xs md:text-sm font-medium px-4 py-2 rounded-xl transition-all active:scale-95 border flex items-center gap-2 shadow-sm
                        ${selectedCategory === cat.id 
                        ? 'bg-jungle-500 text-white border-jungle-400 shadow-lg shadow-jungle-900/30' 
                        : 'bg-jungle-950/40 border-white/5 text-stone-400 hover:border-white/10 hover:bg-jungle-950/60 hover:text-stone-200'}`}
                    >
                    <span className={`text-sm filter drop-shadow-md ${selectedCategory === cat.id ? 'text-white' : 'text-jungle-400'}`}>{getCategoryIcon(cat.id)}</span> {cat.name}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Main Content List */}
      <div className="p-4 md:p-8 space-y-12 max-w-6xl mx-auto flex-1 w-full relative z-10 pb-32">
        {categorizedProducts.length > 0 ? (
            categorizedProducts.map(group => (
                <div key={group.id} id={`category-${group.id}`} className="scroll-mt-48 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-2">
                        <span className="text-jungle-500 filter drop-shadow-lg">{getCategoryIcon(group.id, 28)}</span>
                        <h2 className="font-display font-bold text-xl md:text-3xl text-stone-200 tracking-tight drop-shadow-md uppercase">
                            {group.name}
                        </h2>
                    </div>
                    
                    {/* Grid Layout - Mobile Optimized */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                        {group.products.map(product => (
                            <div 
                                key={product.id} 
                                onClick={() => setSelectedProduct(product)}
                                className="glass-card rounded-2xl overflow-hidden cursor-pointer group hover:bg-white/5 transition-all duration-300 flex flex-row md:flex-col h-full relative border border-white/5 hover:border-jungle-400/30"
                            >
                                {/* Image Section */}
                                <div className="w-28 sm:w-36 md:w-full h-28 sm:h-36 md:h-56 bg-jungle-950 relative overflow-hidden shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-jungle-1000/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name} 
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" 
                                    />
                                    {product.isPopular && (
                                        <div className="absolute top-0 left-0 bg-jungle-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-br-lg shadow-lg uppercase tracking-wider flex items-center gap-1 z-20 backdrop-blur-sm border-r border-b border-white/10">
                                            <Leaf size={10} fill="currentColor" /> Top
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-3 md:p-5 flex flex-col justify-between flex-1 relative">
                                    <div>
                                        <h3 className="font-bold text-stone-200 text-sm md:text-lg leading-tight mb-1.5 line-clamp-2 group-hover:text-jungle-400 transition-colors font-sans tracking-wide">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-stone-500 leading-relaxed font-light line-clamp-2 md:line-clamp-3 mb-3">
                                            {product.description}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            {(product.originalPrice || product.categoryId === 'promo') && (
                                                <span className="text-[10px] text-stone-600 line-through font-medium">De R$ {(product.originalPrice || product.price * 1.2).toFixed(2).replace('.', ',')}</span>
                                            )}
                                            <span className="text-base md:text-xl font-bold text-stone-100 tracking-tight flex items-baseline gap-0.5">
                                                <span className="text-[10px] font-normal text-stone-500">R$</span> {product.price.toFixed(2).replace('.', ',')}
                                            </span>
                                        </div>
                                        
                                        {/* Desktop Arrow */}
                                        <span className="hidden md:flex w-8 h-8 rounded-full bg-white/5 group-hover:bg-jungle-500 text-stone-500 group-hover:text-white items-center justify-center transition-all duration-300 transform group-hover:rotate-0 border border-white/5">
                                            <ChevronRight size={16} />
                                        </span>

                                        {/* Mobile Add Visual */}
                                        <div className="md:hidden bg-white/5 p-1.5 rounded-full text-stone-400 border border-white/5">
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-32 text-stone-600">
                <Leaf className="mx-auto mb-4 text-jungle-700" size={64} />
                <h3 className="text-xl font-bold text-stone-500 mb-2 font-display">A selva está calma...</h3>
                <p className="text-base text-stone-600">Nenhum produto encontrado neste cardápio no momento.</p>
            </div>
        )}
      </div>

      {/* Elegant Compact Footer */}
      <footer className="mt-auto bg-jungle-950 border-t border-white/5 pt-6 pb-24 md:pb-6 relative overflow-hidden">
          {/* Lion Background in Footer */}
          <div 
             className="absolute bottom-0 right-0 w-48 h-56 pointer-events-none opacity-5 mix-blend-luminosity z-0"
             style={{
                 backgroundImage: 'url("https://static.wixstatic.com/media/1f17f3_3bcce8178a614f678a1741ecd4da9fd9~mv2.webp")',
                 backgroundSize: 'contain',
                 backgroundPosition: 'bottom right',
                 backgroundRepeat: 'no-repeat',
                 maskImage: 'linear-gradient(to top, black, transparent)',
                 WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
             }}
          ></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
              <div className="mb-3 flex justify-center">
                  <div className="w-12 h-12 bg-jungle-1000 rounded-full flex items-center justify-center border border-white/5 shadow-xl">
                    <img src="https://static.wixstatic.com/media/1f17f3_3930e4dea898411e95810ab096731d82~mv2.png" className="w-8 h-8 object-contain opacity-60" alt="Selva Logo" />
                  </div>
              </div>

              <h3 className="font-display font-bold text-lg text-stone-300 mb-4 uppercase tracking-widest">Selva Pizza e Cozinha</h3>

              <div className="space-y-3 text-stone-500 font-light text-xs mb-4 leading-relaxed">
                  <a href="https://share.google/NNAeLqxPLEOOOZKj6" target="_blank" className="flex flex-col items-center gap-1 hover:text-stone-300 transition-colors cursor-pointer group">
                      <MapPin size={14} className="text-jungle-500 mb-1 group-hover:scale-110 transition-transform" />
                      <p>R. Quinze de Novembro, 600<br/>Centro de Vila Velha, Vila Velha - ES, 29101-045</p>
                  </a>
                  
                  <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="flex items-center gap-3">
                          <a href="https://www.instagram.com/selvapizzaria/" className="hover:text-stone-300 transition-colors"><Instagram size={18} /></a>
                          <a href="https://wa.me/5527988286687" className="hover:text-stone-300 transition-colors"><WhatsAppIcon size={18} /></a>
                      </div>
                  </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-stone-600 uppercase tracking-wider flex flex-col md:flex-row items-center justify-between gap-4">
                  <p>&copy; {new Date().getFullYear()} Selva Pizza e Cozinha.</p>
                  
                  <a href="https://www.upandco.com.br" target="_blank" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                      <span>Desenvolvido por UP! Company</span>
                      <img src="https://static.wixstatic.com/media/1f17f3_1e2b54d2fd894dd997c6cbc18e940576~mv2.png" alt="UP! Company" className="h-5 w-auto" />
                  </a>
              </div>
          </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Hours Modal */}
      {showHoursModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setShowHoursModal(false)} />
            <div className="bg-jungle-950 w-full max-w-md rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] border border-white/10">
                <div className="bg-jungle-1000/50 p-6 text-stone-100 flex justify-between items-center shrink-0 border-b border-white/5">
                    <h3 className="font-bold text-xl flex items-center gap-2 font-display uppercase tracking-wide">
                        <Clock size={24} className="text-gold-400" /> Horários
                    </h3>
                    <button onClick={() => setShowHoursModal(false)} className="hover:bg-white/5 p-2 rounded-full transition-colors text-stone-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 bg-jungle-950 overflow-y-auto">
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-3 border-b border-white/5">
                            <span className="font-bold text-stone-300">Segunda a Quarta</span>
                            <span className="text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-stone-400 font-bold">17:30 - 22:45</span>
                        </li>
                        <li className="flex justify-between items-center pb-3 border-b border-white/5">
                            <span className="font-bold text-stone-300">Quinta-feira</span>
                            <span className="text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-stone-400 font-bold">17:15 - 22:45</span>
                        </li>
                        <li className="flex flex-col gap-2 pb-3 border-b border-white/5">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-stone-300 flex items-center gap-2"><Utensils size={14} className="text-orange-500"/> Sexta</span>
                            </div>
                            <div className="flex justify-end gap-2 text-sm font-medium">
                                <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded-md">11:00 - 15:00</span>
                                <span className="bg-jungle-500/10 text-jungle-400 border border-jungle-500/20 px-2 py-1 rounded-md">17:30 - 22:45</span>
                            </div>
                        </li>
                        <li className="flex flex-col gap-2 pb-3 border-b border-white/5">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-stone-300 flex items-center gap-2"><Utensils size={14} className="text-orange-500"/> Sábado</span>
                            </div>
                            <div className="flex justify-end gap-2 text-sm font-medium">
                                <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded-md">11:00 - 14:45</span>
                                <span className="bg-jungle-500/10 text-jungle-400 border border-jungle-500/20 px-2 py-1 rounded-md">17:30 - 22:45</span>
                            </div>
                        </li>
                        <li className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-stone-300 flex items-center gap-2"><Utensils size={14} className="text-orange-500"/> Domingo</span>
                            </div>
                            <div className="flex justify-end gap-2 text-sm font-medium">
                                <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded-md">11:00 - 14:45</span>
                                <span className="bg-jungle-500/10 text-jungle-400 border border-jungle-500/20 px-2 py-1 rounded-md">17:30 - 22:45</span>
                            </div>
                        </li>
                    </ul>
                    <div className="mt-8">
                        <button 
                            onClick={handleIfoodClick}
                            className="w-full bg-[#EA1D2C] hover:bg-red-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-red-900/30 transition-all active:scale-98 flex items-center justify-center gap-2"
                        >
                            <Bike size={20} /> Fazer pedido agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};