
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  imageUrl?: string;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string; // Optional, UI handles mapping now
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  points: number;
  totalSpent: number;
  lastOrderDate: number;
}

export interface LoyaltyConfig {
  enabled: boolean;
  pointsPerCurrency: number; 
  redemptionRate: number; 
  minPointsToRedeem: number;
  welcomeMessage: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  discount: number; 
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: number;
  paymentMethod: 'credit' | 'debit' | 'cash' | 'pix';
  orderType: 'table' | 'pickup' | 'delivery';
  tableNumber?: string;
  pointsEarned: number;
  pointsRedeemed: number;
}

export type ViewState = 'customer_menu' | 'customer_cart' | 'customer_checkout' | 'admin_dashboard' | 'admin_menu' | 'admin_orders' | 'admin_loyalty';

// --- SHARED DATA (Drinks, Kids, some Starters) ---
const SHARED_DRINKS: Product[] = [
  { id: 'beb1', name: 'Coca-Cola Original 1,5L', description: 'Garrafa 1,5L', price: 14.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_a1cf91de8c2a42888854f8a9dd1f0539~mv2.avif' },
  { id: 'beb2', name: 'Coca-Cola Sem Açúcar 1,5L', description: 'Garrafa 1,5L', price: 14.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_96178084ec1c4266bbe340d10b05c112~mv2.avif' },
  { id: 'beb3', name: 'Fanta Laranja 1,5L', description: 'Garrafa 1,5L', price: 14.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_7fd30548916743eaa34c9acc093097bf~mv2.avif' },
  { id: 'beb4', name: 'Schweppes Citrus 1,5L', description: 'Embalagem 1un', price: 14.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_dcb8d8dcffa1426b826fe64a107b09fa~mv2.avif' },
  { id: 'beb5', name: 'Suco Del Valle Uva (Lata)', description: 'Lata 290ml', price: 12.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_cd24346f19034ce8a242212c949baa2e~mv2.avif' },
  { id: 'beb6', name: 'Suco Del Valle Pêssego (Lata)', description: 'Lata 290ml', price: 12.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_cd00855bf81c4bc385e9fb18d4e21abf~mv2.avif' },
  { id: 'beb7', name: 'Limonada Mágica Morango com Mirtilo', description: 'Refrescante e cheia de sabor.', price: 16.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_024de054295d4cc4875a1c8b6b05bcdf~mv2.jpg' },
  { id: 'beb8', name: 'Coca-Cola Zero (Lata)', description: 'Lata 350ml', price: 10.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_71d1f1bf01bd45a190e0d9f52d4c4039~mv2.avif' },
  { id: 'beb9', name: 'Guaraná Antarctica (Lata)', description: 'Lata 350ml', price: 10.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_dcd278ae771a4004ab39753898481d9b~mv2.avif' },
  { id: 'beb10', name: 'Guaraná Antarctica Zero (Lata)', description: 'Lata 350ml', price: 10.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_8802cae9c28142d78e354228f5ff1020~mv2.avif' },
  { id: 'beb11', name: 'Guaraná Antarctica 1,5L', description: 'Garrafa 1,5L', price: 14.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_8ff007ee05344170b3cddc615d98522f~mv2.avif' },
  { id: 'beb12', name: 'Guaraná Antarctica Zero 1,5L', description: 'Garrafa 1,5L', price: 14.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_9834066f25f142dc9d6924ec28e93f03~mv2.avif' },
  { id: 'beb13', name: 'Limonada Mágica Kiwi com Maçã Verde', description: 'Refrescante e natural.', price: 16.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_21059eed7f6b45e58d390abcccefb702~mv2.jpg' },
  { id: 'beb14', name: 'Limonada Mágica Pêssego com Tangerina', description: 'Refrescante e cítrica.', price: 16.90, categoryId: 'bebidas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_81f45e8fbfd6443389194df2c7744ad7~mv2.jpg' },
];

const SHARED_KIDS: Product[] = [
  { id: 'kid1', name: 'Muu Aventureiro', description: 'Arrozinho, feijão, carninha em cubos, ovo e batata frita!', price: 39.90, categoryId: 'kids', imageUrl: 'https://static.wixstatic.com/media/1f17f3_dba05d4563e148ad948fa4bfcc13861e~mv2.avif' },
  { id: 'kid2', name: 'Cocó Aventureiro', description: 'Arrozinho, feijão, franguinho empanado, ovo e batata frita!', price: 35.90, categoryId: 'kids', imageUrl: 'https://static.wixstatic.com/media/1f17f3_ef6066db9b854397ad90d19b37ff1d4f~mv2.avif' },
  { id: 'kid3', name: 'Combo Animal Kids', description: 'Hamburger com carne suculenta, queijo derretido e fritas.', price: 49.90, categoryId: 'kids', imageUrl: 'https://static.wixstatic.com/media/1f17f3_ad4a023dfccf4906a4033ca6f90be443~mv2.jpg' },
];

const SHARED_ENTRADAS: Product[] = [
  { id: 'ent1', name: 'Mini Pastéis (Duelo Selvagem)', description: '10 mini pastéis: 5 de carne, 5 de queijo.', price: 49.90, categoryId: 'entradas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_54517cceab8547bfb31d323ebb62788b~mv2.avif' },
  { id: 'ent2', name: 'Galinha Loka', description: 'Franguinhos crocantes (350g) com polenta e quiabo.', price: 57.90, categoryId: 'entradas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_3391aab698784eaa8d85500cf06d9c9d~mv2.avif' },
  { id: 'ent3', name: 'Batata Frita (Aventura Crocante)', description: 'Batatas douradas (300g) com tempero secreto.', price: 31.90, categoryId: 'entradas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_38ab52958e3443eda6ebe65b5d2fc8ca~mv2.avif' },
  { id: 'ent4', name: 'Picolé de Queijo', description: 'Crocante por fora, derretido por dentro.', price: 34.90, categoryId: 'entradas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_7dbc5cf8dff542d5bf01296054e61c82~mv2.avif' },
];

const SHARED_SALADS: Product[] = [
    { id: 'sal1', name: 'Paraíso Tropical', description: 'Mix de folhas, tartar de manga, sementes e grana padano.', price: 54.90, categoryId: 'saladas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_6116ae3155a44d149b2e863078090836~mv2.avif' },
    { id: 'sal2', name: 'Selvapicão', description: 'Mix de folhas, salpicão de frango e azeite de frutas.', price: 54.90, categoryId: 'saladas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_8bf7e51c371849a9933e50d1f82cfa15~mv2.avif' },
    { id: 'sal3', name: 'Selva Mar Aberto', description: 'Salada refrescante com frutos do mar.', price: 69.90, categoryId: 'saladas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_3ab112db8c8c4e1c85c952b91fe0adbb~mv2.jpg' },
];

// --- LUNCH SPECIFIC DATA ---

export const LUNCH_CATEGORIES: Category[] = [
  { id: 'banquete', name: 'Banquete Na Selva' },
  { id: 'almoco', name: 'Almoço na Selva' },
  { id: 'entradas', name: 'Entradas' },
  { id: 'saladas', name: 'Saladas' },
  { id: 'kids', name: 'Kids' },
  { id: 'bebidas', name: 'Bebidas' },
];

export const LUNCH_PRODUCTS: Product[] = [
  ...SHARED_ENTRADAS,
  ...SHARED_SALADS,
  ...SHARED_KIDS,
  ...SHARED_DRINKS,
  // Banquete
  { id: 'banq1', name: 'Camarão Capixaba', description: 'Arroz cremoso de camarão (300g), gratinado e banana frita.', price: 159.90, categoryId: 'banquete', isPopular: true, imageUrl: 'https://static.wixstatic.com/media/1f17f3_d9da3613355e4842b6fab6638580bac1~mv2.avif' },
  { id: 'banq2', name: 'Camarão Abravurado', description: 'Camarões grelhados na manteiga com ervas e alho, arroz de coco.', price: 169.90, categoryId: 'banquete', imageUrl: 'https://static.wixstatic.com/media/1f17f3_69e5d6c838be4fd48906583c30d5f208~mv2.avif' },
  { id: 'banq3', name: 'Lembrança De Vó', description: 'Carne de panela (450g), linguiça, bacon, arroz e feijão.', price: 139.90, categoryId: 'banquete', imageUrl: 'https://static.wixstatic.com/media/1f17f3_9ffce862ef41401f87a348d402ae88a9~mv2.avif' },
  { id: 'banq4', name: 'Parmegiana Animal', description: 'Parmegiana lendária de 500g! Filé suculento coberto.', price: 179.90, categoryId: 'banquete', isPopular: true, imageUrl: 'https://static.wixstatic.com/media/1f17f3_2752642ffafc44e8987e4a796f81bc94~mv2.avif' },
  { id: 'banq5', name: 'Bobó De Camarão', description: 'Creme de aipim com leite de coco e camarões salteados.', price: 139.00, categoryId: 'banquete', imageUrl: 'https://static.wixstatic.com/media/1f17f3_8b80f29831524082b1332ef25c0ec4f9~mv2.jpg' },
  // Almoço Executivo
  { id: 'alm1', name: 'Ancho da floresta', description: 'Bife ancho grelhado, risoni com cogumelos e crispy de alho-poró.', price: 89.90, categoryId: 'almoco', imageUrl: 'https://static.wixstatic.com/media/1f17f3_c7cd983b2fb849f69fff8aefb8bae36b~mv2.avif' }, // Using Brasa do Sertão image as proxy if needed, or keeping original if user didn't specify
  { id: 'alm2', name: 'Virado da Selva', description: 'Bistequinha suína, linguiça, farofa de milho, ovo e couve.', price: 59.90, categoryId: 'almoco', imageUrl: 'https://images.unsplash.com/photo-1604908177525-4524f28522e8?q=80&w=800&auto=format&fit=crop' },
  { id: 'alm3', name: 'Carne de Panela Da Selva', description: 'Carne de panela, arroz soltinho, feijão com bacon e farofa.', price: 59.90, categoryId: 'almoco', imageUrl: 'https://static.wixstatic.com/media/1f17f3_9ffce862ef41401f87a348d402ae88a9~mv2.avif' },
  { id: 'alm4', name: 'Picadinho Selva', description: 'Filé mignon em cubos ao molho roti, arroz branco e farofa.', price: 79.90, categoryId: 'almoco', imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop' },
  { id: 'alm5', name: 'Estrogonofe Selvagem', description: 'Filé mignon no creme de leite com toque de aipim. Acompanha arroz.', price: 79.90, categoryId: 'almoco', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop' },
];

// --- DINNER SPECIFIC DATA (PIZZAS) ---

export const DINNER_CATEGORIES: Category[] = [
    { id: 'destaques', name: 'Destaques' },
    { id: 'top1', name: 'Top 1 Sabor' },
    { id: 'amadas', name: 'Mais Amadas' },
    { id: 'entradas', name: 'Entradas' },
    { id: 'saladas', name: 'Saladas' },
    { id: 'kids', name: 'Kids' },
    { id: 'bebidas', name: 'Bebidas' },
];

export const DINNER_PRODUCTS: Product[] = [
    ...SHARED_ENTRADAS,
    ...SHARED_SALADS,
    ...SHARED_KIDS,
    ...SHARED_DRINKS,
    
    // Destaques - Updated based on user request
    { 
        id: 'dest1', 
        name: 'Pizza 1/2 Portuguesa e 1/2 Frango Catupiry + Coca-Cola 1,5L', 
        description: 'Metade Portuguesa, metade Frango com Catupiry. Acompanha Coca-Cola 1,5L gelada.', 
        price: 84.90, 
        originalPrice: 99.90,
        categoryId: 'destaques', 
        isPopular: true, 
        imageUrl: 'https://static.wixstatic.com/media/1f17f3_079f2b7b9b6e4c68be0f4c0206c3d99a~mv2.jpeg' 
    },
    { 
        id: 'dest2', 
        name: 'Pizza 1/2 Cupim Bravo e 1/2 Calabresa + Coca-Cola 1,5L', 
        description: 'Metade Cupim Bravo desfiado, metade Calabresa. Acompanha Coca-Cola 1,5L gelada.', 
        price: 84.90, 
        originalPrice: 99.90,
        categoryId: 'destaques', 
        imageUrl: 'https://static.wixstatic.com/media/1f17f3_6486b23cf2694a05ba9e9ee070d836cc~mv2.jpg' 
    },
    { 
        id: 'dest3', 
        name: 'Pizza 1/2 Catupiry e 1/2 Calabresa + Coca-Cola 1,5L', 
        description: 'Metade Frango com Catupiry, metade Calabresa. Acompanha Coca-Cola 1,5L gelada.', 
        price: 84.90, 
        originalPrice: 99.90,
        categoryId: 'destaques', 
        imageUrl: 'https://static.wixstatic.com/media/1f17f3_e3ad4b4669fa4875b4d334ee15247c09~mv2.jpg' 
    },
    
    // Top Mais Amadas Meio a Meio
    { id: 'ama1', name: '1/2 Catupiry e 1/2 Calabresa', description: 'Molho artesanal, muçarela, frango desfiado e requeijão / Calabresa.', price: 84.90, categoryId: 'amadas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_a4701b439e1947898105b865994b6188~mv2.jpg' },
    { id: 'ama2', name: '1/2 Cupim Bravo e 1/2 Calabresa', description: 'Molho artesanal, cupim desfiado, requeijão / Calabresa.', price: 84.90, categoryId: 'amadas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_d8fbdc53f78240f38523fe71dbe0b4d5~mv2.jpg' },
    { id: 'ama3', name: '1/2 Portuguesa e 1/2 Frango Catupiry', description: 'Clássica portuguesa / Frango com requeijão cremoso.', price: 84.90, categoryId: 'amadas', imageUrl: 'https://static.wixstatic.com/media/1f17f3_c88ecd163cd3465a86ef092a1a733463~mv2.avif' },

    // Top 1 Sabor
    { id: 'top1', name: 'Pizza Cupim Bravo G - 8 Fatias', description: 'Direto das fogueiras! Cupim desfiado, requeijão cremoso e cebola.', price: 94.90, categoryId: 'top1', imageUrl: 'https://static.wixstatic.com/media/1f17f3_9bf140e9380140b4a81c81666568a494~mv2.avif' },
    { id: 'top2', name: 'Pizza Explosão na Mata G - 8 Fatias', description: 'Fonduta de Grana Padano, bacon crocante, goiabada.', price: 74.90, categoryId: 'top1', imageUrl: 'https://static.wixstatic.com/media/1f17f3_68940af215a54c42981276f3ce4b06d7~mv2.avif' },
    { id: 'top3', name: 'Pizza Portuguesa G - 8 Fatias', description: 'Presunto, calabresa, ovos, cebola marinada.', price: 84.90, categoryId: 'top1', imageUrl: 'https://static.wixstatic.com/media/1f17f3_48e38c046a754a3eb65443d8ece30afe~mv2.avif' },
    { id: 'top4', name: 'Pizza Presunto de Parma G - 8 Fatias', description: 'Muçarela de búfala e presunto de Parma.', price: 94.90, categoryId: 'top1', isPopular: true, imageUrl: 'https://static.wixstatic.com/media/1f17f3_7bfec300297e459cadac0a247d9136f4~mv2.avif' },
    { id: 'top5', name: 'Pizza Frango com Catupiry G', description: 'Frango desfiado temperado com o verdadeiro catupiry.', price: 84.90, categoryId: 'top1', imageUrl: 'https://static.wixstatic.com/media/1f17f3_0c827b87bcbf490faf45e82be73c8c29~mv2.avif' },
    { id: 'top6', name: 'Pizza Calabresa G', description: 'Calabresa fatiada, cebola e azeitonas.', price: 79.90, categoryId: 'top1', imageUrl: 'https://static.wixstatic.com/media/1f17f3_20b632f81c1d41869ec2e685bd47b862~mv2.jpg' },
    { id: 'top7', name: 'Pizza Brasa do Sertão G', description: 'Carne seca, banana da terra e queijo coalho.', price: 94.90, categoryId: 'top1', imageUrl: 'https://static.wixstatic.com/media/1f17f3_c7cd983b2fb849f69fff8aefb8bae36b~mv2.avif' },
];

export const INITIAL_LOYALTY_CONFIG: LoyaltyConfig = {
  enabled: true,
  pointsPerCurrency: 1, 
  redemptionRate: 0.05, 
  minPointsToRedeem: 50,
  welcomeMessage: "Bem-vindo à Selva! Junte pontos e troque por descontos."
};
