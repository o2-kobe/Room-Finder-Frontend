import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapIcon } from 'lucide-react';
import { mockListings } from '../data/mockData';
import { ListingCard } from '../components/ListingCard';
import { CategoryToggle } from '../components/CategoryToggle';
import { BottomNavigation } from '../components/BottomNavigation';
import { DesktopNavigation } from '../components/DesktopNavigation';
import { MapView } from '../components/MapView';
import { ListingType } from '../types';

export default function HomePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<ListingType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = mockListings.filter((listing) => {
    const matchesCategory = category === 'all' || listing.type === category;
    const matchesSearch =
      searchQuery === '' ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.university.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredListings = filteredListings.filter(
    (listing) => listing.availability === 'available'
  );
  const recentlyUpdated = filteredListings
    .filter((listing) => listing.availability === 'recently-updated')
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <DesktopNavigation />
      
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl mb-4">Find Your Student Room</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by university or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </header>

      {/* Category Toggle */}
      <div className="px-4 py-4 flex justify-center">
        <CategoryToggle selected={category} onChange={setCategory} />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 space-y-8">
        {/* Featured Listings */}
        <section>
          <h2 className="text-xl mb-4">Available Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredListings.slice(0, 6).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Recently Updated */}
        {recentlyUpdated.length > 0 && (
          <section>
            <h2 className="text-xl mb-4">Recently Updated</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
              {recentlyUpdated.map((listing) => (
                <div
                  key={listing.id}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Map Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Explore on Map</h2>
            <button
              onClick={() => navigate('/map')}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <MapIcon className="w-5 h-5" />
              <span>View Full Map</span>
            </button>
          </div>
          <MapView listings={filteredListings} height="300px" />
        </section>

        {/* All Listings Link */}
        <div className="text-center pb-8">
          <button
            onClick={() => navigate('/explore')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors"
          >
            View All Listings
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}