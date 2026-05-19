import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find(i => i.product.id === product.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover-lift group">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
            product.badge === 'Скидка' ? 'bg-brand-red text-white' :
            product.badge === 'Хит' ? 'bg-orange-500 text-white' :
            'bg-green-500 text-white'
          }`}>
            {product.badge}
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 hover:text-brand-red transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs mb-3">{product.unit}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-montserrat font-bold text-lg text-gray-900">{product.price} ₽</span>
            {product.oldPrice && (
              <span className="text-gray-400 text-sm line-through ml-1">{product.oldPrice} ₽</span>
            )}
          </div>

          {cartItem ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Icon name="Minus" size={14} />
              </button>
              <span className="w-6 text-center text-sm font-bold">{cartItem.quantity}</span>
              <button
                onClick={() => addToCart(product)}
                className="w-7 h-7 rounded-lg bg-brand-red hover:bg-brand-red-dark text-white flex items-center justify-center transition-colors"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="w-9 h-9 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
            >
              <Icon name="Plus" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
