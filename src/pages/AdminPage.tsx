import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';

type AdminTab = 'orders' | 'products' | 'clients' | 'settings';

const MOCK_ORDERS = [
  { id: 'VZH-123456', client: 'Иван Петров', phone: '+7 900 123-45-67', date: '15.05.2024', status: 'new', total: 1450, delivery: 'Доставка', payment: 'card', items: ['Coca-Cola × 2', 'Молоко × 1'] },
  { id: 'VZH-123421', client: 'Мария Сидорова', phone: '+7 901 234-56-78', date: '14.05.2024', status: 'processing', total: 890, delivery: 'Самовывоз', payment: 'invoice', items: ['Творог × 3'] },
  { id: 'VZH-123390', client: 'ООО Ромашка', phone: '+7 495 000-11-22', date: '13.05.2024', status: 'delivered', total: 5200, delivery: 'Доставка', payment: 'sbp', items: ['Куриная грудка × 5', 'Бананы × 10'] },
];

const MOCK_CLIENTS = [
  { id: '1', name: 'Иван Петров', email: 'ivan@example.com', phone: '+7 900 123-45-67', company: '', inn: '', address: 'Москва, ул. Пушкина, 1', orders: 5 },
  { id: '2', name: 'ООО Ромашка', email: 'romashka@corp.ru', phone: '+7 495 000-11-22', company: 'ООО Ромашка', inn: '7700000000', address: 'Москва, пр. Ленина, 10', orders: 12 },
];

const STATUS_COLORS: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Новый', color: 'text-blue-700', bg: 'bg-blue-50' },
  processing: { label: 'В обработке', color: 'text-orange-700', bg: 'bg-orange-50' },
  delivered: { label: 'Доставлен', color: 'text-green-700', bg: 'bg-green-50' },
  cancelled: { label: 'Отменён', color: 'text-red-700', bg: 'bg-red-50' },
};

export default function AdminPage() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<AdminTab>('orders');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editClient, setEditClient] = useState<typeof MOCK_CLIENTS[0] | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'drinks', price: '', unit: 'шт', description: '' });
  const [settings, setSettings] = useState({
    company: 'ООО «Вкус жизни»',
    inn: '7700000001',
    bik: '044525225',
    bank: 'ПАО Сбербанк',
    account: '40702810938000012345',
    email: 'info@vkuszhizni.ru',
    phone: '+7 (495) 123-45-67',
    address: 'г. Москва, ул. Примерная, д. 1',
    footerText: 'Работаем для вас с 2015 года. Качество, которому доверяют.',
  });

  if (!user || !isAdmin) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Icon name="Lock" size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="font-montserrat font-black text-2xl text-gray-900 mb-2">Доступ запрещён</h2>
        <p className="text-gray-400 mb-6">Войдите как администратор</p>
        <Link to="/account" className="px-6 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all">
          Войти
        </Link>
      </div>
    </div>
  );

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const p: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: +newProduct.price,
      unit: newProduct.unit,
      description: newProduct.description,
      image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
      inStock: true,
    };
    setProducts(prev => [p, ...prev]);
    setNewProduct({ name: '', category: 'drinks', price: '', unit: 'шт', description: '' });
    setShowAddProduct(false);
  };

  const TABS = [
    { id: 'orders', label: 'Заказы', icon: 'Package', count: MOCK_ORDERS.filter(o => o.status === 'new').length },
    { id: 'products', label: 'Товары', icon: 'ShoppingBag', count: products.length },
    { id: 'clients', label: 'Клиенты', icon: 'Users', count: clients.length },
    { id: 'settings', label: 'Настройки', icon: 'Settings', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col shrink-0 hidden md:flex">
        <div className="p-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
              <span className="text-white font-montserrat font-black text-sm">ВЖ</span>
            </div>
            <div>
              <div className="font-montserrat font-black text-sm text-gray-900">Вкус жизни</div>
              <div className="text-xs text-gray-400">Администратор</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as AdminTab)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                tab === t.id ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon name={t.icon as any} size={16} />
              <span className="flex-1 text-left">{t.label}</span>
              {t.count > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === t.id ? 'bg-white/20 text-white' : 'bg-brand-red/10 text-brand-red'}`}>{t.count}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-brand-red rounded-xl hover:bg-gray-50 transition-all">
            <Icon name="ExternalLink" size={14} />
            Открыть сайт
          </Link>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-brand-red rounded-xl hover:bg-red-50 transition-all"
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-6">Заказы</h1>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Всего', value: MOCK_ORDERS.length, icon: 'Package', color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Новых', value: MOCK_ORDERS.filter(o => o.status === 'new').length, icon: 'Bell', color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'Доставлено', value: MOCK_ORDERS.filter(o => o.status === 'delivered').length, icon: 'CheckCircle', color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Сумма', value: MOCK_ORDERS.reduce((s, o) => s + o.total, 0) + ' ₽', icon: 'TrendingUp', color: 'text-brand-red', bg: 'bg-red-50' },
                ].map(({ label, value, icon, color, bg }) => (
                  <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon name={icon as any} size={18} className={color} />
                    </div>
                    <div>
                      <div className="font-montserrat font-bold text-xl text-gray-900">{value}</div>
                      <div className="text-xs text-gray-400">{label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {MOCK_ORDERS.map(order => {
                  const s = STATUS_COLORS[order.status];
                  return (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-gray-900">#{order.id}</span>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
                          </div>
                          <div className="text-sm text-gray-500">{order.client} · {order.phone}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-montserrat font-bold text-lg text-gray-900">{order.total} ₽</div>
                          <div className="text-xs text-gray-400">{order.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-50 pt-3">
                        <span className="flex items-center gap-1"><Icon name="Truck" size={13} />{order.delivery}</span>
                        <span className="flex items-center gap-1"><Icon name="CreditCard" size={13} />{order.payment === 'card' ? 'Карта' : order.payment === 'sbp' ? 'СБП' : order.payment === 'invoice' ? 'Счёт' : 'Наличные'}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">{order.items.join(', ')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-montserrat font-black text-2xl text-gray-900">Товары</h1>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red-dark transition-all"
                >
                  <Icon name="Plus" size={16} />
                  Добавить товар
                </button>
              </div>

              {showAddProduct && (
                <div className="bg-white rounded-2xl border border-brand-red/20 p-6 mb-5 animate-fade-in">
                  <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-4">Новый товар</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Название</label>
                      <input value={newProduct.name} onChange={e => setNewProduct(f => ({ ...f, name: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red" placeholder="Название товара" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Цена, ₽</label>
                      <input type="number" value={newProduct.price} onChange={e => setNewProduct(f => ({ ...f, price: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red" placeholder="99" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Категория</label>
                      <select value={newProduct.category} onChange={e => setNewProduct(f => ({ ...f, category: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red bg-white">
                        {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Единица</label>
                      <input value={newProduct.unit} onChange={e => setNewProduct(f => ({ ...f, unit: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red" placeholder="1 кг / 0.5 л / шт" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Описание</label>
                      <textarea value={newProduct.description} onChange={e => setNewProduct(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red resize-none" placeholder="Краткое описание товара" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={addProduct} className="px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red-dark transition-all">Добавить</button>
                    <button onClick={() => setShowAddProduct(false)} className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:border-gray-300 transition-all">Отмена</button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Товар</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Категория</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Цена</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ед.</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                            <span className="font-medium text-gray-900">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-500">{CATEGORIES.find(c => c.id === p.category)?.name}</td>
                        <td className="px-5 py-3 font-semibold text-gray-900">{p.price} ₽</td>
                        <td className="px-5 py-3 text-gray-400">{p.unit}</td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => setProducts(prev => prev.filter(pp => pp.id !== p.id))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-brand-red text-gray-400 transition-all"
                          >
                            <Icon name="Trash2" size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CLIENTS */}
          {tab === 'clients' && (
            <div>
              <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-6">База клиентов</h1>

              {editClient && (
                <div className="bg-white rounded-2xl border border-brand-red/20 p-6 mb-5 animate-fade-in">
                  <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-4">Редактировать клиента</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {[
                      ['name', 'Имя / Название'], ['email', 'Email'], ['phone', 'Телефон'],
                      ['company', 'Компания'], ['inn', 'ИНН'], ['address', 'Адрес'],
                    ].map(([key, label]) => (
                      <div key={key}>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">{label}</label>
                        <input
                          value={editClient[key as keyof typeof editClient] as string}
                          onChange={e => setEditClient({ ...editClient, [key]: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setClients(prev => prev.map(c => c.id === editClient.id ? editClient : c)); setEditClient(null); }}
                      className="px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red-dark transition-all"
                    >Сохранить</button>
                    <button onClick={() => setEditClient(null)} className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl">Отмена</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {clients.map(client => (
                  <div key={client.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{client.name}</div>
                      <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1"><Icon name="Mail" size={12} />{client.email}</span>
                        <span className="flex items-center gap-1"><Icon name="Phone" size={12} />{client.phone}</span>
                        {client.company && <span className="flex items-center gap-1"><Icon name="Building" size={12} />{client.company}</span>}
                        {client.inn && <span className="flex items-center gap-1"><Icon name="Hash" size={12} />ИНН: {client.inn}</span>}
                        <span className="flex items-center gap-1"><Icon name="MapPin" size={12} />{client.address}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Заказов: {client.orders}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => setEditClient(client)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand-red transition-all">
                        <Icon name="Pencil" size={14} />
                      </button>
                      <button onClick={() => setClients(prev => prev.filter(c => c.id !== client.id))} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-brand-red transition-all">
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {tab === 'settings' && (
            <div>
              <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-6">Настройки магазина</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-montserrat font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="Building" size={16} className="text-brand-red" />
                    Реквизиты для счёта
                  </h3>
                  <div className="space-y-3">
                    {[
                      ['company', 'Название компании'], ['inn', 'ИНН'], ['bik', 'БИК'],
                      ['bank', 'Банк'], ['account', 'Расчётный счёт'],
                    ].map(([key, label]) => (
                      <div key={key}>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
                        <input
                          value={settings[key as keyof typeof settings]}
                          onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-montserrat font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="Globe" size={16} className="text-brand-red" />
                    Контакты и футер
                  </h3>
                  <div className="space-y-3">
                    {[
                      ['email', 'Email'], ['phone', 'Телефон'], ['address', 'Адрес'],
                    ].map(([key, label]) => (
                      <div key={key}>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
                        <input
                          value={settings[key as keyof typeof settings]}
                          onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Текст в футере</label>
                      <textarea
                        value={settings.footerText}
                        onChange={e => setSettings(s => ({ ...s, footerText: e.target.value }))}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-red resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:col-span-2">
                  <h3 className="font-montserrat font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="QrCode" size={16} className="text-brand-red" />
                    QR-код для оплаты (СБП)
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-1">📱</div>
                        <div className="text-xs text-gray-400">QR-код</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">QR-код генерируется автоматически на основе введённых реквизитов.</p>
                      <p className="text-xs text-gray-400">При заказе с оплатой «По счёту» клиент увидит QR для оплаты через СБП.</p>
                      <button className="mt-3 px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red-dark transition-all flex items-center gap-2">
                        <Icon name="QrCode" size={14} />
                        Сохранить и обновить QR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
