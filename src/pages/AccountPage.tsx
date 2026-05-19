import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

type Tab = 'orders' | 'profile';

const MOCK_ORDERS = [
  { id: 'VZH-123456', date: '15.05.2024', status: 'delivered', total: 1450, items: 5 },
  { id: 'VZH-123421', date: '02.05.2024', status: 'processing', total: 890, items: 3 },
  { id: 'VZH-123390', date: '25.04.2024', status: 'delivered', total: 2100, items: 8 },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  delivered: { label: 'Доставлен', color: 'text-green-700', bg: 'bg-green-50' },
  processing: { label: 'В обработке', color: 'text-orange-700', bg: 'bg-orange-50' },
  cancelled: { label: 'Отменён', color: 'text-red-700', bg: 'bg-red-50' },
};

export default function AccountPage() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('orders');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', error: '' });
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(loginForm.email, loginForm.password);
    if (ok) {
      const isAdmin = loginForm.email === 'admin@vkuszhizni.ru';
      navigate(isAdmin ? '/admin' : '/account');
    } else {
      setLoginForm(f => ({ ...f, error: 'Неверный email или пароль' }));
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={28} className="text-brand-red" />
            </div>
            <h1 className="font-montserrat font-black text-2xl text-gray-900">{isRegister ? 'Регистрация' : 'Вход в аккаунт'}</h1>
            <p className="text-gray-400 text-sm mt-1">{isRegister ? 'Создайте аккаунт для удобных покупок' : 'Войдите, чтобы управлять заказами'}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Имя</label>
                <input type="text" required placeholder="Иван Иванов" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red" />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={e => setLoginForm(f => ({ ...f, email: e.target.value, error: '' }))}
                placeholder="ivan@mail.ru"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Пароль</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value, error: '' }))}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
              />
            </div>

            {loginForm.error && (
              <div className="text-sm text-brand-red bg-red-50 rounded-xl px-4 py-3 flex items-center gap-2">
                <Icon name="AlertCircle" size={16} />
                {loginForm.error}
              </div>
            )}

            <button type="submit" className="w-full py-3.5 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all shadow-lg shadow-red-200">
              {isRegister ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-gray-400 hover:text-brand-red transition-colors"
            >
              {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
            </button>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-start gap-8">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{user.name[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-gray-400 text-sm">{user.email}</div>
                </div>
              </div>
              {[
                { id: 'orders', label: 'Мои заказы', icon: 'Package' },
                { id: 'profile', label: 'Профиль', icon: 'User' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id as Tab)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                    tab === item.id ? 'bg-brand-red/10 text-brand-red' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={item.icon as any} size={16} />
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-brand-red hover:bg-red-50 transition-all mt-4"
              >
                <Icon name="LogOut" size={16} />
                Выйти
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {tab === 'orders' && (
              <div>
                <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-6">Мои заказы</h1>
                <div className="space-y-3">
                  {MOCK_ORDERS.map(order => {
                    const s = STATUS_MAP[order.status];
                    return (
                      <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-gray-900">#{order.id}</span>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
                          </div>
                          <div className="text-sm text-gray-400">{order.date} · {order.items} товаров</div>
                        </div>
                        <div className="text-right">
                          <div className="font-montserrat font-bold text-lg text-gray-900">{order.total} ₽</div>
                          <button className="text-xs text-brand-red hover:underline mt-1">Подробнее</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === 'profile' && (
              <div>
                <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-6">Мой профиль</h1>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[['Имя', user.name], ['Email', user.email], ['Телефон', user.phone]].map(([label, value]) => (
                      <div key={label}>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">{label}</label>
                        <div className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red-dark transition-all">
                    Сохранить изменения
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}