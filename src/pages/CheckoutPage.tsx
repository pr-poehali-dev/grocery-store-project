import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

type PayMethod = 'card' | 'sbp' | 'invoice' | 'cash';
type DeliveryMethod = 'delivery' | 'pickup';

const SEND_ORDER_URL = 'https://functions.poehali.dev/3d489bcb-9117-4c24-9e28-153a87f3c580';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'invoice' | 'done'>('form');
  const [payMethod, setPayMethod] = useState<PayMethod>('card');
  const [delivery, setDelivery] = useState<DeliveryMethod>('delivery');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', comment: '' });
  const [orderId] = useState(() => 'VZH-' + Date.now().toString().slice(-6));
  const [loading, setLoading] = useState(false);

  const sendOrder = async () => {
    try {
      await fetch(SEND_ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: { id: orderId, ...form, delivery, payment: payMethod, total },
          items: items.map(i => ({ name: i.product.name, quantity: i.quantity, price: i.product.price })),
        }),
      });
    } catch (_) {
      // письма не критичны, продолжаем
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await sendOrder();
    setLoading(false);
    if (payMethod === 'invoice') {
      setStep('invoice');
    } else {
      setStep('done');
      clearCart();
    }
  };

  if (step === 'done') return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} className="text-green-600" />
        </div>
        <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-3">Заказ оформлен!</h1>
        <p className="text-gray-500 mb-2">Мы отправили подтверждение на вашу почту и скоро перезвоним.</p>
        <p className="text-gray-400 text-sm mb-8">Номер заказа: <strong>#VZH-{Date.now().toString().slice(-6)}</strong></p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all">
          На главную
        </Link>
      </div>
      <Footer />
    </div>
  );

  if (step === 'invoice') return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-6">Счёт на оплату</h1>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="font-montserrat font-black text-xl text-brand-red">Вкус жизни</div>
              <div className="text-gray-400 text-sm">ООО «Вкус жизни»</div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-sm">Счёт № VZH-{Date.now().toString().slice(-6)}</div>
              <div className="text-gray-400 text-xs">{new Date().toLocaleDateString('ru-RU')}</div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.product.name} × {item.quantity}</span>
                <span className="font-semibold">{item.product.price * item.quantity} ₽</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between">
              <span className="font-bold text-gray-900">Итого к оплате</span>
              <span className="font-montserrat font-black text-2xl text-brand-red">{total} ₽</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Оплата через СБП:</p>
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="text-center">
                <div className="text-3xl mb-1">📱</div>
                <div className="text-xs text-gray-400">QR появится после<br/>настройки реквизитов</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">Реквизиты для счёта настраиваются в админке</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setStep('done'); clearCart(); }}
            className="flex-1 py-3.5 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all"
          >
            Я оплатил
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-brand-red hover:text-brand-red transition-all flex items-center gap-2"
          >
            <Icon name="Printer" size={18} />
            Распечатать
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-brand-red transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/cart" className="hover:text-brand-red transition-colors">Корзина</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-700 font-medium">Оформление заказа</span>
        </div>

        <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-4">Контактные данные</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['name', 'Имя', 'Иван Иванов', 'text'], ['phone', 'Телефон', '+7 (900) 000-00-00', 'tel'], ['email', 'Email', 'ivan@mail.ru', 'email']].map(([key, label, placeholder, type]) => (
                    <div key={key} className={key === 'email' ? 'sm:col-span-2' : ''}>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-4">Способ получения</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { value: 'delivery', label: 'Доставка курьером', icon: 'Truck' },
                    { value: 'pickup', label: 'Самовывоз', icon: 'Store' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDelivery(opt.value as DeliveryMethod)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        delivery === opt.value
                          ? 'border-brand-red bg-brand-red/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon name={opt.icon} fallback="Circle" size={20} className={delivery === opt.value ? 'text-brand-red' : 'text-gray-400'} />
                      <span className={`text-sm font-medium ${delivery === opt.value ? 'text-brand-red' : 'text-gray-700'}`}>{opt.label}</span>
                    </button>
                  ))}
                </div>
                {delivery === 'delivery' && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Адрес доставки</label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      placeholder="ул. Пушкина, д. 1, кв. 1"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                    />
                  </div>
                )}
                {delivery === 'pickup' && (
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-brand-red" />
                    <span className="text-sm text-gray-700">г. Москва, ул. Примерная, д. 1</span>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-4">Способ оплаты</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'card', label: 'Банковская карта', icon: 'CreditCard' },
                    { value: 'sbp', label: 'СБП (QR)', icon: 'Smartphone' },
                    { value: 'invoice', label: 'Счёт с QR', icon: 'FileText' },
                    { value: 'cash', label: 'Наличными', icon: 'Banknote' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPayMethod(opt.value as PayMethod)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        payMethod === opt.value
                          ? 'border-brand-red bg-brand-red/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon name={opt.icon} fallback="Circle" size={18} className={payMethod === opt.value ? 'text-brand-red' : 'text-gray-400'} />
                      <span className={`text-sm font-medium ${payMethod === opt.value ? 'text-brand-red' : 'text-gray-700'}`}>{opt.label}</span>
                    </button>
                  ))}
                </div>
                {payMethod === 'invoice' && (
                  <div className="mt-3 bg-blue-50 rounded-xl p-3 text-sm text-blue-700 flex items-center gap-2">
                    <Icon name="Info" size={16} />
                    Будет сформирован счёт с QR-кодом для оплаты через СБП
                  </div>
                )}
              </div>

              {/* Comment */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-4">Примечание к заказу</h2>
                <textarea
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  placeholder="Время доставки, пожелания к заказу..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-20">
                <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-4">Ваш заказ</h2>
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{item.product.name}</div>
                        <div className="text-xs text-gray-400">{item.quantity} шт.</div>
                      </div>
                      <span className="text-sm font-semibold">{item.product.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 mb-5">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Итого</span>
                    <span className="font-montserrat font-black text-xl text-brand-red">{total} ₽</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                  {loading ? 'Отправляем...' : payMethod === 'invoice' ? 'Получить счёт' : 'Оформить заказ'}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с условиями оферты
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}