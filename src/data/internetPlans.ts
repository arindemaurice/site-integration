import { InternetPlan } from '../types';

export const REPRESENTATIVE_INFO = {
  name: 'Arinde Maurice',
  title: 'Trusted Internet Connection Representative & Marketing Expert',
  phone: '0789269317',
  phoneDisplay: '0789 269 317',
  whatsapp: '0748808436',
  whatsappDisplay: '0748 808 436',
  email: 'arindemaurice16@gmail.com',
  whatsappLink: (message: string) => {
    // Uganda prefix 256 for WhatsApp
    const cleanPhone = '256748808436';
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  },
  callLink: 'tel:0789269317',
};

export const INTERNET_PLANS: InternetPlan[] = [
  {
    id: 'student-lite',
    name: 'Student Connect',
    speed: '20 Mbps',
    speedNumber: 20,
    priceUgx: 'UGX 85,000 / mo',
    category: 'student',
    description: 'Affordable, reliable speed designed for study, assignments, online lectures, and seamless browsing.',
    features: [
      'Fast Zoom & Google Meet video calls',
      'Smooth research and PDF downloads',
      'Connect up to 4 devices simultaneously',
      'Zero buffering for YouTube educational videos',
      'Friendly student budget pricing',
    ],
    recommendedFor: 'Students, researchers, and studio apartments',
  },
  {
    id: 'home-family',
    name: 'Home & Family Streamer',
    speed: '50 Mbps',
    speedNumber: 50,
    priceUgx: 'UGX 145,000 / mo',
    category: 'home',
    badge: 'Most Popular',
    isPopular: true,
    description: 'Perfect whole-home connection for non-stop Netflix 4K streaming, remote work, and multi-user entertainment.',
    features: [
      'Ultra HD 4K movie & series streaming',
      'Seamless multi-room Wi-Fi coverage',
      'Connect 8-12 devices with zero slowdown',
      'Fast upload speeds for work-from-home zoom calls',
      'Includes dual-band high-power Wi-Fi router',
    ],
    recommendedFor: 'Modern homes, family households & remote workers',
  },
  {
    id: 'gamer-creator',
    name: 'Pro Gamer & Creator',
    speed: '100 Mbps',
    speedNumber: 100,
    priceUgx: 'UGX 220,000 / mo',
    category: 'gamer',
    badge: 'Ultra Low Ping',
    description: 'Engineered for competitive multiplayer gaming and heavy content upload with rock-solid stability.',
    features: [
      'Sub-15ms low latency gaming route',
      'Zero packet loss & jitter-free matchmaking',
      'Fast game downloads (Call of Duty, FIFA, Fortnite)',
      'Twitch & YouTube high-bitrate live streaming',
      'Priority routing during peak evening hours',
    ],
    recommendedFor: 'Gamers, streamers, video editors & podcasters',
  },
  {
    id: 'business-turbo',
    name: 'Business Turbo Dedicated',
    speed: '250 Mbps',
    speedNumber: 250,
    priceUgx: 'UGX 380,000 / mo',
    category: 'business',
    badge: 'Dedicated Fiber',
    description: 'Uncapped enterprise fiber grade connection with guaranteed 99.9% uptime and VIP technical response.',
    features: [
      'Symmetric upload and download speeds',
      'Connect 25+ office computers & POS terminals',
      'Priority 24/7 dedicated support by Maurice',
      '99.9% SLA fiber network uptime guarantee',
      'Static IP available upon request',
    ],
    recommendedFor: 'Offices, clinics, agencies, cafes & commercial hubs',
  },
];

export const KEY_BENEFITS = [
  {
    icon: 'Zap',
    title: 'Fast & Reliable Connectivity',
    description: 'Say goodbye to spinning loading wheels and endless buffering with pure high-speed fiber.',
  },
  {
    icon: 'PlaySquare',
    title: 'Smooth Streaming & Downloads',
    description: 'Enjoy crisp 4K movies, rapid gigabyte downloads, and instant video buffering.',
  },
  {
    icon: 'Users',
    title: 'Homes, Students, Gamers & Businesses',
    description: 'Tailored speed tiers curated for every budget, household size, and commercial requirement.',
  },
  {
    icon: 'Wifi',
    title: 'Connect Multiple Devices with Ease',
    description: 'Smartphones, smart TVs, laptops, consoles, and security cameras connected harmoniously.',
  },
  {
    icon: 'Headphones',
    title: 'Quality Service & Direct Customer Support',
    description: 'Personalized attention from Arinde Maurice — your dedicated representative who cares.',
  },
];
