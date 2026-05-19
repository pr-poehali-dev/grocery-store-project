import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/icon';
import { PRODUCTS, CATEGORIES } from '@/data/products';

const HERO_IMG = 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/e6cafe4d-9d6b-4417-b625-4a084741d98b.jpg';

export default function Index() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', sent: false });

  const filtered = activeCategory === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.category === activeCategory).slice(0, 8);

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackForm(f => ({ ...f, sent: true }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
                Доставка за 2 часа
              </div>
              <div className="mb-3">
                <span className="font-black text-brand-red tracking-tight" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'Arial Black, Arial, sans-serif' }}>Вкус жизни</span>
              </div>
              <h1 className="font-black text-2xl lg:text-3xl text-gray-700 leading-tight mb-6" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                Свежие продукты —<br />
                <span className="text-gray-900">с доставкой на дом</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Большой выбор качественных продуктов с доставкой по городу. Работаем с лучшими поставщиками.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all shadow-lg shadow-red-200 hover:shadow-red-300"
                >
                  <Icon name="ShoppingBag" size={18} />
                  В каталог
                </Link>
                <a
                  href="#contacts"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-brand-red hover:text-brand-red transition-all"
                >
                  <Icon name="Phone" size={18} />
                  Позвонить
                </a>
              </div>

              <div className="flex items-center gap-6 mt-10">
                {[['5 000+', 'Довольных клиентов'], ['2 ч', 'Время доставки'], ['1 200+', 'Товаров в каталоге']].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-montserrat font-black text-2xl text-gray-900">{num}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-100">
                <img src={HERO_IMG} alt="Свежие продукты" className="w-full object-cover aspect-square" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    textShadow: '0 2px 20px rgba(0,0,0,1)',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    letterSpacing: '1px',
                  }}>
                    Вкус жизни
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <div style={{ height: 2, width: 40, background: '#E31E24', borderRadius: 2 }} />
                    <span style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.25em',
                      fontFamily: 'Georgia, serif',
                      textTransform: 'uppercase',
                    }}>
                      Свежие продукты
                    </span>
                    <div style={{ height: 2, width: 40, background: '#E31E24', borderRadius: 2 }} />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-scale-in" style={{ animationDelay: '0.5s' }}>
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="Truck" size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">Быстрая доставка</div>
                  <div className="text-xs text-gray-400">от 299 ₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-brand-red py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'Truck', label: 'Доставка за 2 часа', sub: 'по всему городу' },
              { icon: 'ShieldCheck', label: 'Гарантия качества', sub: 'или вернём деньги' },
              { icon: 'CreditCard', label: 'Удобная оплата', sub: 'карта, СБП, счёт' },
              { icon: 'Headphones', label: 'Поддержка 24/7', sub: 'всегда на связи' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name={icon as any} size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{label}</div>
                  <div className="text-red-200 text-xs">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-montserrat font-black text-3xl text-gray-900">Популярные товары</h2>
              <p className="text-gray-400 mt-1">Самое любимое нашими покупателями</p>
            </div>
            <Link to="/catalog" className="hidden sm:flex items-center gap-1.5 text-brand-red font-semibold text-sm hover:gap-2.5 transition-all">
              Весь каталог <Icon name="ArrowRight" size={16} />
            </Link>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white shadow-md shadow-red-200'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-red text-brand-red font-semibold rounded-xl hover:bg-brand-red hover:text-white transition-all"
            >
              Смотреть все товары
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-black text-3xl text-gray-900 mb-3">Доставка и самовывоз</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Выберите удобный способ получения заказа</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: 'Truck', title: 'Доставка курьером', desc: 'Привезём ваш заказ в удобное время. Доставка по всему городу.', price: 'от 299 ₽', color: 'text-brand-red', bg: 'bg-red-50' },
              { icon: 'Store', title: 'Самовывоз', desc: 'Заберите заказ из нашего магазина по адресу ул. Примерная, д. 1.', price: 'Бесплатно', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: 'Package', title: 'Экспресс-доставка', desc: 'Срочная доставка за 1 час в пределах МКАД.', price: 'от 499 ₽', color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map(({ icon, title, desc, price, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover-lift">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={icon as any} size={24} className={color} />
                </div>
                <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                <span className={`font-bold text-sm ${color}`}>{price}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="CreditCard" size={20} className="text-brand-red" />
              Способы оплаты
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: 'CreditCard', label: 'Банковская карта' },
                { icon: 'Smartphone', label: 'СБП (QR-код)' },
                { icon: 'FileText', label: 'По счёту' },
                { icon: 'Banknote', label: 'Наличными' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <Icon name={icon as any} size={16} className="text-brand-red shrink-0" />
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-red text-sm font-semibold mb-4">
                <div className="w-8 h-0.5 bg-brand-red"></div>
                О компании
              </div>
              <h2 className="font-montserrat font-black text-3xl lg:text-4xl text-gray-900 mb-6 leading-tight">
                Мы несём вкус<br />
                <span className="text-brand-red">в каждый дом</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                «Вкус жизни» — это больше, чем магазин. Мы создаём атмосферу вкусной жизни, доставляя свежайшие продукты от проверенных поставщиков.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Основанная в 2015 году, наша компания выросла из небольшого местного магазина в крупный онлайн-гипермаркет с тысячами довольных клиентов. Мы верим, что хорошая еда делает жизнь лучше.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[['2015', 'Год основания'], ['9 лет', 'На рынке'], ['5 000+', 'Клиентов']].map(([n, l]) => (
                  <div key={l} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="font-montserrat font-black text-2xl text-brand-red">{n}</div>
                    <div className="text-gray-500 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <img src={HERO_IMG} alt="О компании" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-red text-white rounded-2xl p-4 shadow-xl">
                <div className="font-montserrat font-black text-3xl">★ 4.9</div>
                <div className="text-red-200 text-xs">средняя оценка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-black text-3xl text-gray-900 mb-3">Свяжитесь с нами</h2>
            <p className="text-gray-500">Оставьте заявку и мы перезвоним в течение 15 минут</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-6">Обратный звонок</h3>
              {callbackForm.sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Заявка отправлена!</h4>
                  <p className="text-gray-500 text-sm">Мы перезвоним вам в течение 15 минут</p>
                </div>
              ) : (
                <form onSubmit={handleCallback} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={callbackForm.name}
                      onChange={e => setCallbackForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Иван Иванов"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={callbackForm.phone}
                      onChange={e => setCallbackForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+7 (900) 000-00-00"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red-dark transition-all shadow-lg shadow-red-200"
                  >
                    Перезвоните мне
                  </button>
                  <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>

            <div className="space-y-4">
              {[
                { icon: 'MapPin', label: 'Адрес', value: 'г. Москва, ул. Примерная, д. 1', sub: 'Пн–Пт 9:00–21:00 · Сб–Вс 10:00–20:00' },
                { icon: 'Phone', label: 'Телефон', value: '+7 (495) 123-45-67', sub: '+7 (495) 765-43-21' },
                { icon: 'Mail', label: 'Email', value: 'info@vkuszhizni.ru', sub: 'Ответим в течение часа' },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4 hover-lift">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={icon as any} size={22} className="text-brand-red" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                    <div className="font-semibold text-gray-900">{value}</div>
                    <div className="text-sm text-gray-400 mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}