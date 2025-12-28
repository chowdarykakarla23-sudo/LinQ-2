export enum UserRole {
  RIDER = 'Rider',
  PROVIDER = 'Provider',
  BOTH = 'Both',
  NONE = 'None' // Not selected yet
}

export enum RideStatus {
  REQUESTED = 'Requested',
  CONFIRMED = 'Confirmed',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export type RideMode = 'Instant' | 'Daily' | 'Long Distance';

export type VehicleType = 'Bike' | 'Auto' | 'Car';

export interface VerificationStatus {
  phone: boolean;
  govtId: 'verified' | 'pending' | 'rejected' | 'none';
  license: 'verified' | 'pending' | 'rejected' | 'none';
  vehicleRc: 'verified' | 'pending' | 'rejected' | 'none';
  photo: boolean;
  emergencyContact: boolean;
}

export interface UserPreferences {
  gender: 'All' | 'Women Only';
  pickup: 'Exact' | 'Flexible';
  time: 'Strict' | 'Flexible';
  music: boolean;
  smoking: boolean;
  chat: 'Quiet' | 'Neutral' | 'Chatty';
}

export interface ProviderDetails {
  vehicleType: VehicleType;
  vehicleModel: string;
  plateNumber: string; // Masked in UI
  totalSeats: number;
  availableSeats: number;
  pricingPolicy: 'Split' | 'Free' | 'Discuss';
  // Vehicle Specifics
  helmetAvailable?: boolean; // Bike
  luggageAllowed?: boolean; // Auto/Car
  ac?: boolean; // Car
}

export interface User {
  id: string;
  name: string;
  displayName?: string;
  phone: string;
  role: UserRole;
  isVerified: boolean; // General badge
  gender?: 'Male' | 'Female' | 'Prefer not to say';
  ageRange?: string; // e.g. "25-34"
  city?: string;
  bio?: string;
  
  // Detailed sections
  verification: VerificationStatus;
  preferences: UserPreferences;
  providerDetails?: ProviderDetails;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface SearchState {
  mode: RideMode;
  vehicleType: VehicleType;
  from: string;
  to: string;
  time: string;
  date?: string;
  seats: number;
  womenOnly: boolean;
}

export interface RideMatch {
  id: string;
  driverName: string;
  rating: number;
  isVerified: boolean;
  vehicleType: VehicleType;
  vehicleModel: string;
  seatsAvailable: number;
  pricePerSeat: number;
  leavingIn: string; // e.g., "12 mins"
  tags: string[]; // e.g., "Women Only", "Quiet Ride"
  fromLandmark: string;
  toLandmark: string;
  // Specifics
  helmetAvailable?: boolean;
}

export interface Ride {
  id: string;
  type: RideMode;
  vehicleType: VehicleType;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  providerName: string;
  providerRating: number;
  status: RideStatus;
}

// Alerts & Messages Types
export type AlertCategory = 'ride' | 'safety' | 'system';
export type AlertSeverity = 'default' | 'urgent' | 'critical';

export interface Alert {
  id: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  statusTag?: string; // e.g. REQUEST, CONFIRMED
  actionPath?: Tab; // Which tab to redirect to
  isRead: boolean;
}

export interface Message {
  id: string;
  senderId: string; // 'me' or 'other'
  text: string;
  timestamp: string;
  isSystem?: boolean; // For system notices in chat
}

export interface ChatThread {
  id: string;
  otherUserId: string;
  otherUserName: string;
  rideContext: string; // e.g., "Ride to Tech Park"
  vehicleType: VehicleType;
  rideStatus: RideStatus;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isLocked: boolean;
  messages: Message[];
}

// Wallet Types
export type ContributionType = 'Fuel Share' | 'Voluntary' | 'Free';
export type ContributionStatus = 'Suggested' | 'Pending' | 'Clarifying' | 'Resolved';

export interface WalletItem {
  id: string;
  rideId: string;
  date: string;
  otherUserId: string;
  otherUserName: string;
  role: 'Payer' | 'Receiver';
  amount?: number;
  vehicleType: VehicleType; // Added for pricing logic
  type: ContributionType;
  status: ContributionStatus;
  rideDescription: string;
}

// Search Types
export type SearchResultType = 'location' | 'ride' | 'person' | 'action' | 'recent';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  data?: any; // To hold specific object data like Ride or User
  icon?: React.ReactNode;
}

// Places & Events Types
export type PlaceCategory = 'Cafe' | 'Event' | 'Work' | 'Weekend' | 'Outdoors';

export interface Place {
  id: string;
  category: PlaceCategory;
  title: string;
  description: string;
  area: string;
  tags: string[];
  imageColor: string; // Tailwind class for background
  recommendedVehicle?: VehicleType;
}

export type Tab = 'home' | 'rides' | 'center' | 'inbox' | 'wallet' | 'profile';