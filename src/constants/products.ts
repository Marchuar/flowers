export type CareIcon = 'water' | 'scissors' | 'sun' | 'leaf' | 'snowflake' | 'warning'

export interface CareInstruction {
  icon: CareIcon
  title: string
  body: string
}

export type ProductProperty = 'pet-safe' | 'long-lasting' | 'fragrant' | 'scent-free'
export type StemHeight = 'short' | 'medium' | 'tall'
export type StemFullness = 'lush' | 'minimal'

export interface Product {
  id: number
  slug: string
  name: string
  latinName: string
  price: string
  priceNote: string
  image: string
  images?: string[]
  tag?: string
  color: string
  description?: string
  careInstructions?: CareInstruction[]
  properties?: ProductProperty[]
  height?: StemHeight
  fullness?: StemFullness
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'roses',
    name: 'Roses',
    latinName: 'Rosa',
    price: 'from 3.50 zł',
    priceNote: 'per stem',
    image: '/images/products/roses.png',
    images: [
      '/images/products/roses.png',
      'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&h=800&q=85&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&q=85&fit=crop&crop=center',
    ],
    tag: 'Bestseller',
    color: '#E8A0A0',
    properties: ['long-lasting', 'fragrant'],
    height: 'medium',
    fullness: 'lush',
    description: 'A classic for a reason. Roses reward a little daily attention with days of quiet elegance.',
    careInstructions: [
      { icon: 'water', title: 'Fresh H2O', body: 'Change the water every 2 days to keep bacteria at bay and roses drinking happily.' },
      { icon: 'scissors', title: 'The 45° Snip', body: 'Trim 1 inch off the stems at an angle. It opens up their "thirsty straws".' },
      { icon: 'warning', title: 'Away from Fruit', body: 'Ethylene gas from ripening fruit shortens their life — keep them well separated.' },
    ],
  },
  {
    id: 2,
    slug: 'tulips',
    name: 'Tulips',
    latinName: 'Tulipa',
    price: 'from 2.90 zł',
    priceNote: 'per stem',
    image: '/images/products/tulips.png',
    images: [
      '/images/products/tulips.png',
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600&h=800&q=85&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&h=800&q=85&fit=crop&crop=center',
    ],
    tag: 'Seasonal',
    color: '#F5C5A0',
    properties: ['long-lasting', 'scent-free'],
    height: 'medium',
    fullness: 'minimal',
    description: 'Wonderfully independent flowers. Tulips actually continue growing after being cut — they have a mind of their own.',
    careInstructions: [
      { icon: 'water', title: 'Cool Water', body: 'Tulips prefer cool water. Change it every 2 days and keep the vase clean.' },
      { icon: 'scissors', title: 'Re-cut Stems', body: 'Trim a little off the bottom every few days to keep them drinking freely.' },
      { icon: 'snowflake', title: 'Stay Cool', body: 'Keep away from direct sun and radiators — they\'ll last much longer in a cool spot.' },
    ],
  },
  {
    id: 3,
    slug: 'peonies',
    name: 'Peonies',
    latinName: 'Paeonia',
    price: 'from 6.90 zł',
    priceNote: 'per stem',
    image: '/images/products/peonies.png',
    images: [
      '/images/products/peonies.png',
      'https://images.unsplash.com/photo-1559181567-c3190b1f11f8?w=600&h=800&q=85&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=800&q=85&fit=crop&crop=center',
    ],
    tag: 'Premium',
    color: '#EFBDBD',
    properties: ['fragrant'],
    height: 'short',
    fullness: 'lush',
    description: 'Worth every bit of fuss. With the right care, peonies open into breathtaking, pillowy blossoms.',
    careInstructions: [
      { icon: 'water', title: 'Warm Water to Open', body: 'If buds are tight, place in slightly warm water to encourage them to open up.' },
      { icon: 'scissors', title: 'The 45° Snip', body: 'Cut stems at an angle and remove any leaves that would sit below the waterline.' },
      { icon: 'leaf', title: 'Remove Guard Petals', body: 'Gently peel away the outermost petals — they\'re there to protect, not to display.' },
    ],
  },
  {
    id: 4,
    slug: 'wildflowers',
    name: 'Wildflowers',
    latinName: 'Mixed stems',
    price: 'from 2.20 zł',
    priceNote: 'per stem',
    image: '/images/products/wildflowers.png',
    images: [
      '/images/products/wildflowers.png',
      'https://images.unsplash.com/photo-1455103683-2561c5b33a17?w=600&h=800&q=85&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1490750967868-88df5691cc52?w=600&h=800&q=85&fit=crop&crop=center',
    ],
    color: '#B5CEAA',
    properties: ['pet-safe', 'scent-free'],
    height: 'short',
    fullness: 'minimal',
    description: 'A joyful seasonal mix, unique in every bunch. Just as wildflowers should be — never the same twice.',
    careInstructions: [
      { icon: 'water', title: 'Daily Water Change', body: 'Wildflower mixes drink more — changing the water daily keeps the whole bunch thriving.' },
      { icon: 'leaf', title: 'Clear the Waterline', body: 'Remove any leaves below the waterline to prevent bacterial build-up.' },
      { icon: 'sun', title: 'Bright but Indirect', body: 'A bright spot without direct afternoon sun is where wildflowers feel most at home.' },
    ],
  },
  {
    id: 5,
    slug: 'eustoma',
    name: 'Eustoma',
    latinName: 'Lisianthus',
    price: 'from 4.50 zł',
    priceNote: 'per stem',
    image: '/images/products/eustoma.png',
    images: [
      '/images/products/eustoma.png',
      'https://images.unsplash.com/photo-1505188799714-5e0b2e67ef4d?w=600&h=800&q=85&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1548973600-7a0d02f7c879?w=600&h=800&q=85&fit=crop&crop=center',
    ],
    color: '#C5B8E8',
    properties: ['pet-safe', 'long-lasting'],
    height: 'tall',
    fullness: 'lush',
    description: 'Elegant and exceptionally long-lasting. Eustoma offers outstanding value — up to two weeks of quiet beauty.',
    careInstructions: [
      { icon: 'water', title: 'Fresh Water', body: 'Change the water every 2 days. Eustoma is sensitive to bacteria in stale water.' },
      { icon: 'scissors', title: 'Trim Regularly', body: 'Re-cut the stems every few days to keep them absorbing water efficiently.' },
      { icon: 'snowflake', title: 'Cool Environment', body: 'Keep away from direct heat sources — they thrive and last longer in cooler rooms.' },
    ],
  },
  {
    id: 6,
    slug: 'chrysanthemum',
    name: 'Chrysanthemum',
    latinName: 'Chrysanthemum',
    price: 'from 3.20 zł',
    priceNote: 'per stem',
    image: '/images/products/chrysanthemum.png',
    images: [
      '/images/products/chrysanthemum.png',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=600&h=800&q=85&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=600&h=800&q=85&fit=crop&crop=center',
    ],
    color: '#F0D090',
    properties: ['long-lasting', 'scent-free'],
    height: 'medium',
    fullness: 'lush',
    description: 'Hardy and cheerful. Chrysanthemums are the champions of longevity — up to 3 weeks with simple care.',
    careInstructions: [
      { icon: 'water', title: 'Regular Water', body: 'Change water every 2-3 days. A clean vase is just as important as fresh water.' },
      { icon: 'leaf', title: 'Remove Lower Leaves', body: 'Strip leaves from the lower half of stems to keep the water fresh for longer.' },
      { icon: 'snowflake', title: 'Keep it Cool', body: 'A cool spot out of direct sunlight is where chrysanthemums truly thrive.' },
    ],
  },
]

export const testimonials = [
  {
    id: 1,
    quote: "Finally — flowers that don't cost a fortune. I order every week now, just for my kitchen table.",
    name: 'Marta K.',
    location: 'Warsaw, Mokotów',
    stars: 5,
  },
  {
    id: 2,
    quote: "The tulips arrived the very next day. So fresh they lasted 12 days. Incredible.",
    name: 'Zofia W.',
    location: 'Warsaw, Żoliborz',
    stars: 5,
  },
  {
    id: 3,
    quote: "No fuss, no plastic, just gorgeous stems wrapped in kraft paper. This is how flowers should be sold.",
    name: 'Anna P.',
    location: 'Warsaw, Praga',
    stars: 5,
  },
  {
    id: 4,
    quote: "I used to spend 80 zł on a bouquet. Now I buy better flowers for 20 zł. The math makes no sense but I love it.",
    name: 'Kasia M.',
    location: 'Warsaw, Wola',
    stars: 5,
  },
  {
    id: 5,
    quote: "Love that they include a care card. My roses lasted two weeks following the instructions.",
    name: 'Julia R.',
    location: 'Warsaw, Śródmieście',
    stars: 5,
  },
]
