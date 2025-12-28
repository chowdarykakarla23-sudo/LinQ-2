import React, { useState, useEffect, useRef } from 'react';
import { UserRole, Tab, User, SearchState, RideMode, RideMatch, Ride, RideStatus, Alert, Message, ChatThread, WalletItem, ContributionStatus, SearchResult, Place, PlaceCategory, VehicleType } from './types';
import { BottomNav } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { APP_NAME, TAGLINE } from './constants';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';
import { MOCK_RIDES, MOCK_ALERTS, MOCK_CHAT_THREADS, MOCK_MATCHES, MOCK_USER_PROFILE, PRESET_MESSAGES, MOCK_WALLET_ITEMS, MOCK_PLACES } from './constants';
import { 
  ArrowRight, MapPin, Clock, Calendar, ShieldCheck, Star, ChevronRight, LogOut, Settings, 
  MessageSquare, AlertCircle, Car, User as UserIcon, Bike, Info, ArrowLeft, CheckCircle2, 
  Phone, AlertTriangle, XCircle, ThumbsUp, Zap, PlusCircle, Edit3, Bell, HelpCircle, 
  FileText, ShieldAlert, BadgeCheck, MessageCircle, Lock, Eye, EyeOff, CreditCard, Music, Cigarette, Volume2, 
  Wallet, Receipt, ArrowUpRight, Send, Flag, Ban, CheckCircle, Briefcase, Coffee, Mountain, Tent, Palmtree,
  CarFront, Backpack, Gauge
} from 'lucide-react';

// --- ZONE A: PUBLIC SCREENS ---

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      <h1 className="text-5xl font-bold tracking-tight mb-2">{APP_NAME}</h1>
      <p className="text-blue-100 text-lg font-medium">{TAGLINE}</p>
    </div>
  );
};

const Onboarding: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  return (
    <div className="flex flex-col h-screen p-6 bg-white">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
        <div className="w-64 h-64 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            {/* Placeholder for illustration */}
            <Car size={80} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Bike, Auto, or Car</h2>
        <p className="text-gray-600 max-w-xs">Real verified people, multiple vehicle options, and a community you can depend on.</p>
      </div>
      <div className="pb-8">
        <Button fullWidth onClick={onFinish}>Get Started</Button>
      </div>
    </div>
  );
};

const Login: React.FC<{ onNext: (phone: string) => void }> = ({ onNext }) => {
  const [phone, setPhone] = useState('');

  return (
    <div className="flex flex-col h-screen p-6 bg-white">
      <div className="flex-1 pt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to LinQ</h2>
        <p className="text-gray-500 mb-8">Enter your mobile number to continue</p>
        <Input 
          label="Mobile Number" 
          placeholder="+91 9XXXXXXXXX" 
          type="tel" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-lg"
          autoFocus
        />
      </div>
      <div className="pb-8">
         <p className="text-xs text-gray-400 text-center mb-4">By continuing, you agree to our Terms & Privacy Policy.</p>
        <Button fullWidth onClick={() => onNext(phone)} disabled={phone.length < 5}>Continue</Button>
      </div>
    </div>
  );
};

const OTP: React.FC<{ phone: string, onVerify: () => void, onBack: () => void }> = ({ phone, onVerify, onBack }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-white">
      <div className="flex-1 pt-12">
        <button onClick={onBack} className="text-gray-500 mb-6 flex items-center text-sm font-medium">
            <ArrowRight className="rotate-180 mr-1" size={16}/> Change Number
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Number</h2>
        <p className="text-gray-500 mb-8">Enter the code sent to {phone}</p>
        <div className="flex gap-3 justify-center mb-8">
            <Input 
                className="text-center text-2xl tracking-widest font-mono" 
                maxLength={4} 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="0000"
                autoFocus
            />
        </div>
        <div className="text-center">
             <button className="text-blue-600 font-medium text-sm">Resend Code</button>
        </div>
      </div>
      <div className="pb-8">
        <Button fullWidth onClick={handleVerify} isLoading={loading} disabled={code.length !== 4}>Verify</Button>
      </div>
    </div>
  );
};

const RoleSelection: React.FC<{ onSelect: (role: UserRole) => void }> = ({ onSelect }) => {
  return (
    <div className="flex flex-col h-screen p-6 bg-white">
      <div className="pt-12 mb-8">
         <h2 className="text-3xl font-bold text-gray-900 mb-2">How will you use LinQ?</h2>
         <p className="text-gray-500">You can change this later in your profile.</p>
      </div>
      
      <div className="space-y-4 flex-1">
        <Card onClick={() => onSelect(UserRole.RIDER)} className="border-2 border-transparent hover:border-blue-500 group">
          <div className="flex items-center gap-4">
             <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <UserIcon size={24} />
             </div>
             <div>
               <h3 className="font-bold text-gray-900">I need a ride</h3>
               <p className="text-sm text-gray-500">Find comfortable rides for daily commute</p>
             </div>
          </div>
        </Card>

        <Card onClick={() => onSelect(UserRole.PROVIDER)} className="border-2 border-transparent hover:border-blue-500 group">
          <div className="flex items-center gap-4">
             <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Car size={24} />
             </div>
             <div>
               <h3 className="font-bold text-gray-900">I have a vehicle</h3>
               <p className="text-sm text-gray-500">Offer rides (Bike, Auto, or Car)</p>
             </div>
          </div>
        </Card>

        <Card onClick={() => onSelect(UserRole.BOTH)} className="border-2 border-transparent hover:border-blue-500 group">
          <div className="flex items-center gap-4">
             <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <ShieldCheck size={24} />
             </div>
             <div>
               <h3 className="font-bold text-gray-900">I do both</h3>
               <p className="text-sm text-gray-500">Flexible depending on the day</p>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- ZONE B: MAIN TABS ---

// Types for Home Screen View States
type HomeViewState = 'SEARCH' | 'PREVIEW' | 'RESULTS' | 'DETAILS' | 'CONFIRMED';

interface HomeScreenProps {
    user: User | null;
    onNavigateToRides: () => void;
    prefilledDestination?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onNavigateToRides, prefilledDestination }) => {
    const [viewState, setViewState] = useState<HomeViewState>('SEARCH');
    const [greeting, setGreeting] = useState('');
    const [searchData, setSearchData] = useState<SearchState>({
        mode: 'Instant',
        vehicleType: 'Car',
        from: 'Miyapur', // Default updated to Hyderabad context
        to: '',
        time: '',
        seats: 1,
        womenOnly: false,
    });
    const [selectedMatch, setSelectedMatch] = useState<RideMatch | null>(null);

    // Effect for prefilled destination from Global Search
    useEffect(() => {
        if (prefilledDestination) {
            setSearchData(prev => ({ ...prev, to: prefilledDestination }));
            setViewState('PREVIEW'); // Jump straight to preview
        }
    }, [prefilledDestination]);

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours < 12) setGreeting('Good morning');
        else if (hours < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
        
        // Default time based on mode
        if (searchData.mode === 'Instant') setSearchData(prev => ({ ...prev, time: 'Now' }));
        if (searchData.mode === 'Daily') setSearchData(prev => ({ ...prev, time: '09:00' }));
    }, [searchData.mode]);

    const getRoleMessage = () => {
        if (!user) return "Find rides near you.";
        if (user.role === UserRole.RIDER) return "Find people traveling on the same route.";
        if (user.role === UserRole.PROVIDER) return "Share your route and offer seats.";
        return "Find rides or offer seats — whichever suits today.";
    };

    const handleSearch = () => {
        // Basic validation mock
        if (!searchData.to) return; 
        setViewState('PREVIEW');
    };

    const handleConfirmSearch = () => {
        setViewState('RESULTS');
    };

    const handleMatchSelect = (match: RideMatch) => {
        setSelectedMatch(match);
        setViewState('DETAILS');
    };

    const handleSendRequest = () => {
        setViewState('CONFIRMED');
    };

    const handleModeChange = (mode: RideMode) => {
        if (mode === 'Long Distance') {
            // Deprioritize Auto/Bike for long distance
            setSearchData(prev => ({ ...prev, mode, vehicleType: 'Car' }));
        } else {
            setSearchData(prev => ({ ...prev, mode }));
        }
    };

    // --- SUB-VIEWS ---

    const renderSearchDashboard = () => (
        <div className="space-y-6 animate-in fade-in duration-300">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    {greeting} 👋 <br/> Where are you going?
                </h1>
                <p className="text-sm text-gray-500 mt-2">{getRoleMessage()}</p>
            </header>

            {/* Main Search Card */}
            <div className="bg-white p-5 rounded-3xl shadow-lg shadow-gray-200/50 space-y-5">
                 
                 {/* Mode Toggle */}
                 <div className="flex items-center justify-between p-1 bg-gray-100 rounded-xl">
                     {(['Instant', 'Daily', 'Long Distance'] as RideMode[]).map(mode => (
                         <button 
                            key={mode}
                            onClick={() => handleModeChange(mode)}
                            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg transition-all text-center
                            ${searchData.mode === mode 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'}`}
                         >
                            {mode}
                         </button>
                     ))}
                 </div>
                 
                 {/* Locations */}
                 <div className="relative space-y-4">
                     <div className="relative">
                        <Input 
                            icon={<MapPin size={18} className="text-green-600"/>} 
                            placeholder="Current Location (Auto)" 
                            value={searchData.from}
                            onChange={e => setSearchData({...searchData, from: e.target.value})}
                        />
                     </div>
                     {/* Connector line */}
                     <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 -z-10 border-l border-dashed border-gray-300"></div>
                     <div className="relative">
                        <Input 
                            icon={<MapPin size={18} className="text-red-500"/>} 
                            placeholder="Enter Destination"
                            value={searchData.to}
                            onChange={e => setSearchData({...searchData, to: e.target.value})}
                         />
                     </div>
                 </div>

                 {/* Vehicle Type Selector */}
                 <div>
                     <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Vehicle Type</label>
                     <div className="grid grid-cols-3 gap-2">
                         {(['Bike', 'Auto', 'Car'] as VehicleType[]).map(type => {
                             const isDisabled = searchData.mode === 'Long Distance' && type !== 'Car';
                             return (
                                <button
                                    key={type}
                                    onClick={() => !isDisabled && setSearchData({...searchData, vehicleType: type})}
                                    disabled={isDisabled}
                                    className={`py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                                        searchData.vehicleType === type 
                                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                        : isDisabled 
                                            ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                                            : 'border-gray-100 bg-white text-gray-600 hover:border-blue-200'
                                    }`}
                                >
                                    {type === 'Bike' && <Bike size={20} />}
                                    {type === 'Auto' && <CarFront size={20} />}
                                    {type === 'Car' && <Car size={20} />}
                                    <span className="text-[10px] font-bold">{type}</span>
                                </button>
                             );
                         })}
                     </div>
                     {searchData.mode === 'Long Distance' && (
                         <p className="text-[10px] text-orange-500 mt-1.5 flex items-center">
                             <AlertCircle size={10} className="mr-1"/> Bike & Auto not recommended for long distance.
                         </p>
                     )}
                 </div>

                 {/* Mode Specific Inputs */}
                 <div className="grid grid-cols-2 gap-3">
                     <div className="relative">
                         {searchData.mode === 'Instant' ? (
                             <div className="block w-full pl-3 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm py-3 text-gray-500 flex items-center">
                                 <Clock size={16} className="mr-2 text-blue-500"/> Leaving Soon
                             </div>
                         ) : (
                             <Input 
                                type="time" 
                                defaultValue="09:00"
                                className="!py-2.5"
                             />
                         )}
                     </div>
                     
                     {searchData.mode === 'Long Distance' ? (
                         <div className="relative">
                             <Input type="date" className="!py-2.5" />
                         </div>
                     ) : searchData.mode === 'Daily' ? (
                        <div className="block w-full pl-3 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm py-3 text-gray-900 flex items-center overflow-hidden whitespace-nowrap">
                            <span className="text-xs font-medium">Mon, Tue, Wed...</span>
                        </div>
                     ) : (
                        <div className="relative">
                            <div className="block w-full px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm py-3 flex items-center justify-between">
                                <span className="text-gray-600">Seats: {searchData.seats}</span>
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => setSearchData(prev => ({...prev, seats: Math.max(1, prev.seats - 1)}))}
                                        className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                    >-</button>
                                    <button 
                                        onClick={() => setSearchData(prev => ({...prev, seats: Math.min(4, prev.seats + 1)}))}
                                        className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                     )}
                 </div>

                 {/* Gender Toggle */}
                 <div className="flex items-center gap-3 py-1">
                     <div 
                        onClick={() => setSearchData(prev => ({...prev, womenOnly: !prev.womenOnly}))}
                        className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${searchData.womenOnly ? 'bg-pink-500' : 'bg-gray-300'}`}
                     >
                         <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${searchData.womenOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                     </div>
                     <span className={`text-sm font-medium ${searchData.womenOnly ? 'text-pink-600' : 'text-gray-500'}`}>Women-only matches</span>
                 </div>

                 <Button fullWidth onClick={handleSearch} disabled={!searchData.to}>
                     Find {searchData.vehicleType} Ride
                 </Button>
            </div>

            {/* Saved Routes */}
            <div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide opacity-70">Saved Routes</h3>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    <button onClick={() => setSearchData({...searchData, to: 'Hitech City'})} className="shrink-0 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm active:scale-95 transition-transform text-left min-w-[140px]">
                         <span className="block text-xs font-bold text-blue-600 mb-1">WORK</span>
                         <span className="block text-sm font-semibold text-gray-800 truncate">Hitech City</span>
                    </button>
                    <button onClick={() => setSearchData({...searchData, to: 'Miyapur Metro'})} className="shrink-0 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm active:scale-95 transition-transform text-left min-w-[140px]">
                         <span className="block text-xs font-bold text-orange-500 mb-1">HOME</span>
                         <span className="block text-sm font-semibold text-gray-800 truncate">Miyapur</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPreview = () => (
        <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
            <header className="mb-6">
                <button onClick={() => setViewState('SEARCH')} className="text-gray-500 flex items-center text-sm font-medium mb-4 hover:text-gray-800">
                    <ArrowLeft size={16} className="mr-1"/> Edit Search
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Confirm Request</h1>
            </header>
            
            <div className="flex-1 space-y-6">
                <Card className="border-l-4 border-l-blue-500">
                     <div className="flex flex-col gap-4">
                         <div className="flex items-start gap-3">
                             <div className="mt-1"><MapPin size={20} className="text-gray-400"/></div>
                             <div>
                                 <p className="text-xs text-gray-400 font-medium">FROM</p>
                                 <p className="font-semibold text-gray-900">{searchData.from}</p>
                             </div>
                         </div>
                         <div className="w-full h-px bg-gray-100 ml-8"></div>
                         <div className="flex items-start gap-3">
                             <div className="mt-1"><MapPin size={20} className="text-blue-600"/></div>
                             <div>
                                 <p className="text-xs text-gray-400 font-medium">TO</p>
                                 <p className="font-semibold text-gray-900">{searchData.to}</p>
                             </div>
                         </div>
                     </div>
                </Card>

                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Vehicle</span>
                        <span className="font-bold text-gray-900 flex items-center gap-2">
                             {searchData.vehicleType === 'Bike' && <Bike size={16} />}
                             {searchData.vehicleType === 'Auto' && <CarFront size={16} />}
                             {searchData.vehicleType === 'Car' && <Car size={16} />}
                             {searchData.vehicleType}
                        </span>
                    </div>
                    {searchData.vehicleType === 'Bike' && (
                        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-100">
                            Warning: Max 1 seat. Small backpack only.
                        </div>
                    )}
                    {searchData.vehicleType === 'Auto' && (
                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                            Good for 2-3 people. Medium luggage allowed.
                        </div>
                    )}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time</span>
                        <span className="font-medium text-gray-900">
                            {searchData.mode === 'Instant' ? 'Leaving Now' : searchData.time}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Seats</span>
                        <span className="font-medium text-gray-900">{searchData.seats} Passenger{searchData.seats > 1 ? 's' : ''}</span>
                    </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl text-blue-800 text-sm">
                    <p className="flex items-start gap-2">
                        <Info size={16} className="shrink-0 mt-0.5" />
                        Searching for {searchData.vehicleType} providers on this route.
                    </p>
                </div>
            </div>

            <div className="mt-auto pt-4">
                <Button fullWidth onClick={handleConfirmSearch}>Show Matches</Button>
            </div>
        </div>
    );

    const renderResults = () => (
        <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
            <header className="mb-4">
                <button onClick={() => setViewState('PREVIEW')} className="text-gray-500 flex items-center text-sm font-medium mb-2 hover:text-gray-800">
                    <ArrowLeft size={16} className="mr-1"/> Back to Preview
                </button>
                <div className="flex justify-between items-end">
                    <h1 className="text-2xl font-bold text-gray-900">3 Matches Found</h1>
                    <span className="text-xs text-gray-400 font-medium mb-1">Sorted by time</span>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-20">
                {MOCK_MATCHES.map(match => (
                    <Card key={match.id} onClick={() => handleMatchSelect(match)} className="hover:border-blue-300 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                    {match.driverName.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h3 className="font-bold text-gray-900">{match.driverName}</h3>
                                        {match.isVerified && <ShieldCheck size={14} className="text-green-500" />}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        {match.vehicleType === 'Bike' && <Bike size={12} className="mr-1"/>}
                                        {match.vehicleType === 'Auto' && <CarFront size={12} className="mr-1"/>}
                                        {match.vehicleType === 'Car' && <Car size={12} className="mr-1"/>}
                                        {match.vehicleType} • {match.rating}★
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-lg text-gray-900">₹{match.pricePerSeat}</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Per Seat</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-3">
                            {match.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-medium text-gray-600">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                                <Clock size={16} />
                                Leaving in {match.leavingIn}
                            </div>
                            <div className="text-xs text-gray-400">
                                {match.seatsAvailable} seats left
                            </div>
                        </div>
                    </Card>
                ))}

                <div className="text-center py-6">
                    <p className="text-sm text-gray-500 mb-3">Don't see a good match?</p>
                    <button className="text-blue-600 font-medium text-sm">Turn on route alerts</button>
                </div>
            </div>
        </div>
    );

    const renderDetails = () => {
        if (!selectedMatch) return null;
        return (
            <div className="h-full flex flex-col animate-in slide-in-from-bottom duration-300 bg-gray-50 -m-6 p-6 z-10 overflow-y-auto">
                 <button onClick={() => setViewState('RESULTS')} className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm z-20">
                    <ArrowLeft size={20} className="text-gray-700"/>
                </button>

                {/* Map Placeholder Header */}
                <div className="h-48 bg-blue-100 -mx-6 -mt-6 mb-6 flex items-center justify-center text-blue-300">
                     <MapPin size={48} className="opacity-50" />
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedMatch.driverName}</h2>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="flex items-center text-sm font-medium text-gray-800">
                                    <Star size={14} className="text-yellow-400 fill-current mr-1" /> {selectedMatch.rating}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-green-600 flex items-center font-medium">
                                    <ShieldCheck size={14} className="mr-1"/> Verified
                                </span>
                             </div>
                        </div>
                        <div className="h-14 w-14 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                            {selectedMatch.driverName.charAt(0)}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                        <div className="p-3 bg-white rounded-full shadow-sm text-gray-700">
                            {selectedMatch.vehicleType === 'Car' && <Car size={24}/>}
                            {selectedMatch.vehicleType === 'Bike' && <Bike size={24}/>}
                            {selectedMatch.vehicleType === 'Auto' && <CarFront size={24}/>}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{selectedMatch.vehicleModel}</p>
                            <p className="text-xs text-gray-500">
                                {selectedMatch.vehicleType} • {selectedMatch.tags.join(', ')}
                            </p>
                        </div>
                    </div>
                    
                    {/* Vehicle Specifics */}
                    {selectedMatch.vehicleType === 'Bike' && (
                        <div className="flex items-center gap-2 mb-6 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                            <CheckCircle2 size={16} />
                            Helmet Available
                        </div>
                    )}
                    {(selectedMatch.vehicleType === 'Auto' || selectedMatch.vehicleType === 'Car') && (
                        <div className="flex items-center gap-2 mb-6 text-sm text-gray-700 bg-gray-100 p-3 rounded-lg">
                            <Backpack size={16} />
                            {selectedMatch.vehicleType === 'Auto' ? 'Medium luggage allowed' : 'Boot space available'}
                        </div>
                    )}

                    <div className="space-y-6 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-gray-200"></div>

                        <div className="flex gap-4 relative">
                            <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white shrink-0 mt-1 z-10"></div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold tracking-wide mb-1">PICKUP • {selectedMatch.leavingIn}</p>
                                <p className="font-semibold text-gray-900">{selectedMatch.fromLandmark}</p>
                                <p className="text-xs text-gray-500 mt-1">Wait time: ±5 mins</p>
                            </div>
                        </div>

                        <div className="flex gap-4 relative">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white shrink-0 mt-1 z-10"></div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold tracking-wide mb-1">DROP OFF</p>
                                <p className="font-semibold text-gray-900">{selectedMatch.toLandmark}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-30 max-w-md mx-auto">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <p className="text-2xl font-bold text-gray-900">₹{selectedMatch.pricePerSeat * searchData.seats}</p>
                            <p className="text-xs text-gray-500">Total for {searchData.seats} passenger{searchData.seats > 1 ? 's' : ''}</p>
                        </div>
                        <Button className="flex-[2]" onClick={handleSendRequest}>Send Request</Button>
                    </div>
                </div>
            </div>
        );
    };

    const renderConfirmed = () => (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h2>
            <p className="text-gray-600 mb-8 max-w-xs">
                Your {selectedMatch?.vehicleType} request was sent to <strong>{selectedMatch?.driverName}</strong>. 
                You'll be notified when they respond.
            </p>
            
            <div className="space-y-3 w-full">
                <Button fullWidth onClick={onNavigateToRides}>View in My Rides</Button>
                <Button fullWidth variant="ghost" onClick={() => setViewState('SEARCH')}>Back to Home</Button>
            </div>
        </div>
    );

    return (
        <div className="p-6 pb-32 h-full">
            {viewState === 'SEARCH' && renderSearchDashboard()}
            {viewState === 'PREVIEW' && renderPreview()}
            {viewState === 'RESULTS' && renderResults()}
            {viewState === 'DETAILS' && renderDetails()}
            {viewState === 'CONFIRMED' && renderConfirmed()}
        </div>
    );
};

interface RidesScreenProps {
    onNavigateToHome: () => void;
    initialSelectedRide?: Ride | null;
}

const RidesScreen: React.FC<RidesScreenProps> = ({ onNavigateToHome, initialSelectedRide }) => {
    type RideCategory = 'Upcoming' | 'Active' | 'Completed';
    const [activeCategory, setActiveCategory] = useState<RideCategory>('Upcoming');
    const [selectedRide, setSelectedRide] = useState<Ride | null>(initialSelectedRide || null);

    useEffect(() => {
        if (initialSelectedRide) {
            setSelectedRide(initialSelectedRide);
            // Auto switch category based on status
            if (initialSelectedRide.status === RideStatus.IN_PROGRESS) setActiveCategory('Active');
            else if (initialSelectedRide.status === RideStatus.COMPLETED || initialSelectedRide.status === RideStatus.CANCELLED) setActiveCategory('Completed');
            else setActiveCategory('Upcoming');
        }
    }, [initialSelectedRide]);

    const filteredRides = MOCK_RIDES.filter(ride => {
        if (activeCategory === 'Upcoming') return ride.status === RideStatus.REQUESTED || ride.status === RideStatus.CONFIRMED;
        if (activeCategory === 'Active') return ride.status === RideStatus.IN_PROGRESS;
        if (activeCategory === 'Completed') return ride.status === RideStatus.COMPLETED || ride.status === RideStatus.CANCELLED;
        return false;
    });

    const getVehicleIcon = (type: VehicleType) => {
        switch(type) {
            case 'Bike': return <Bike size={18} />;
            case 'Auto': return <CarFront size={18} />;
            case 'Car': return <Car size={18} />;
        }
    };

    // --- SUB-VIEWS FOR RIDE DETAILS ---

    const renderRequestedView = (ride: Ride) => (
         <div className="h-full flex flex-col animate-in slide-in-from-right duration-300 bg-gray-50 -m-6 p-6">
             <header className="mb-6">
                <button onClick={() => setSelectedRide(null)} className="text-gray-500 flex items-center text-sm font-medium mb-4 hover:text-gray-800">
                    <ArrowLeft size={16} className="mr-1"/> Back to My Rides
                </button>
                <div className="flex justify-between items-center">
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wide mb-2">Requested</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                        {getVehicleIcon(ride.vehicleType)} {ride.vehicleType}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Request Sent</h2>
                <p className="text-gray-500 text-sm">Waiting for {ride.providerName} to accept...</p>
            </header>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                        {ride.providerName.charAt(0)}
                    </div>
                    <div>
                         <p className="font-bold text-gray-900">{ride.providerName}</p>
                         <p className="text-xs text-gray-500">4.8 ★ • {ride.vehicleType}</p>
                    </div>
                </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Time</span>
                        <span className="font-medium text-gray-900">{ride.time}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Seats</span>
                        <span className="font-medium text-gray-900">{ride.seats}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Estimated Cost</span>
                        <span className="font-medium text-gray-900">₹{ride.price}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                 <p className="text-center text-xs text-gray-400 mb-4">You'll be notified when they respond.</p>
                 <Button variant="outline" fullWidth className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300">Cancel Request</Button>
            </div>
         </div>
    );

    const renderConfirmedView = (ride: Ride) => (
         <div className="h-full flex flex-col animate-in slide-in-from-right duration-300 bg-gray-50 -m-6 p-6">
             <header className="mb-6">
                <button onClick={() => setSelectedRide(null)} className="text-gray-500 flex items-center text-sm font-medium mb-4 hover:text-gray-800">
                    <ArrowLeft size={16} className="mr-1"/> Back to My Rides
                </button>
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-green-600"/>
                    <span className="text-green-700 font-bold text-sm uppercase tracking-wide">Confirmed</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Ready to Ride</h2>
            </header>

            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Meeting Point</h3>
                <div className="flex gap-3 mb-6">
                     <MapPin size={24} className="text-blue-600 shrink-0"/>
                     <div>
                         <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{ride.from}</p>
                         <p className="text-sm text-gray-500">Wait near the main entrance.</p>
                     </div>
                </div>
                <div className="flex gap-3">
                     <Clock size={24} className="text-gray-400 shrink-0"/>
                     <div>
                         <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{ride.time}</p>
                         <p className="text-sm text-gray-500">Be there 5 mins early.</p>
                     </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                        {ride.providerName.charAt(0)}
                    </div>
                    <div>
                         <p className="font-bold text-gray-900 text-sm">{ride.providerName}</p>
                         <p className="text-xs text-gray-500 flex items-center gap-1">
                             {getVehicleIcon(ride.vehicleType)} {ride.vehicleType}
                         </p>
                    </div>
                </div>
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Phone size={18}/>
                </div>
            </div>

            <div className="mt-auto space-y-4">
                 <p className="text-center text-xs text-gray-400">In case of emergency, you'll find help inside the ride.</p>
                 <Button fullWidth onClick={() => alert("Simulation: Ride Started")}>I'm Onboard</Button>
            </div>
         </div>
    );

    const renderInProgressView = (ride: Ride) => (
        <div className="h-full flex flex-col animate-in slide-in-from-right duration-300 bg-white -m-6 p-6 relative overflow-hidden">
            {/* Background Pulse Animation */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse"></div>
            
            <header className="mb-8 relative z-10">
                 <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4 animate-pulse">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Live Ride
                 </span>
                 <h2 className="text-3xl font-bold text-gray-900 mb-1">Ride in progress</h2>
                 <p className="text-gray-500">Heading to {ride.to}</p>
            </header>

            <div className="flex-1 relative z-10">
                 {/* Visual Route Representation */}
                 <div className="relative pl-8 space-y-8 mb-8">
                     <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                     {/* Progress Indicator */}
                     <div className="absolute left-[7px] top-1/3 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-white"></div>

                     <div className="relative opacity-50">
                         <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-gray-400 bg-white"></div>
                         <p className="text-xs font-bold text-gray-400">STARTED</p>
                         <p className="font-medium text-gray-800">{ride.from}</p>
                     </div>
                     <div className="relative">
                         <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-blue-600 bg-white"></div>
                         <p className="text-xs font-bold text-blue-600">ARRIVING IN ~12 MINS</p>
                         <p className="font-bold text-xl text-gray-900">{ride.to}</p>
                     </div>
                 </div>

                 <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center font-bold text-gray-500 shadow-sm">
                        {ride.providerName.charAt(0)}
                    </div>
                    <div className="flex-1">
                         <p className="font-bold text-gray-900">{ride.providerName}</p>
                         <p className="text-xs text-gray-500 flex items-center gap-1">
                             {getVehicleIcon(ride.vehicleType)} {ride.vehicleType}
                         </p>
                    </div>
                 </div>

                 {/* SOS Button - High Priority */}
                 <button className="w-full bg-red-50 border-2 border-red-100 text-red-600 rounded-2xl p-4 flex items-center justify-center gap-2 font-bold text-lg mb-3 active:scale-95 transition-transform hover:bg-red-100">
                     <AlertTriangle size={24} className="fill-current"/> SOS / Emergency
                 </button>
                 <div className="flex gap-3">
                     <button className="flex-1 py-3 text-sm font-medium text-gray-500 bg-gray-50 rounded-xl">Share Status</button>
                     <button className="flex-1 py-3 text-sm font-medium text-gray-500 bg-gray-50 rounded-xl">Report Issue</button>
                 </div>
            </div>

            <div className="mt-auto pt-6">
                <Button fullWidth variant="secondary" onClick={() => alert("Simulation: Ride Completed")}>End Ride (Simulate)</Button>
            </div>
        </div>
    );

    const renderCompletedView = (ride: Ride) => (
         <div className="h-full flex flex-col animate-in slide-in-from-right duration-300 bg-gray-50 -m-6 p-6">
             <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle2 size={40} />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Ride Completed</h2>
                 <p className="text-gray-500 mb-8">You arrived at {ride.to}</p>

                 <div className="bg-white p-6 rounded-3xl shadow-sm w-full mb-6">
                     <p className="text-sm font-bold text-gray-400 uppercase mb-4">How was {ride.providerName}?</p>
                     <div className="flex justify-center gap-2 mb-6">
                         {[1, 2, 3, 4, 5].map(star => (
                             <Star key={star} size={32} className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors fill-current"/>
                         ))}
                     </div>
                     <div className="flex flex-wrap justify-center gap-2">
                         {['Safe Driver', 'Clean Vehicle', 'Good Music', 'Friendly'].map(tag => (
                             <span key={tag} className="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
                                 {tag}
                             </span>
                         ))}
                     </div>
                 </div>
             </div>

             <div className="space-y-3">
                 <Button fullWidth onClick={() => setSelectedRide(null)}>Submit Rating</Button>
                 <Button variant="ghost" fullWidth onClick={() => setSelectedRide(null)}>Skip</Button>
             </div>
         </div>
    );

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                {activeCategory === 'Upcoming' ? <Calendar size={32}/> : activeCategory === 'Active' ? <Car size={32}/> : <CheckCircle2 size={32}/>}
             </div>
             <h3 className="text-lg font-bold text-gray-900 mb-2">
                 {activeCategory === 'Upcoming' ? "No upcoming rides" : 
                  activeCategory === 'Active' ? "No active ride right now" : "No completed rides yet"}
             </h3>
             <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                 {activeCategory === 'Upcoming' ? "Ready to start a journey? Find a ride on the Home screen." : 
                  activeCategory === 'Active' ? "Once you board a ride, you can track it here." : "Your past rides and ratings will appear here."}
             </p>
             <Button variant="secondary" onClick={onNavigateToHome}>Find a Ride</Button>
        </div>
    );

    // --- MAIN RENDER LOGIC ---

    if (selectedRide) {
        if (selectedRide.status === RideStatus.REQUESTED) return renderRequestedView(selectedRide);
        if (selectedRide.status === RideStatus.CONFIRMED) return renderConfirmedView(selectedRide);
        if (selectedRide.status === RideStatus.IN_PROGRESS) return renderInProgressView(selectedRide);
        if (selectedRide.status === RideStatus.COMPLETED) return renderCompletedView(selectedRide);
    }

    return (
        <div className="p-6 pb-32 pt-20">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">My Rides</h1>
                <div className="bg-gray-200 p-1 rounded-xl flex font-medium relative">
                    {/* Animated Tab Background could go here */}
                    {(['Upcoming', 'Active', 'Completed'] as RideCategory[]).map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-1 py-2.5 text-xs sm:text-sm rounded-lg transition-all duration-200 z-10 
                            ${activeCategory === cat ? 'bg-white text-gray-900 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <div className="space-y-4">
                {filteredRides.length > 0 ? filteredRides.map((ride) => (
                    <Card key={ride.id} onClick={() => setSelectedRide(ride)} className="group active:scale-[0.98] transition-transform">
                        <div className="flex justify-between items-start mb-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                                ${ride.status === RideStatus.CONFIRMED ? 'bg-green-100 text-green-700' : 
                                  ride.status === RideStatus.REQUESTED ? 'bg-yellow-100 text-yellow-700' : 
                                  ride.status === RideStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                {ride.status === RideStatus.IN_PROGRESS ? 'In Progress' : ride.status}
                            </span>
                            <span className="text-xs font-medium text-gray-400">{ride.type}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                                {ride.providerName.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{ride.providerName}</h4>
                                <div className="flex items-center text-xs text-gray-500">
                                    {getVehicleIcon(ride.vehicleType)}
                                    <span className="ml-1">{ride.vehicleType}</span>
                                    <span className="mx-1">•</span>
                                    <Star size={12} className="text-yellow-400 fill-current mr-1" />
                                    {ride.providerRating}
                                </div>
                            </div>
                            <div className="ml-auto text-right">
                                <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors"/>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-sm text-gray-700">
                                 <Clock size={14} className="text-gray-400" />
                                 <span>{ride.date}, {ride.time}</span>
                             </div>
                             <div className="flex items-center gap-2 text-sm text-gray-700">
                                 <MapPin size={14} className="text-gray-400" />
                                 <span className="truncate">{ride.from} → {ride.to}</span>
                             </div>
                        </div>
                    </Card>
                )) : renderEmptyState()}
            </div>
        </div>
    );
};

interface CenterScreenProps {
    user: User | null;
    onNavigateToHome: () => void;
    onPlanRideToPlace: (place: Place) => void;
}

const CenterScreen: React.FC<CenterScreenProps> = ({ user, onNavigateToHome, onPlanRideToPlace }) => {
    const [activeSubTab, setActiveSubTab] = useState<'rides' | 'places'>('rides');
    const [placeFilter, setPlaceFilter] = useState<PlaceCategory | 'All'>('All');

    // Filter places
    const filteredPlaces = placeFilter === 'All' 
        ? MOCK_PLACES 
        : MOCK_PLACES.filter(p => p.category === placeFilter);

    // Find active ride for "Today's Ride" card (using first confirm/progress one from mock)
    const activeRide = MOCK_RIDES.find(r => r.status === RideStatus.CONFIRMED || r.status === RideStatus.IN_PROGRESS);

    // --- SUB-VIEW: MY RIDES ---
    const renderMyRides = () => (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300 space-y-8">
            {/* Quick Actions - Vehicle Centric */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Find a Ride</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {(['Bike', 'Auto', 'Car'] as VehicleType[]).map(type => (
                        <button key={type} onClick={onNavigateToHome} className="bg-white hover:bg-gray-50 active:scale-95 transition-all p-3 rounded-2xl flex flex-col items-center text-center gap-2 border border-gray-100 shadow-sm">
                            <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                                {type === 'Bike' && <Bike size={18}/>}
                                {type === 'Auto' && <CarFront size={18}/>}
                                {type === 'Car' && <Car size={18}/>}
                            </div>
                            <span className="text-xs font-bold text-gray-800">Find {type}</span>
                        </button>
                    ))}
                </div>
                
                {user?.role !== UserRole.RIDER && (
                    <>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Offer a Ride</h3>
                        <div className="grid grid-cols-3 gap-3">
                             {(['Bike', 'Auto', 'Car'] as VehicleType[]).map(type => (
                                <button key={type} onClick={onNavigateToHome} className="bg-white hover:bg-gray-50 active:scale-95 transition-all p-3 rounded-2xl flex flex-col items-center text-center gap-2 border border-gray-100 shadow-sm">
                                    <div className="bg-green-50 p-2 rounded-full text-green-600">
                                        <PlusCircle size={18}/>
                                    </div>
                                    <span className="text-xs font-bold text-gray-800">Offer {type}</span>
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-400 text-center mt-3">
                            Switching vehicle? Updates apply to new offers only.
                        </p>
                    </>
                )}
            </div>

            {/* Today's Ride Card */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Today's Ride</h3>
                {activeRide ? (
                    <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                        <div className="flex justify-between items-start mb-4 pl-2">
                             <div>
                                 <p className="text-xs font-bold text-blue-600 mb-1">
                                     {activeRide.status === RideStatus.IN_PROGRESS ? 'LIVE NOW' : `LEAVING AT ${activeRide.time}`}
                                 </p>
                                 <h4 className="text-lg font-bold text-gray-900 leading-tight">
                                     {activeRide.from} <span className="text-gray-400">→</span> {activeRide.to}
                                 </h4>
                             </div>
                        </div>
                        <div className="flex items-center gap-3 pl-2 mb-4">
                            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs">
                                {activeRide.providerName.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                                {activeRide.providerName} • 
                                <span className="text-xs bg-gray-100 px-1 rounded">{activeRide.vehicleType}</span>
                            </span>
                        </div>
                        <div className="flex gap-2 pl-2">
                             <Button size="sm" fullWidth>View Details</Button>
                             <Button size="sm" variant="secondary" className="px-3"><MessageCircle size={18}/></Button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-2xl p-6 text-center border border-dashed border-gray-200">
                        <p className="text-sm text-gray-500">No ride planned for today.</p>
                        <button onClick={onNavigateToHome} className="text-blue-600 font-bold text-sm mt-1 hover:underline">Start one above</button>
                    </div>
                )}
            </div>
        </div>
    );

    // --- SUB-VIEW: PLACES & EVENTS ---
    const renderPlaces = () => (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-8">
            <header className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Places & Events near you</h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">Discover destinations and share a ride to get there.</p>
            </header>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
                {(['All', 'Cafe', 'Event', 'Work', 'Weekend', 'Outdoors'] as const).map(cat => (
                    <button
                        key={cat}
                        onClick={() => setPlaceFilter(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                            placeFilter === cat 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Places List */}
            <div className="space-y-6">
                {filteredPlaces.map(place => (
                    <div key={place.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                        <div className={`h-32 ${place.imageColor} relative p-6 flex flex-col justify-between`}>
                             {/* Icon Placeholder based on category */}
                             <div className="absolute top-4 right-4 opacity-20">
                                 {place.category === 'Cafe' && <Coffee size={64}/>}
                                 {place.category === 'Event' && <Music size={64}/>}
                                 {place.category === 'Work' && <Briefcase size={64}/>}
                                 {place.category === 'Weekend' && <Mountain size={64}/>}
                                 {place.category === 'Outdoors' && <Tent size={64}/>}
                             </div>
                             
                             <div className="relative z-10">
                                 <span className="inline-block px-2 py-1 bg-white/30 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-900 mb-2">
                                     {place.category}
                                 </span>
                             </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-gray-900">{place.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{place.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs font-medium text-gray-500 flex items-center bg-gray-50 px-2 py-1 rounded">
                                    <MapPin size={12} className="mr-1"/> {place.area}
                                </span>
                                {place.recommendedVehicle && (
                                    <span className="text-xs font-medium text-blue-600 flex items-center bg-blue-50 px-2 py-1 rounded">
                                        Tip: Take a {place.recommendedVehicle}
                                    </span>
                                )}
                            </div>
                            <Button fullWidth onClick={() => onPlanRideToPlace(place)}>
                                Plan Ride to here
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 pb-32 pt-20 animate-in fade-in duration-300">
             <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Ride Hub</h1>
                <p className="text-gray-500 mt-1 text-sm">Choose your mode, choose your ride.</p>
            </header>

            {/* Segmented Control */}
            <div className="flex bg-gray-100 p-1 rounded-2xl mb-8 relative">
                <button 
                    onClick={() => setActiveSubTab('rides')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        activeSubTab === 'rides' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Actions
                </button>
                <button 
                    onClick={() => setActiveSubTab('places')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        activeSubTab === 'places' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Places & Events
                </button>
            </div>

            {activeSubTab === 'rides' ? renderMyRides() : renderPlaces()}
        </div>
    );
};

const InboxScreen: React.FC<{ onNavigate: (path: Tab) => void }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'messages' | 'alerts'>('messages');
    const [viewingThread, setViewingThread] = useState<ChatThread | null>(null);
    const [inputMessage, setInputMessage] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Group threads
    const activeThreads = MOCK_CHAT_THREADS.filter(t => t.rideStatus === RideStatus.CONFIRMED || t.rideStatus === RideStatus.IN_PROGRESS);
    const pendingThreads = MOCK_CHAT_THREADS.filter(t => t.rideStatus === RideStatus.REQUESTED);
    const closedThreads = MOCK_CHAT_THREADS.filter(t => t.rideStatus === RideStatus.COMPLETED || t.rideStatus === RideStatus.CANCELLED);

    // Group alerts
    const rideAlerts = MOCK_ALERTS.filter(a => a.category === 'ride');
    const systemAlerts = MOCK_ALERTS.filter(a => a.category === 'system' || a.category === 'safety');

    const handleSendMessage = (text: string) => {
        if (!viewingThread || !text.trim()) return;
        
        // Mock sending message
        const newMessage: Message = {
            id: `new-${Date.now()}`,
            senderId: 'me',
            text: text,
            timestamp: 'Just now'
        };

        const updatedThread = {
            ...viewingThread,
            messages: [...viewingThread.messages, newMessage],
            lastMessage: text,
            lastMessageTime: 'Just now'
        };

        setViewingThread(updatedThread);
        setInputMessage('');
    };

    const renderChatThread = (thread: ChatThread) => (
         <div className="h-full flex flex-col animate-in slide-in-from-right duration-300 bg-white -m-6 z-50 absolute inset-0 pt-16">
             {/* Chat Header */}
             <header className="bg-white p-3 border-b border-gray-200 flex items-center gap-3 shadow-sm z-10">
                <button onClick={() => setViewingThread(null)} className="text-gray-500 hover:text-gray-800 p-1">
                    <ArrowLeft size={20} />
                </button>
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    {thread.otherUserName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">{thread.otherUserName}</h3>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            thread.rideStatus === RideStatus.CONFIRMED ? 'bg-green-100 text-green-700' :
                            thread.rideStatus === RideStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-700' :
                            thread.rideStatus === RideStatus.CANCELLED ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-600'
                        }`}>
                            {thread.rideStatus}
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-500 truncate">{thread.vehicleType} • {thread.rideContext}</p>
                </div>
                {/* Safety Actions */}
                <button className="text-gray-400 hover:text-red-500 p-2">
                    <Flag size={18} />
                </button>
            </header>
            
            {/* Messages Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50" ref={scrollRef}>
                 <div className="flex justify-center my-2">
                     <span className="text-[10px] bg-gray-200 text-gray-500 px-2 py-1 rounded-full shadow-sm">
                         Safety: Do not share financial info or passwords.
                     </span>
                 </div>
                 
                 {thread.messages.map(msg => (
                     <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                         {msg.isSystem ? (
                             <span className="text-xs text-blue-800 italic bg-blue-50 px-3 py-2 rounded-xl border border-blue-100 text-center max-w-xs">{msg.text}</span>
                         ) : (
                             <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm ${
                                 msg.senderId === 'me' 
                                 ? 'bg-blue-600 text-white rounded-tr-none' 
                                 : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                             }`}>
                                 <p>{msg.text}</p>
                                 <span className={`text-[10px] mt-1 block text-right ${msg.senderId === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                                     {msg.timestamp}
                                 </span>
                             </div>
                         )}
                     </div>
                 ))}
                 
                 {thread.isLocked && (
                     <div className="mt-6 p-4 bg-gray-100 rounded-xl text-center border border-gray-200">
                         <Lock size={20} className="mx-auto text-gray-400 mb-2"/>
                         <p className="text-sm font-bold text-gray-600">Conversation Ended</p>
                         <p className="text-xs text-gray-500">This chat is locked because the ride was cancelled.</p>
                     </div>
                 )}
            </div>

            {/* Input Area */}
            {!thread.isLocked && (
                <div className="bg-white border-t border-gray-200">
                    {/* Presets */}
                    <div className="flex gap-2 overflow-x-auto p-3 no-scrollbar border-b border-gray-50">
                        {PRESET_MESSAGES.map(preset => (
                            <button 
                                key={preset}
                                onClick={() => handleSendMessage(preset)}
                                className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-full transition-colors"
                            >
                                {preset}
                            </button>
                        ))}
                    </div>

                    <div className="p-3 flex gap-2 items-center">
                        <button className="p-2 text-red-500 bg-red-50 rounded-full hover:bg-red-100" title="SOS">
                            <ShieldAlert size={20} />
                        </button>
                        <Input 
                            placeholder="Type a message..." 
                            className="!mb-0" 
                            value={inputMessage}
                            onChange={e => setInputMessage(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputMessage)}
                        />
                        <button 
                            onClick={() => handleSendMessage(inputMessage)}
                            disabled={!inputMessage.trim()}
                            className="p-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                        >
                            <Send size={18}/>
                        </button>
                    </div>
                </div>
            )}
         </div>
    );

    const renderChatList = () => (
        <div className="space-y-6">
            {/* ACTIVE RIDES */}
            <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Active Rides</h3>
                <div className="space-y-3">
                    {activeThreads.length > 0 ? activeThreads.map(thread => (
                        <div 
                            key={thread.id}
                            onClick={() => setViewingThread(thread)}
                            className="bg-white p-3 rounded-2xl border-l-4 border-l-blue-500 border-y border-r border-gray-100 shadow-sm flex items-center gap-3 active:scale-[0.99] transition-transform cursor-pointer"
                        >
                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm relative">
                                {thread.otherUserName.charAt(0)}
                                {thread.unreadCount > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="text-sm font-bold text-gray-900 truncate">{thread.otherUserName}</h4>
                                    <span className="text-[10px] text-gray-400">{thread.lastMessageTime}</span>
                                </div>
                                <p className={`text-xs truncate ${thread.unreadCount > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>{thread.lastMessage}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                                        {thread.vehicleType === 'Bike' && <Bike size={10}/>}
                                        {thread.vehicleType === 'Auto' && <CarFront size={10}/>}
                                        {thread.vehicleType === 'Car' && <Car size={10}/>}
                                        {thread.rideContext}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300"/>
                        </div>
                    )) : (
                        <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-xs text-gray-400">No active rides.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* PENDING REQUESTS */}
            <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Requests</h3>
                <div className="space-y-3">
                    {pendingThreads.length > 0 ? pendingThreads.map(thread => (
                        <div 
                            key={thread.id}
                            onClick={() => setViewingThread(thread)}
                            className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-xs">
                                {thread.otherUserName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="text-sm font-bold text-gray-700 truncate">{thread.otherUserName}</h4>
                                    <span className="text-[10px] text-gray-400">{thread.lastMessageTime}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{thread.lastMessage}</p>
                                <span className="inline-block mt-1 text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded">Request Pending</span>
                            </div>
                        </div>
                    )) : <p className="text-xs text-gray-400 italic pl-2">No pending requests.</p>}
                </div>
            </section>

            {/* CLOSED CHATS */}
            <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">History</h3>
                <div className="space-y-3">
                    {closedThreads.map(thread => (
                        <div 
                            key={thread.id}
                            onClick={() => setViewingThread(thread)}
                            className="bg-gray-50 p-3 rounded-2xl border border-transparent flex items-center gap-3 grayscale opacity-70 hover:opacity-100 hover:bg-white hover:shadow-sm hover:grayscale-0 transition-all cursor-pointer"
                        >
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs">
                                {thread.otherUserName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="text-sm font-bold text-gray-600 truncate">{thread.otherUserName}</h4>
                                    <span className="text-[10px] text-gray-400">{thread.lastMessageTime}</span>
                                </div>
                                <p className="text-xs text-gray-400 truncate">{thread.lastMessage}</p>
                                <span className="text-[10px] text-gray-400 mt-1 block">{thread.rideStatus}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    const renderAlertsList = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* RIDE ALERTS */}
            <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Ride Alerts</h3>
                <div className="space-y-3">
                        {rideAlerts.length > 0 ? rideAlerts.map(alert => (
                            <div 
                            key={alert.id} 
                            onClick={() => alert.actionPath && onNavigate(alert.actionPath)}
                            className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm flex items-start gap-3 active:scale-[0.99] transition-transform cursor-pointer"
                            >
                                <div className="mt-0.5 p-1.5 bg-blue-100 text-blue-600 rounded-full shrink-0">
                                    <Car size={16}/>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-bold text-gray-900">{alert.title}</h4>
                                        <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-snug">{alert.message}</p>
                                    {alert.statusTag && (
                                        <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold">
                                            {alert.statusTag}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )) : <p className="text-sm text-gray-400 italic pl-1">No active ride alerts.</p>}
                </div>
            </section>

            {/* SYSTEM & SAFETY */}
            <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">System & Safety</h3>
                    <div className="space-y-3">
                        {systemAlerts.map(alert => (
                            <div 
                            key={alert.id} 
                            onClick={() => alert.actionPath && onNavigate(alert.actionPath)}
                            className={`p-4 rounded-2xl border shadow-sm flex items-start gap-3 active:scale-[0.99] transition-transform cursor-pointer
                            ${alert.severity === 'critical' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-200'}`}
                            >
                                <div className={`mt-0.5 p-1.5 rounded-full shrink-0 
                                    ${alert.severity === 'critical' ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>
                                    {alert.severity === 'critical' ? <ShieldAlert size={16}/> : <Info size={16}/>}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm font-bold ${alert.severity === 'critical' ? 'text-red-900' : 'text-gray-900'}`}>{alert.title}</h4>
                                        <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
                                    </div>
                                    <p className={`text-sm leading-snug ${alert.severity === 'critical' ? 'text-red-800' : 'text-gray-600'}`}>{alert.message}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );

    return (
        <div className="p-6 pb-32 pt-20 relative h-full">
            {viewingThread && renderChatThread(viewingThread)}
            
            <header className="mb-6 flex justify-between items-end">
                <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    {/* Tab Switcher */}
                    <div className="flex bg-gray-200 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveTab('messages')}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'messages' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Messages
                        </button>
                        <button 
                            onClick={() => setActiveTab('alerts')}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'alerts' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Alerts
                        </button>
                    </div>
                </div>
            </header>

            {activeTab === 'messages' ? renderChatList() : renderAlertsList()}
        </div>
    );
};

const WalletScreen: React.FC<{ onNavigate: (path: Tab) => void }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
    const [items, setItems] = useState<WalletItem[]>(MOCK_WALLET_ITEMS);

    const activeItems = items.filter(i => i.status !== 'Resolved');
    const historyItems = items.filter(i => i.status === 'Resolved');

    const handleMarkSettled = (id: string) => {
        setItems(items.map(item => item.id === id ? { ...item, status: 'Resolved' } : item));
    };

    return (
        <div className="p-6 pb-32 pt-20 animate-in fade-in duration-300">
            <header className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
                <p className="text-gray-500 text-sm mt-1">Transparency for shared costs.</p>
            </header>

            {/* SAFETY BANNER */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex gap-3">
                <ShieldCheck size={20} className="text-blue-600 shrink-0 mt-0.5"/>
                <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">LinQ does not process payments</p>
                    <p className="text-xs text-blue-800 leading-snug">
                        Suggested ranges: Bike (₹20-50), Auto (₹40-80), Car (₹50+). Actual contributions happen directly between users.
                    </p>
                </div>
            </div>

            {/* SUMMARY CARD */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl shadow-gray-200 mb-8">
                <div className="grid grid-cols-2 gap-6 relative">
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Pending Dues</p>
                        <p className="text-2xl font-bold text-orange-400">₹80.00</p>
                        <p className="text-[10px] text-gray-500 mt-1">You owe (Estimate)</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Incoming</p>
                        <p className="text-2xl font-bold text-green-400">₹0.00</p>
                        <p className="text-[10px] text-gray-500 mt-1">To receive</p>
                    </div>
                    {/* Vertical Divider */}
                    <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white/10"></div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Total Cleared Contributions</span>
                    <span className="text-sm font-bold">₹70.00</span>
                </div>
            </div>

            {/* TABS */}
            <div className="flex border-b border-gray-200 mb-6">
                <button 
                    onClick={() => setActiveTab('active')}
                    className={`flex-1 pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Active Balances
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    History
                </button>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {activeTab === 'active' ? (
                    activeItems.length > 0 ? activeItems.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
                            <div className="flex justify-between items-start mb-3 pl-2">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{item.rideDescription}</h3>
                                    <p className="text-xs text-gray-500">with {item.otherUserName} • {item.date}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-gray-900 text-lg">₹{item.amount}</span>
                                    <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wide bg-orange-50 px-1.5 py-0.5 rounded">Pending</span>
                                </div>
                            </div>
                            
                            <div className="pl-2 mb-4">
                                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg inline-block">
                                    <span className="font-bold">Note:</span> {item.type} contribution suggested for {item.vehicleType}.
                                </p>
                            </div>

                            <div className="flex gap-3 pl-2">
                                <Button 
                                    size="sm" 
                                    variant="secondary" 
                                    className="flex-1 text-xs h-9 bg-green-50 text-green-700 hover:bg-green-100"
                                    onClick={() => handleMarkSettled(item.id)}
                                >
                                    <CheckCircle size={14}/> Mark Settled
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="flex-1 text-xs h-9"
                                    onClick={() => onNavigate('inbox')}
                                >
                                    <MessageCircle size={14}/> Discuss
                                </Button>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-gray-400">
                            <p>No active balances.</p>
                        </div>
                    )
                ) : (
                    historyItems.length > 0 ? historyItems.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-700 text-sm">{item.rideDescription}</h3>
                                    <p className="text-xs text-gray-400">{item.date}</p>
                                </div>
                                <span className="text-sm font-bold text-gray-400 line-through">₹{item.amount}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                                    <CheckCircle2 size={10}/> Cleared
                                </span>
                                <span className="text-[10px] text-gray-400">{item.type} ({item.vehicleType})</span>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-gray-400">
                            <p>No history yet.</p>
                        </div>
                    )
                )}
            </div>
            
            <div className="mt-8 text-center">
                <button className="text-xs text-red-400 font-medium hover:text-red-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                    <Flag size={12}/> Report contribution misconduct
                </button>
            </div>
        </div>
    );
};

const ProfileScreen: React.FC<{ user: User | null, onLogout: () => void }> = ({ user, onLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<User | null>(user);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    if (!userData) return null;

    // --- HELPER COMPONENTS ---

    const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1 mt-8">{title}</h3>
    );

    const VerificationItem: React.FC<{ label: string, status: 'verified' | 'pending' | 'rejected' | 'none' | boolean }> = ({ label, status }) => {
        let statusColor = 'bg-gray-100 text-gray-400';
        let StatusIcon = XCircle;
        let statusText = 'Not Submitted';

        if (status === true || status === 'verified') {
            statusColor = 'bg-green-100 text-green-600';
            StatusIcon = CheckCircle2;
            statusText = 'Verified';
        } else if (status === 'pending') {
            statusColor = 'bg-yellow-100 text-yellow-600';
            StatusIcon = Clock;
            statusText = 'Pending';
        } else if (status === 'rejected') {
            statusColor = 'bg-red-100 text-red-600';
            StatusIcon = AlertCircle;
            statusText = 'Rejected';
        }

        return (
            <div className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusColor}`}>
                    <StatusIcon size={12} /> {statusText}
                </div>
            </div>
        );
    };

    const SettingRow: React.FC<{ icon: React.ReactNode, label: string, value?: string, action?: boolean }> = ({ icon, label, value, action }) => (
        <div className="flex items-center justify-between p-4 active:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
                <div className="text-gray-400">{icon}</div>
                <span className="text-gray-700 font-medium text-sm">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-xs text-gray-500 font-medium">{value}</span>}
                {action && <ChevronRight size={18} className="text-gray-300"/>}
            </div>
        </div>
    );

    // --- MAIN RENDER ---

    return (
        <div className="p-6 pb-32 pt-20 animate-in fade-in duration-300 bg-white min-h-screen absolute inset-0 z-40 overflow-y-auto">
            {/* 1. TOP HEADER - IDENTITY HUB */}
            <header className="mb-6 flex flex-col items-center text-center">
                 <div className="relative">
                    <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-sm mb-3">
                        {userData.name.charAt(0)}
                    </div>
                    <button className="absolute bottom-3 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-md border-2 border-white">
                        <Edit3 size={14}/>
                    </button>
                 </div>
                 
                 {isEditing ? (
                     <div className="w-full space-y-3 mb-4 animate-in fade-in slide-in-from-top-2">
                         <Input label="Display Name" value={userData.displayName} onChange={(e) => setUserData({...userData, displayName: e.target.value})} />
                         <Input label="Bio" value={userData.bio} onChange={(e) => setUserData({...userData, bio: e.target.value})} />
                         <div className="flex gap-2">
                             <Button size="sm" variant="secondary" fullWidth onClick={() => setIsEditing(false)}>Cancel</Button>
                             <Button size="sm" fullWidth onClick={() => setIsEditing(false)}>Save</Button>
                         </div>
                     </div>
                 ) : (
                    <>
                        <h1 className="text-2xl font-bold text-gray-900">{userData.displayName || userData.name}</h1>
                        <p className="text-sm text-gray-400 font-mono mb-2">{userData.phone}</p>
                        
                        <div className="flex gap-2 justify-center mb-4">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                {userData.role}
                            </span>
                            {userData.isVerified ? (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    <ShieldCheck size={12}/> Verified
                                </span>
                            ) : (
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    Partially Verified
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 max-w-xs italic leading-relaxed">"{userData.bio}"</p>
                        
                        <div className="flex gap-3 mt-6 w-full">
                            <Button variant="secondary" className="flex-1 py-2 text-xs" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            <Button variant="outline" className="flex-1 py-2 text-xs">Switch Role</Button>
                        </div>
                    </>
                 )}
            </header>

            {/* 2. BASIC INFO (READ ONLY VIEW) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-2 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Gender</p>
                    <p className="text-sm font-medium text-gray-800">{userData.gender}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Age Range</p>
                    <p className="text-sm font-medium text-gray-800">{userData.ageRange}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">City</p>
                    <p className="text-sm font-medium text-gray-800">{userData.city}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Joined</p>
                    <p className="text-sm font-medium text-gray-800">May 2023</p>
                </div>
            </div>


            {/* 3. TRUST & VERIFICATION CENTER */}
            <SectionHeader title="Trust & Verification" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <VerificationItem label="Phone Number" status={userData.verification.phone} />
                <VerificationItem label="Government ID" status={userData.verification.govtId} />
                {(userData.role === UserRole.PROVIDER || userData.role === UserRole.BOTH) && (
                    <>
                        <VerificationItem label="Driving License" status={userData.verification.license} />
                        <VerificationItem label="Vehicle RC" status={userData.verification.vehicleRc} />
                    </>
                )}
                <VerificationItem label="Emergency Contact" status={userData.verification.emergencyContact} />
            </div>

            {/* 4. RIDER SETTINGS */}
            <SectionHeader title="Rider Preferences" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <SettingRow icon={<UserIcon size={18}/>} label="Gender Preference" value={userData.preferences.gender} action />
                <SettingRow icon={<MapPin size={18}/>} label="Pickup Flexibility" value={userData.preferences.pickup} action />
                <SettingRow icon={<Music size={18}/>} label="Music" value={userData.preferences.music ? 'Allowed' : 'No'} action />
                <SettingRow icon={<Volume2 size={18}/>} label="Conversation" value={userData.preferences.chat} action />
            </div>

            {/* 5. PROVIDER SETTINGS (CONDITIONAL) */}
            {(userData.role === UserRole.PROVIDER || userData.role === UserRole.BOTH) && userData.providerDetails && (
                <>
                    <SectionHeader title="Provider Console" />
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                         <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                             <div>
                                <h4 className="font-bold text-gray-900">{userData.providerDetails.vehicleType} Configuration</h4>
                                <p className="text-xs text-gray-500">Primary Vehicle</p>
                             </div>
                             <div className="p-2 bg-white border rounded-lg">
                                {userData.providerDetails.vehicleType === 'Bike' && <Bike size={20}/>}
                                {userData.providerDetails.vehicleType === 'Auto' && <CarFront size={20}/>}
                                {userData.providerDetails.vehicleType === 'Car' && <Car size={20}/>}
                             </div>
                         </div>
                         <div className="p-4 bg-white border-b border-gray-100">
                             <div className="flex justify-between items-center mb-1">
                                 <h4 className="font-bold text-gray-900">{userData.providerDetails.vehicleModel}</h4>
                                 <span className="text-xs font-mono bg-white border px-1.5 rounded">{userData.providerDetails.plateNumber}</span>
                             </div>
                             <p className="text-xs text-gray-500">{userData.providerDetails.availableSeats} / {userData.providerDetails.totalSeats} Seats</p>
                         </div>
                         
                         {userData.providerDetails.vehicleType === 'Bike' && (
                             <SettingRow icon={<ShieldCheck size={18}/>} label="Helmet Available" value={userData.providerDetails.helmetAvailable ? 'Yes' : 'No'} action />
                         )}
                         {(userData.providerDetails.vehicleType === 'Car' || userData.providerDetails.vehicleType === 'Auto') && (
                             <SettingRow icon={<Backpack size={18}/>} label="Luggage Allowed" value={userData.providerDetails.luggageAllowed ? 'Yes' : 'No'} action />
                         )}
                         
                         <SettingRow icon={<Zap size={18}/>} label="Pricing Policy" value={userData.providerDetails.pricingPolicy} action />
                         <div className="p-3 text-center border-t border-gray-100">
                             <button className="text-xs font-bold text-blue-600">+ Add Another Vehicle</button>
                         </div>
                    </div>
                </>
            )}

            {/* 6. EMERGENCY & SAFETY (CRITICAL) */}
            <SectionHeader title="Emergency & Safety" />
            <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                <div className="p-4 border-b border-red-100 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-red-900 text-sm">Emergency Contacts</h4>
                        <p className="text-xs text-red-600 mt-0.5">{userData.emergencyContact?.name} ({userData.emergencyContact?.relation})</p>
                    </div>
                    <Button size="sm" className="bg-red-200 text-red-800 hover:bg-red-300 py-1 px-3 h-8 shadow-none">Manage</Button>
                </div>
                <SettingRow icon={<ShieldAlert size={18} className="text-red-500"/>} label="SOS Settings" action />
                <SettingRow icon={<XCircle size={18} className="text-red-500"/>} label="Blocked Users" action />
            </div>

            {/* 7. PRIVACY & CONTROLS */}
            <SectionHeader title="Privacy" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <SettingRow icon={<Eye size={18}/>} label="Show Gender" value="On" action />
                <SettingRow icon={<Star size={18}/>} label="Show Rating" value="On" action />
                <div className="p-3 text-[10px] text-gray-400 text-center bg-gray-50">
                    Phone number is always masked for safety.
                </div>
            </div>

            {/* 8. PAYMENTS (PLACEHOLDER) */}
            <SectionHeader title="Payments" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <SettingRow icon={<CreditCard size={18}/>} label="Payment Methods" value="UPI" action />
                 <SettingRow icon={<FileText size={18}/>} label="Refund History" action />
            </div>

            {/* 9. ACCOUNT MANAGEMENT */}
            <SectionHeader title="Account" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <SettingRow icon={<Bell size={18}/>} label="Notifications" value="On" action />
                 <SettingRow icon={<LogOut size={18}/>} label="Log Out" action />
            </div>

            {/* 10. LEGAL */}
            <div className="mt-8 mb-6 space-y-3">
                <div className="flex justify-center gap-6 text-xs text-gray-400 font-medium">
                    <span>Help Center</span>
                    <span>Terms</span>
                    <span>Privacy</span>
                </div>
                 <div className="text-center">
                    <button className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Delete Account</button>
                    <p className="text-[10px] text-gray-300 mt-2">LinQ Version 1.0.0</p>
                </div>
            </div>

        </div>
    );
};

// --- MAIN APP COMPONENT ---

enum AppStage {
  SPLASH,
  ONBOARDING,
  LOGIN,
  OTP,
  ROLE_SELECTION,
  MAIN_APP
}

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.SPLASH);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [user, setUser] = useState<User | null>(MOCK_USER_PROFILE); // Start with Mock User
  const [tempPhone, setTempPhone] = useState('');
  
  // Lifted States for Deep Linking
  const [selectedRideForDetails, setSelectedRideForDetails] = useState<Ride | null>(null);
  const [prefilledDestination, setPrefilledDestination] = useState<string>('');

  // Navigation Logic
  const handleLoginNext = (phone: string) => {
    setTempPhone(phone);
    setStage(AppStage.OTP);
  };

  const handleVerifyOTP = () => {
    setStage(AppStage.ROLE_SELECTION);
  };

  const handleRoleSelect = (role: UserRole) => {
    // Merge selection with mock profile for demo
    if (user) {
        setUser({ ...user, role });
    }
    setStage(AppStage.MAIN_APP);
  };

  const handleLogout = () => {
    setUser(null);
    setTempPhone('');
    setActiveTab('home');
    setStage(AppStage.LOGIN);
  };

  const navigateToRides = () => {
    setActiveTab('rides');
  };

  const navigateToHome = () => {
    setActiveTab('home');
  };

  const handleNavigate = (path: Tab) => {
      setActiveTab(path);
  };

  // Top Bar Handlers
  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const handleSearchSelect = (result: SearchResult) => {
      if (result.type === 'location') {
          setActiveTab('home');
          setPrefilledDestination(result.title);
      } else if (result.type === 'ride' && result.data) {
          setActiveTab('rides');
          setSelectedRideForDetails(result.data as Ride);
      } else if (result.type === 'person') {
          setActiveTab('profile'); // In real app, open specific user profile
      } else if (result.type === 'action') {
          // Handle actions like "Offer Seat" -> Could route to a post flow
          if (result.title.includes('Offer')) setActiveTab('center');
      }
  };

  const handlePlanRideToPlace = (place: Place) => {
      // Simulate "Plan a ride" flow by setting destination and going to Home
      setPrefilledDestination(place.title);
      setActiveTab('home');
  };

  const renderContent = () => {
    switch (stage) {
      case AppStage.SPLASH:
        return <SplashScreen onFinish={() => setStage(AppStage.ONBOARDING)} />;
      case AppStage.ONBOARDING:
        return <Onboarding onFinish={() => setStage(AppStage.LOGIN)} />;
      case AppStage.LOGIN:
        return <Login onNext={handleLoginNext} />;
      case AppStage.OTP:
        return <OTP phone={tempPhone} onVerify={handleVerifyOTP} onBack={() => setStage(AppStage.LOGIN)} />;
      case AppStage.ROLE_SELECTION:
        return <RoleSelection onSelect={handleRoleSelect} />;
      case AppStage.MAIN_APP:
        return (
          <>
            <main className="min-h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl overflow-hidden">
               <TopBar 
                  user={user} 
                  onProfileClick={handleProfileClick}
                  onSearchSelect={handleSearchSelect} 
               />
               {/* This max-w-md simulates a mobile viewport on desktop screens */}
               <div className="h-full overflow-y-auto no-scrollbar">
                  {activeTab === 'home' && <HomeScreen user={user} onNavigateToRides={navigateToRides} prefilledDestination={prefilledDestination} />}
                  {activeTab === 'rides' && <RidesScreen onNavigateToHome={navigateToHome} initialSelectedRide={selectedRideForDetails} />}
                  {activeTab === 'center' && <CenterScreen user={user} onNavigateToHome={navigateToHome} onPlanRideToPlace={handlePlanRideToPlace} />}
                  {activeTab === 'inbox' && <InboxScreen onNavigate={handleNavigate} />}
                  {activeTab === 'wallet' && <WalletScreen onNavigate={handleNavigate} />}
                  
                  {/* Profile is an overlay view in this context, or simply rendered when activeTab is profile */}
                  {activeTab === 'profile' && <ProfileScreen user={user} onLogout={handleLogout} />}
               </div>
               {/* Hide BottomNav if we are in Profile or if you want it persistent, remove the check. 
                   The prompt says "Profile no longer occupies a tab", but keeping BottomNav visible allows quick exit.
                   However, BottomNav highlights based on activeTab. If activeTab is profile, nothing is highlighted. 
               */}
               <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            </main>
          </>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">
            {renderContent()}
        </div>
    </div>
  );
}