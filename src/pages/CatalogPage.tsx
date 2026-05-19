import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/icon';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, priceRange, sortBy, search]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <a href="/" className="hover:text-brand-red transition-colors">Главная</a>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-700 font-medium">Каталог</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
              <h3 className="font-montserrat font-bold text-base text-gray-900 mb-4">Фильтры</h3>

              {/* Categories */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Категории</p>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all ${
                        activeCategory === cat.id
                          ? 'bg-brand-red/10 text-brand-red font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      {cat.name}
                      <span className="ml-auto text-xs text-gray-400">
                        {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Цена, ₽</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    value={priceRange[0]}
                    onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    min={0}
                    max={5000}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <button
                onClick={() => { setActiveCategory('all'); setPriceRange([0, 1000]); setSearch(''); setSortBy('default'); }}
                className="w-full py-2 text-sm text-gray-400 hover:text-brand-red transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск товаров..."
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red bg-white"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="name">По названию</option>
              </select>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">Найдено: <span className="font-semibold text-gray-900">{filtered.length}</span> товаров</p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-2">Ничего не найдено</h3>
                <p className="text-gray-500">Попробуйте изменить фильтры</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product, i) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
