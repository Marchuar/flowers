export interface Product {
  id: number
  name: string
  latinName: string
  price: string
  priceNote: string
  image: string
  tag?: string
  color: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Roses',
    latinName: 'Rosa',
    price: 'from 3.50 zł',
    priceNote: 'per stem',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=800&q=85&fit=crop&crop=center',
    tag: 'Bestseller',
    color: '#E8A0A0',
  },
  {
    id: 2,
    name: 'Tulips',
    latinName: 'Tulipa',
    price: 'from 2.90 zł',
    priceNote: 'per stem',
    image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=600&h=800&q=85&fit=crop&crop=center',
    tag: 'Seasonal',
    color: '#F5C5A0',
  },
  {
    id: 3,
    name: 'Peonies',
    latinName: 'Paeonia',
    price: 'from 6.90 zł',
    priceNote: 'per stem',
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&h=800&q=85&fit=crop&crop=center',
    tag: 'Premium',
    color: '#EFBDBD',
  },
  {
    id: 4,
    name: 'Wildflowers',
    latinName: 'Mixed stems',
    price: 'from 2.20 zł',
    priceNote: 'per stem',
    image: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=600&h=800&q=85&fit=crop&crop=center',
    color: '#B5CEAA',
  },
  {
    id: 5,
    name: 'Eustoma',
    latinName: 'Lisianthus',
    price: 'from 4.50 zł',
    priceNote: 'per stem',
    image: 'https://images.unsplash.com/photo-1469289759076-d1484757abc3?w=600&h=800&q=85&fit=crop&crop=center',
    color: '#C5B8E8',
  },
  {
    id: 6,
    name: 'Chrysanthemum',
    latinName: 'Chrysanthemum',
    price: 'from 3.20 zł',
    priceNote: 'per stem',
    image: 'https://images.unsplash.com/photo-1606041011872-596597976b25?w=600&h=800&q=85&fit=crop&crop=center',
    color: '#F0D090',
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
    quote: "The tulips arrived in under 2 hours. So fresh they lasted 12 days. Incredible.",
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
