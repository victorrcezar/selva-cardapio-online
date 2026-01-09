import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Product, Category, Order, LoyaltyConfig, Customer } from '../types';
import { generateDishDescription, generateDishImage, suggestPrice } from '../services/geminiService';
import { Trash2, Edit2, Plus, Wand2, ImageIcon, Gift, Users, Save, GripVertical, Clock, CheckCircle, Truck, AlertCircle, TrendingUp, DollarSign, ChefHat } from './Icons';

// --- Dashboard ---
interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  customers: Customer[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, products, customers }) => {
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const totalPoints = customers.reduce((acc, c) => acc + c.points, 0);
  const avgTicket = orders.length > 0 ? totalSales / orders.length : 0;
  
  // Prepare data for charts
  const salesByPayment = orders.reduce((acc, order) => {
     acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
     return acc;
  }, {} as Record<string, number>);

  const paymentData = Object.keys(salesByPayment).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: salesByPayment[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Mock Trend Data (Since we don't have historical DB in this demo, simulating "today's" hourly trend based on active orders or static)
  const trendData = [
      { time: '18:00', sales: 120 },
      { time: '19:00', sales: 450 },
      { time: '20:00', sales: 980 },
      { time: '21:00', sales: 650 },
      { time: '22:00', sales: 300 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">Visão Geral</h2>
            <p className="text-gray-500">Acompanhe o desempenho da sua loja em tempo real.</p>
        </div>
        <div className="text-right">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Faturamento Total</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSales)}
                </h3>
             </div>
             <div className="bg-green-50 p-2 rounded-lg text-green-600">
                <DollarSign size={24} />
             </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
             <TrendingUp size={16} className="mr-1" /> +12% vs ontem
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pedidos Realizados</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{orders.length}</h3>
             </div>
             <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <Truck size={24} />
             </div>
          </div>
           <div className="mt-4 text-sm text-gray-500">
             {orders.filter(o => o.status === 'pending').length} pendentes agora
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Ticket Médio</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgTicket)}
                </h3>
             </div>
             <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                <TrendingUp size={24} />
             </div>
          </div>
        </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Clientes / Pontos</p>
                <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-3xl font-extrabold text-gray-900">{customers.length}</h3>
                    <span className="text-sm text-gray-400">ativos</span>
                </div>
             </div>
             <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                <Users size={24} />
             </div>
          </div>
          <div className="mt-4 text-sm text-orange-600 font-medium flex items-center gap-1">
             <Gift size={14} /> {totalPoints} pts em circulação
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Tendência de Vendas (Hoje)</h3>
            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={trendData}>
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="sales" stroke="#e11d48" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
             <h3 className="text-lg font-bold text-gray-800 mb-6">Métodos de Pagamento</h3>
             <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
             </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

// --- Product Manager (Unchanged logic, just keeping structure) ---
interface AdminProductManagerProps {
  products: Product[];
  categories: Category[];
  onAdd: (p: Product) => void;
  onUpdate: (p: Product) => void;
  onDelete: (id: string) => void;
}

export const AdminProductManager: React.FC<AdminProductManagerProps> = ({ 
  products, categories, onAdd, onUpdate, onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  
  const [form, setForm] = useState<Partial<Product>>({
    name: '', description: '', price: 0, categoryId: categories[0]?.id || ''
  });

  const handleMagicFill = async () => {
    if (!form.name) return;
    setLoadingAi(true);
    try {
      const [desc, price] = await Promise.all([
          generateDishDescription(form.name, "standard ingredients"),
          suggestPrice(form.name)
      ]);
      setForm(prev => ({ ...prev, description: desc, price: price }));
    } catch (e) {
      alert('AI Error.');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleMagicImage = async () => {
      if (!form.name) return;
      setLoadingImg(true);
      try {
          const img = await generateDishImage(form.name + (form.description ? `, ${form.description}` : ''));
          if (img) setForm(prev => ({ ...prev, imageUrl: img }));
      } catch (e) {
          alert('Image generation failed.');
      } finally {
          setLoadingImg(false);
      }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) return;
    if (form.id) {
      onUpdate(form as Product);
    } else {
      onAdd({ ...form, id: crypto.randomUUID(), imageUrl: form.imageUrl || `https://picsum.photos/400/400?random=${Date.now()}` } as Product);
    }
    setForm({ name: '', description: '', price: 0, categoryId: categories[0]?.id || '' });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        <button 
          onClick={() => { setIsEditing(true); setForm({ name: '', description: '', price: 0, categoryId: categories[0]?.id || '' }); }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition"
        >
          <Plus size={20} /> New Item
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{form.id ? 'Edit Product' : 'Create Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="flex gap-2">
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="flex-1 border border-gray-300 rounded-lg p-2" placeholder="Item name" />
                  <button type="button" onClick={handleMagicFill} disabled={loadingAi || !form.name} className="bg-purple-100 text-purple-700 px-3 rounded-lg hover:bg-purple-200">
                    {loadingAi ? '...' : <Wand2 size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (R$)</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value)})} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <div className="flex gap-2">
                    <input type="text" value={form.imageUrl || ''} onChange={e => setForm({...form, imageUrl: e.target.value})} className="flex-1 border border-gray-300 rounded-lg p-2 text-sm" />
                     <button type="button" onClick={handleMagicImage} disabled={loadingImg || !form.name} className="bg-blue-100 text-blue-700 px-3 rounded-lg hover:bg-blue-200">
                         {loadingImg ? '...' : <ImageIcon size={18} />}
                    </button>
                  </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
             <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="p-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.imageUrl} className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                  <div><p className="font-medium text-gray-900">{product.name}</p></div>
                </td>
                <td className="p-4 text-sm text-gray-600">{categories.find(c => c.id === product.categoryId)?.name}</td>
                <td className="p-4 text-sm font-medium text-gray-900">R$ {product.price.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setForm(product); setIsEditing(true); }} className="p-1.5 text-blue-600"><Edit2 size={16} /></button>
                    <button onClick={() => onDelete(product.id)} className="p-1.5 text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Orders (Kanban Board) ---
export const AdminOrders: React.FC<{ orders: Order[], onStatusUpdate: (id: string, s: Order['status']) => void }> = ({ orders, onStatusUpdate }) => {
    
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('orderId', id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrop = (e: React.DragEvent, status: Order['status']) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('orderId');
        if (id) {
            onStatusUpdate(id, status);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const columns: { id: Order['status'], title: string, color: string, icon: any }[] = [
        { id: 'pending', title: 'Pendente', color: 'bg-orange-50 border-orange-200 text-orange-700', icon: AlertCircle },
        { id: 'preparing', title: 'Preparando', color: 'bg-blue-50 border-blue-200 text-blue-700', icon: ChefHat },
        { id: 'ready', title: 'Pronto', color: 'bg-green-50 border-green-200 text-green-700', icon: CheckCircle },
        { id: 'delivered', title: 'Entregue', color: 'bg-gray-100 border-gray-200 text-gray-700', icon: Truck },
    ];

    const formatTimeElapsed = (timestamp: number) => {
        const minutes = Math.floor((Date.now() - timestamp) / 60000);
        if (minutes < 60) return `${minutes} min`;
        return `${Math.floor(minutes/60)}h ${minutes%60}min`;
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Cozinha & Pedidos</h2>
                <span className="text-sm text-gray-500">Arraste os cartões para atualizar o status</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4 h-full">
                {columns.map(col => (
                    <div 
                        key={col.id} 
                        className={`rounded-2xl border-2 border-dashed ${col.color.replace('bg-', 'border-').replace('text-', 'border-opacity-30 ')} bg-opacity-30 flex flex-col h-full min-w-[280px]`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, col.id)}
                    >
                        {/* Column Header */}
                        <div className={`p-4 rounded-t-xl font-bold flex items-center justify-between ${col.color} bg-opacity-20 border-b border-white/50 backdrop-blur-sm`}>
                            <div className="flex items-center gap-2">
                                <col.icon size={18} />
                                <span>{col.title}</span>
                            </div>
                            <span className="bg-white bg-opacity-60 px-2 py-0.5 rounded-full text-xs">
                                {orders.filter(o => o.status === col.id).length}
                            </span>
                        </div>

                        {/* Drop Zone / List */}
                        <div className="p-3 space-y-3 overflow-y-auto flex-1 bg-gray-50/50 rounded-b-xl custom-scrollbar">
                            {orders
                                .filter(o => o.status === col.id)
                                .sort((a, b) => b.createdAt - a.createdAt) // Newest first
                                .map(order => (
                                <div 
                                    key={order.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, order.id)}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all hover:-translate-y-1 relative group"
                                >
                                    <div className="absolute top-3 right-3 text-gray-300 group-hover:text-gray-400">
                                        <GripVertical size={16} />
                                    </div>

                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-gray-900 text-lg">#{order.id.slice(0,4)}</span>
                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded">
                                            <Clock size={10} /> {formatTimeElapsed(order.createdAt)}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <p className="font-semibold text-gray-800 text-sm">{order.customerName}</p>
                                        <div className="flex gap-2 mt-1">
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold border ${
                                                order.orderType === 'delivery' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                                order.orderType === 'table' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                            }`}>
                                                {order.orderType === 'table' ? `Mesa ${order.tableNumber}` : order.orderType}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 my-3 border-t border-b border-dashed border-gray-100 py-2">
                                        {order.items.map(item => (
                                            <div key={item.cartId} className="flex justify-between text-sm">
                                                <span className="text-gray-600"><span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}</span>
                                            </div>
                                        ))}
                                        {order.items.some(i => i.notes) && (
                                            <div className="text-xs text-red-500 italic mt-1 bg-red-50 p-1 rounded">
                                                ⚠️ Obs: {order.items.find(i => i.notes)?.notes}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-bold text-gray-900">R$ {order.total.toFixed(2)}</span>
                                        <span className="text-xs text-gray-400 uppercase">{order.paymentMethod}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- Loyalty Config ---
export const AdminLoyalty: React.FC<{ config: LoyaltyConfig, onSave: (c: LoyaltyConfig) => void }> = ({ config, onSave }) => {
  const [localConfig, setLocalConfig] = useState(config);

  const handleChange = (field: keyof LoyaltyConfig, value: any) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Gift className="text-primary-600" /> Loyalty Program
      </h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
           <label className="font-semibold text-gray-700">Enable Loyalty Program</label>
           <input 
              type="checkbox" 
              checked={localConfig.enabled} 
              onChange={e => handleChange('enabled', e.target.checked)}
              className="w-6 h-6 text-primary-600 rounded focus:ring-primary-500"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Points per R$ 1.00</label>
                <input 
                  type="number" 
                  value={localConfig.pointsPerCurrency}
                  onChange={e => handleChange('pointsPerCurrency', parseFloat(e.target.value))}
                  className="w-full border p-2 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Order of R$ 50.00 earns {50 * localConfig.pointsPerCurrency} points.</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redemption Value (R$ per Point)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={localConfig.redemptionRate}
                  onChange={e => handleChange('redemptionRate', parseFloat(e.target.value))}
                  className="w-full border p-2 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">100 points = Discount of R$ {(100 * localConfig.redemptionRate).toFixed(2)}</p>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Points to Redeem</label>
            <input 
              type="number" 
              value={localConfig.minPointsToRedeem}
              onChange={e => handleChange('minPointsToRedeem', parseInt(e.target.value))}
              className="w-full border p-2 rounded-lg"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
            <input 
              type="text" 
              value={localConfig.welcomeMessage}
              onChange={e => handleChange('welcomeMessage', e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            onClick={() => onSave(localConfig)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-700"
          >
            <Save size={18} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};