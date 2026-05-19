import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/8f2cc82e-6b1d-4f5c-abed-ba35fa154fcc.jpg"
              alt="Вкус жизни"
              className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <span className="font-montserrat font-black text-xl text-brand-red tracking-tight">Вкус</span>
              <span className="font-montserrat font-black text-xl text-gray-800 tracking-tight"> жизни</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors">Каталог</Link>
            <Link to="/#delivery" className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors">Доставка</Link>
            <Link to="/#about" className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors">О нас</Link>
            <Link to="/#contacts" className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors">Контакты</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
              <Icon name="ShoppingCart" size={20} className="text-gray-700" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {count}
                </span>
              )}
            </Link>

            {/* Account */}
            {user ? (
              <div className="flex items-center gap-1">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/account'}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-brand-red rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name[0]}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  title="Выйти"
                >
                  <Icon name="LogOut" size={16} className="text-gray-400" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/account')}
                className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
              >
                <Icon name="User" size={16} />
                <span className="hidden sm:block">Войти</span>
              </button>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100 animate-fade-in">
            {[['Каталог', '/catalog'], ['Доставка', '/#delivery'], ['О нас', '/#about'], ['Контакты', '/#contacts']].map(([label, href]) => (
              <Link
                key={href}
                to={href}
                className="block py-2.5 px-2 text-sm font-medium text-gray-700 hover:text-brand-red transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}