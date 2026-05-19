import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductsContext';

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addToCart, items, updateQuantity } = useCart();

  if (!product) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-4">Товар не найден</h1>
        <Link to="/catalog" className="text-brand-red font-semibold hover:underline">← Вернуться в каталог</Link>
      </div>
      <Footer />
    </div>
  );

  const cartItem = items.find(i => i.product.id === product.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-brand-red transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/catalog" className="hover:text-brand-red transition-colors">Каталог</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-3xl overflow-hidden bg-gray-50 aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            {product.badge && (
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                product.badge === 'Скидка' ? 'bg-brand-red text-white' :
                product.badge === 'Хит' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
              }`}>{product.badge}</span>
            )}
            <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-4">{product.unit}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-montserrat font-black text-4xl text-gray-900">{product.price} ₽</span>
              {product.oldPrice && (
                <span className="text-gray-400 text-xl line-through">{product.oldPrice} ₽</span>
              )}
            </div>

            {cartItem ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{cartItem.quantity}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 rounded-lg bg-brand-red text-white shadow-sm flex items-center justify-center hover:bg-brand-red-dark transition-colors"
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
                <Link
                  to="/cart"
                  className="flex-1 py-3.5 bg-gray-900 text-white font-semibold rounded-xl text-center hover:bg-gray-800 transition-colors"
                >
                  Перейти в корзину
                </Link>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="w-full py-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
              >
                <Icon name="ShoppingCart" size={20} />
                Добавить в корзину
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}