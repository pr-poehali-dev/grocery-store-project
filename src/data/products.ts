export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  unit: string;
  description: string;
  image: string;
  badge?: string;
  inStock: boolean;
}

export const CATEGORIES = [
  { id: 'all', name: 'Все товары', emoji: '🛒' },
  { id: 'drinks', name: 'Напитки', emoji: '🥤' },
  { id: 'dairy', name: 'Молочные', emoji: '🥛' },
  { id: 'bakery', name: 'Выпечка', emoji: '🍞' },
  { id: 'meat', name: 'Мясо и птица', emoji: '🥩' },
  { id: 'vegetables', name: 'Овощи и фрукты', emoji: '🥦' },
  { id: 'snacks', name: 'Снэки', emoji: '🍿' },
  { id: 'sweets', name: 'Сладости', emoji: '🍫' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Coca-Cola Classic',
    category: 'drinks',
    price: 89,
    unit: '0.5 л',
    description: 'Классическая Coca-Cola — освежающий вкус, знакомый всем с детства.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    badge: 'Хит',
    inStock: true,
  },
  {
    id: '2',
    name: 'Coca-Cola Zero',
    category: 'drinks',
    price: 89,
    unit: '0.5 л',
    description: 'Тот же вкус Coca-Cola, но без сахара и без калорий.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
  {
    id: '3',
    name: 'Sprite Лимон-Лайм',
    category: 'drinks',
    price: 79,
    unit: '0.5 л',
    description: 'Бодрящий лимонно-лаймовый вкус с пузырьками.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
  {
    id: '4',
    name: 'Молоко 3.2%',
    category: 'dairy',
    price: 95,
    oldPrice: 110,
    unit: '1 л',
    description: 'Пастеризованное цельное молоко от местных фермеров.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    badge: 'Скидка',
    inStock: true,
  },
  {
    id: '5',
    name: 'Творог 5%',
    category: 'dairy',
    price: 145,
    unit: '400 г',
    description: 'Нежный зернистый творог из натурального молока.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
  {
    id: '6',
    name: 'Хлеб Бородинский',
    category: 'bakery',
    price: 65,
    unit: '400 г',
    description: 'Ароматный бородинский хлеб на ржаной закваске.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
  {
    id: '7',
    name: 'Куриная грудка',
    category: 'meat',
    price: 320,
    unit: '1 кг',
    description: 'Охлаждённое куриное филе без кожи и костей.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    badge: 'Новинка',
    inStock: true,
  },
  {
    id: '8',
    name: 'Помидоры черри',
    category: 'vegetables',
    price: 180,
    unit: '500 г',
    description: 'Сочные томаты черри, богатые витаминами.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
  {
    id: '9',
    name: 'Чипсы Lays Краб',
    category: 'snacks',
    price: 115,
    unit: '140 г',
    description: 'Хрустящие чипсы с насыщенным вкусом краба.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
  {
    id: '10',
    name: 'Шоколад Milka',
    category: 'sweets',
    price: 135,
    oldPrice: 160,
    unit: '100 г',
    description: 'Нежный молочный шоколад с альпийским молоком.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    badge: 'Скидка',
    inStock: true,
  },
  {
    id: '11',
    name: 'Fanta Апельсин',
    category: 'drinks',
    price: 85,
    unit: '0.5 л',
    description: 'Яркая газировка с натуральным вкусом апельсина.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
  {
    id: '12',
    name: 'Банан',
    category: 'vegetables',
    price: 95,
    unit: '1 кг',
    description: 'Спелые бананы, богатые калием и энергией.',
    image: 'https://cdn.poehali.dev/projects/4823c780-127b-45da-8c8a-0a82a7bcb851/files/0b693aee-07b3-44b9-aea1-e25ffa5d4aea.jpg',
    inStock: true,
  },
];
