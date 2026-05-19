import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/8f2cc82e-6b1d-4f5c-abed-ba35fa154fcc.jpg"
                alt="Вкус жизни"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="font-montserrat font-black text-xl">Вкус жизни</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Свежие продукты с доставкой на дом. Качество, которому доверяют тысячи семей.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-montserrat font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Покупателям</h4>
            <ul className="space-y-2">
              {[['Каталог', '/catalog'], ['Доставка и оплата', '/#delivery'], ['Личный кабинет', '/account'], ['Мои заказы', '/account']].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-gray-400 text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-montserrat font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Компания</h4>
            <ul className="space-y-2">
              {[['О нас', '/#about'], ['Контакты', '/#contacts'], ['Блог', '/']].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-gray-400 text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-montserrat font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="text-brand-red mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">г. Москва, ул. Примерная, д. 1</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-brand-red shrink-0" />
                <a href="tel:+74951234567" className="text-gray-400 text-sm hover:text-white transition-colors">+7 (495) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-brand-red shrink-0" />
                <a href="tel:+74957654321" className="text-gray-400 text-sm hover:text-white transition-colors">+7 (495) 765-43-21</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-brand-red shrink-0" />
                <a href="mailto:info@vkuszhizni.ru" className="text-gray-400 text-sm hover:text-white transition-colors">info@vkuszhizni.ru</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© 2024 Вкус жизни. Все права защищены.</p>
          <p className="text-gray-600 text-xs">Пн–Пт 9:00–21:00 · Сб–Вс 10:00–20:00</p>
        </div>
      </div>
    </footer>
  );
}