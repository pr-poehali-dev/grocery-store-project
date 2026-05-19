import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-brand-red transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-700 font-medium">Корзина</span>
        </div>

        <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-8">Корзина</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="font-montserrat font-bold text-2xl text-gray-900 mb-2">Корзина пуста</h3>
            <p className="text-gray-400 mb-8">Добавьте товары из каталога</p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all"
            >
              <Icon name="ShoppingBag" size={18} />
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 animate-fade-in">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.product.name}</h3>
                    <p className="text-gray-400 text-xs">{item.product.unit}</p>
                    <p className="font-bold text-brand-red mt-1">{item.product.price} ₽</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-gray-900 w-16 text-right">{item.product.price * item.quantity} ₽</span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-brand-red transition-colors text-gray-400"
                    >
                      <Icon name="Trash2" size={15} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-brand-red transition-colors flex items-center gap-1.5 mt-2"
              >
                <Icon name="Trash2" size={14} />
                Очистить корзину
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-20">
                <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-5">Итого</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Товары ({items.reduce((s, i) => s + i.quantity, 0)} шт.)</span>
                    <span className="font-semibold">{total} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Доставка</span>
                    <span className="font-semibold text-green-600">от 299 ₽</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 mb-5">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Итого</span>
                    <span className="font-montserrat font-black text-2xl text-brand-red">{total} ₽</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full py-4 bg-brand-red text-white font-semibold rounded-xl text-center hover:bg-brand-red-dark transition-all shadow-lg shadow-red-200"
                >
                  Оформить заказ
                </Link>
                <Link
                  to="/catalog"
                  className="block w-full py-3 text-center text-sm text-gray-500 hover:text-brand-red transition-colors mt-3"
                >
                  Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
