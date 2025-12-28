import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, User as UserIcon, X, MapPin, Clock, ArrowUpRight, History } from 'lucide-react';
import { User, SearchResult } from '../types';
import { MOCK_RECENT_SEARCHES, MOCK_LOCATIONS_SEARCH, MOCK_ACTIONS_SEARCH, MOCK_RIDES, MOCK_PEOPLE_SEARCH } from '../constants';

interface TopBarProps {
  user: User | null;
  onProfileClick: () => void;
  onSearchSelect: (result: SearchResult) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ user, onProfileClick, onSearchSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleBlur = () => {
    // Delay closing to allow clicks on results to register
    setTimeout(() => {
      // Check if document active element is body or null implies click outside? 
      // Actually we rely on the click handler of the result item
    }, 200);
  };

  const handleResultClick = (result: SearchResult) => {
    setIsActive(false);
    setQuery('');
    onSearchSelect(result);
  };

  // Filter Logic
  const filteredResults = useMemo(() => {
    if (!query) return { 
        recent: MOCK_RECENT_SEARCHES, 
        actions: MOCK_ACTIONS_SEARCH,
        locations: [],
        rides: [],
        people: []
    };

    const q = query.toLowerCase();

    // Locations
    const locations = MOCK_LOCATIONS_SEARCH.filter(l => 
        l.title.toLowerCase().includes(q) || l.subtitle?.toLowerCase().includes(q)
    ).slice(0, 3);

    // Rides (from constants + mapped to SearchResult)
    const rides: SearchResult[] = MOCK_RIDES.filter(r => 
        r.to.toLowerCase().includes(q) || 
        r.from.toLowerCase().includes(q) || 
        r.providerName.toLowerCase().includes(q)
    ).map(r => ({
        id: r.id,
        type: 'ride' as const,
        title: `${r.from} → ${r.to}`,
        subtitle: `${r.time} • with ${r.providerName}`,
        data: r
    })).slice(0, 3);

    // People
    const people = MOCK_PEOPLE_SEARCH.filter(p => 
        p.title.toLowerCase().includes(q)
    ).slice(0, 3);

    // Actions
    const actions = MOCK_ACTIONS_SEARCH.filter(a => 
        a.title.toLowerCase().includes(q)
    );

    return { locations, rides, people, actions, recent: [] };
  }, [query]);

  // Section Component
  const ResultSection = ({ title, items }: { title: string, items: SearchResult[] }) => {
    if (items.length === 0) return null;
    return (
        <div className="mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">{title}</h3>
            {items.map(item => (
                <div 
                    key={item.id}
                    onClick={() => handleResultClick(item)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
                >
                    <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                        {item.type === 'location' && <MapPin size={16}/>}
                        {item.type === 'ride' && <Clock size={16}/>}
                        {item.type === 'person' && <UserIcon size={16}/>}
                        {item.type === 'action' && <ArrowUpRight size={16}/>}
                        {item.type === 'recent' && <History size={16}/>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                        {item.subtitle && <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
  };

  return (
    <>
        {/* Backdrop Overlay */}
        {isActive && (
            <div 
                className="fixed inset-0 bg-white/90 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                onClick={() => setIsActive(false)}
            ></div>
        )}

        {/* Search Bar Container */}
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isActive ? 'bg-white shadow-none h-full overflow-y-auto' : 'bg-white border-b border-gray-100 h-[64px] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]'}`}>
            <div className="max-w-md mx-auto px-4 pt-3">
                <div className="flex items-center gap-3 relative">
                    {/* Input Field */}
                    <div className={`flex-1 bg-gray-100 rounded-3xl flex items-center px-4 transition-all duration-300 ${isActive ? 'h-12 shadow-sm ring-2 ring-blue-50 bg-white' : 'h-10'}`}>
                        <Search size={18} className={`mr-2 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        <input 
                            ref={inputRef}
                            type="text"
                            placeholder="Search routes, places, rides, or people..."
                            className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-900 placeholder-gray-400 w-full h-full"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsActive(true)}
                        />
                        {query && (
                            <button onClick={handleClear} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition-colors">
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    {/* Actions (Only visible when NOT active) */}
                    {!isActive && (
                        <div className="flex items-center gap-1 animate-in fade-in duration-200">
                            <button 
                                onClick={onProfileClick}
                                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors ml-1"
                            >
                                <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm border border-blue-200">
                                {user?.name?.charAt(0) || <UserIcon size={16} />}
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Cancel Button (Only active) */}
                    {isActive && (
                        <button 
                            onClick={() => setIsActive(false)} 
                            className="text-sm font-medium text-blue-600 animate-in slide-in-from-right-4 duration-200 whitespace-nowrap"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {isActive && (
                    <div className="mt-6 pb-20 animate-in fade-in slide-in-from-top-2 duration-300">
                        {!query && (
                            <>
                                <ResultSection title="Recent" items={filteredResults.recent} />
                                <ResultSection title="Suggested Actions" items={filteredResults.actions} />
                            </>
                        )}

                        {query && (
                            <>
                                <ResultSection title="Locations" items={filteredResults.locations} />
                                <ResultSection title="Rides" items={filteredResults.rides} />
                                <ResultSection title="People" items={filteredResults.people} />
                                <ResultSection title="Actions" items={filteredResults.actions} />
                                
                                {/* No Results State */}
                                {filteredResults.locations.length === 0 && 
                                 filteredResults.rides.length === 0 && 
                                 filteredResults.people.length === 0 &&
                                 filteredResults.actions.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-gray-400 text-sm">No matches found.</p>
                                        <p className="text-gray-300 text-xs mt-1">Try changing pickup or destination.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    </>
  );
};