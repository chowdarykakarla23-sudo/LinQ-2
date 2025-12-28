import { Ride, RideStatus, Alert, Message, RideMatch, User, UserRole, ChatThread, WalletItem, SearchResult, Place } from './types';

export const APP_NAME = "LinQ";
export const TAGLINE = "Same route. Shared ride.";

export const PRESET_MESSAGES = [
  "Where should we meet?",
  "I am here.",
  "Running 5 mins late.",
  "How many seats free?",
  "Can I bring a bag?",
  "Where is the drop-off?"
];

export const MOCK_USER_PROFILE: User = {
  id: 'u_sumanth',
  name: 'Sumanth',
  displayName: 'Sumanth',
  phone: '+91 9*** *** 789',
  role: UserRole.BOTH,
  isVerified: true,
  gender: 'Male',
  ageRange: '21',
  city: 'Hyderabad',
  bio: 'Daily commuter from Miyapur to Hitech City. Flexible with bike or car.',
  verification: {
    phone: true,
    govtId: 'pending',
    license: 'none',
    vehicleRc: 'none',
    photo: true,
    emergencyContact: true
  },
  preferences: {
    gender: 'All',
    pickup: 'Flexible',
    time: 'Strict',
    music: true,
    smoking: false,
    chat: 'Neutral'
  },
  providerDetails: {
    vehicleType: 'Bike',
    vehicleModel: 'Pulsar 150',
    plateNumber: 'TS 07 ** 1234',
    totalSeats: 1,
    availableSeats: 1,
    pricingPolicy: 'Split',
    helmetAvailable: true,
    luggageAllowed: false
  },
  emergencyContact: {
    name: 'Karthik',
    phone: '+91 9XXXXXXXX1',
    relation: 'Friend'
  }
};

export const MOCK_RIDES: Ride[] = [
  {
    id: 'r1',
    type: 'Daily',
    vehicleType: 'Bike',
    from: 'Miyapur Metro',
    to: 'Hitech City',
    date: 'Today',
    time: '08:30 AM',
    seats: 1,
    price: 40,
    providerName: 'Aditi',
    providerRating: 4.8,
    status: RideStatus.CONFIRMED,
  },
  {
    id: 'r2',
    type: 'Instant',
    vehicleType: 'Auto',
    from: 'Kondapur',
    to: 'Gachibowli',
    date: 'Today',
    time: 'Now',
    seats: 2,
    price: 60,
    providerName: 'Finding...',
    providerRating: 0,
    status: RideStatus.REQUESTED,
  },
  {
    id: 'r3',
    type: 'Instant',
    vehicleType: 'Car',
    from: 'Madhapur',
    to: 'Jubilee Hills',
    date: 'Today',
    time: '06:45 PM',
    seats: 1,
    price: 80,
    providerName: 'Pending',
    providerRating: 0,
    status: RideStatus.REQUESTED,
  },
  {
    id: 'r4',
    type: 'Long Distance',
    vehicleType: 'Car',
    from: 'Hyderabad',
    to: 'Vijayawada',
    date: 'Sat',
    time: '07:00 AM',
    seats: 2,
    price: 450,
    providerName: 'Rohit',
    providerRating: 4.7,
    status: RideStatus.CONFIRMED,
  },
  {
    id: 'r5',
    type: 'Long Distance',
    vehicleType: 'Car',
    from: 'Hyderabad',
    to: 'Bangalore',
    date: 'Fri',
    time: '10:00 PM',
    seats: 1,
    price: 0,
    providerName: 'Abdul',
    providerRating: 4.9,
    status: RideStatus.REQUESTED,
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    category: 'ride',
    severity: 'default',
    title: 'Ride Confirmed',
    message: 'Aditi accepted your request for Miyapur → Hitech City.',
    timestamp: '10 mins ago',
    statusTag: 'CONFIRMED',
    actionPath: 'rides',
    isRead: false
  },
  {
    id: 'a2',
    category: 'safety',
    severity: 'default',
    title: 'Emergency Contact Verified',
    message: 'Karthik has been added as your emergency contact.',
    timestamp: '1 day ago',
    actionPath: 'profile',
    isRead: true
  }
];

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 'c1',
    otherUserId: 'u_aditi',
    otherUserName: 'Aditi',
    rideContext: 'Miyapur → Hitech City',
    vehicleType: 'Bike',
    rideStatus: RideStatus.CONFIRMED,
    lastMessage: 'Yes, I have an extra.',
    lastMessageTime: '2m',
    unreadCount: 1,
    isLocked: false,
    messages: [
       { id: 'm0', senderId: 'u_aditi', isSystem: true, text: 'Helmet available? Confirm before ride.', timestamp: '08:09 AM' },
       { id: 'm1', senderId: 'u_aditi', text: 'Can we meet near Miyapur Metro Gate 2?', timestamp: '08:10 AM' },
       { id: 'm2', senderId: 'me', text: 'Yes, I’ll be there in 5 mins.', timestamp: '08:12 AM' },
       { id: 'm3', senderId: 'u_aditi', text: 'Helmet available?', timestamp: '08:13 AM' },
       { id: 'm4', senderId: 'me', text: 'Yes, I have an extra.', timestamp: '08:14 AM' }
    ]
  },
  {
    id: 'c2',
    otherUserId: 'u_rohit',
    otherUserName: 'Rohit',
    rideContext: 'Hitech City → Kondapur',
    vehicleType: 'Car',
    rideStatus: RideStatus.CONFIRMED,
    lastMessage: 'Okay.',
    lastMessageTime: '15m',
    unreadCount: 0,
    isLocked: false,
    messages: [
       { id: 'm0', senderId: 'u_rohit', isSystem: true, text: 'Luggage size okay? Confirm boot space if needed.', timestamp: '05:59 PM' },
       { id: 'm1', senderId: 'u_rohit', text: 'I\'m leaving in 15 mins, coming?', timestamp: '06:00 PM' },
       { id: 'm2', senderId: 'me', text: 'Yes, wait 5 mins please.', timestamp: '06:02 PM' },
       { id: 'm3', senderId: 'u_rohit', text: 'Okay.', timestamp: '06:03 PM' }
    ]
  }
];

export const MOCK_WALLET_ITEMS: WalletItem[] = [
  {
    id: 'w1',
    rideId: 'r1',
    date: 'Today, 8:30 AM',
    otherUserId: 'u_aditi',
    otherUserName: 'Aditi',
    role: 'Payer',
    amount: 40,
    vehicleType: 'Bike',
    type: 'Fuel Share',
    status: 'Pending',
    rideDescription: 'Miyapur → Hitech City'
  },
  {
    id: 'w2',
    rideId: 'r_old',
    date: 'Yesterday',
    otherUserId: 'u_unknown',
    otherUserName: 'Ravi',
    role: 'Payer',
    amount: 70,
    vehicleType: 'Auto',
    type: 'Fuel Share',
    status: 'Resolved',
    rideDescription: 'Bachupally → Madhapur'
  }
];

export const MOCK_MESSAGES: Message[] = [];

export const MOCK_MATCHES: RideMatch[] = [
  {
    id: 'm1',
    driverName: 'Priya S.',
    rating: 4.9,
    isVerified: true,
    vehicleType: 'Car',
    vehicleModel: 'Honda City',
    seatsAvailable: 3,
    pricePerSeat: 60,
    leavingIn: '10 mins',
    tags: ['Women Only', 'AC'],
    fromLandmark: 'Miyapur X Roads',
    toLandmark: 'Hitech City Cyber Towers'
  },
  {
    id: 'm2',
    driverName: 'Ravi K.',
    rating: 4.7,
    isVerified: true,
    vehicleType: 'Bike',
    vehicleModel: 'Royal Enfield',
    seatsAvailable: 1,
    pricePerSeat: 40,
    leavingIn: '5 mins',
    tags: ['Quick Ride'],
    fromLandmark: 'Miyapur Metro',
    toLandmark: 'Mindspace',
    helmetAvailable: true
  },
  {
    id: 'm3',
    driverName: 'Amit V.',
    rating: 4.5,
    isVerified: true,
    vehicleType: 'Auto',
    vehicleModel: 'Bajaj RE',
    seatsAvailable: 2,
    pricePerSeat: 50,
    leavingIn: '20 mins',
    tags: ['Daily Commuter'],
    fromLandmark: 'Allwyn X Roads',
    toLandmark: 'Raheja Mindspace'
  }
];

// --- SEARCH MOCKS ---

export const MOCK_RECENT_SEARCHES: SearchResult[] = [
  { id: 'r1', type: 'recent', title: 'Home ↔ Office (Weekdays)' },
  { id: 'r2', type: 'recent', title: 'Miyapur Metro ↔ Hitech City' },
];

export const MOCK_LOCATIONS_SEARCH: SearchResult[] = [
  { id: 'l1', type: 'location', title: 'Hitech City', subtitle: 'Madhapur' },
  { id: 'l2', type: 'location', title: 'Miyapur Metro Station', subtitle: 'Miyapur' },
  { id: 'l3', type: 'location', title: 'Gachibowli', subtitle: 'Financial District' },
  { id: 'l4', type: 'location', title: 'Jubilee Hills', subtitle: 'Checkpost' },
  { id: 'l5', type: 'location', title: 'Vijayawada', subtitle: 'Intercity' },
  { id: 'l6', type: 'location', title: 'Bangalore', subtitle: 'Intercity' },
];

export const MOCK_ACTIONS_SEARCH: SearchResult[] = [
  { id: 'ac1', type: 'action', title: 'Offer seats', subtitle: 'Switch to Provider mode' },
  { id: 'ac2', type: 'action', title: 'Plan Weekend Trip', subtitle: 'Khajaguda Hills' },
];

export const MOCK_PEOPLE_SEARCH: SearchResult[] = [
  { id: 'p1', type: 'person', title: 'Aditi', subtitle: '4.8★ • Co-rider' },
  { id: 'p2', type: 'person', title: 'Rohit', subtitle: '4.7★ • Provider' },
];

export const MOCK_PLACES: Place[] = [
  {
    id: 'pl1',
    category: 'Cafe',
    title: 'Over The Moon Brewery',
    description: 'Popular evening hangout with great ambience.',
    area: 'Gachibowli',
    tags: ['Evening Hangout', 'Food', 'Drinks'],
    imageColor: 'bg-purple-100 text-purple-600',
    recommendedVehicle: 'Auto'
  },
  {
    id: 'pl2',
    category: 'Cafe',
    title: 'Taj Deccan Cafe',
    description: 'Quiet coffee meetup spot.',
    area: 'Banjara Hills Rd 1',
    tags: ['Coffee', 'Meetings'],
    imageColor: 'bg-orange-100 text-orange-600',
    recommendedVehicle: 'Car'
  },
  {
    id: 'pl3',
    category: 'Weekend',
    title: 'Khajaguda Hills',
    description: 'Perfect for a morning trek and sunrise view.',
    area: 'Puppalaguda',
    tags: ['Morning Trek', 'Nature', 'Adventure'],
    imageColor: 'bg-green-100 text-green-600',
    recommendedVehicle: 'Car'
  },
  {
    id: 'pl4',
    category: 'Event',
    title: 'Hyderabad Comic Con',
    description: 'The biggest pop-culture event in the city.',
    area: 'HITEX Exhibition Center',
    tags: ['Sat • 3:00 PM', 'Pop Culture'],
    imageColor: 'bg-yellow-100 text-yellow-600',
    recommendedVehicle: 'Auto'
  },
  {
    id: 'pl5',
    category: 'Event',
    title: 'Stand-up Comedy Night',
    description: 'Live comedy show.',
    area: 'Heart Cup Coffee, Jubilee Hills',
    tags: ['Fri • 8:00 PM', 'Comedy'],
    imageColor: 'bg-pink-100 text-pink-600',
    recommendedVehicle: 'Bike'
  }
];