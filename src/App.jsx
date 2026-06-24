// ============================================================
//  TravelMate – Complete App in one file
//  Covers: Context API, useState, useRef, useEffect,
//          Container-Presenter, Error Boundary, localStorage,
//          SPA Routing (hash-based), Form Validation
// ============================================================

import React, {
  createContext, useContext, useState, useEffect, useRef,
  useCallback, Component
} from 'react';

// ─────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────
const DESTINATIONS = [
  { id: 1, name: 'Santorini', country: 'Greece', state: 'Aegean', price: 2400, rating: 4.9, reviews: 1842, duration: '7 days', tag: 'Island', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', desc: 'Iconic white-washed villages perched on volcanic cliffs above the sparkling Aegean Sea, famous for its breathtaking sunsets.', highlights: ['Oia Sunset', 'Black Sand Beach', 'Wine Tasting', 'Caldera Cruise'] },
  { id: 2, name: 'Kyoto', country: 'Japan', state: 'Kansai', price: 3100, rating: 4.8, reviews: 2301, duration: '10 days', tag: 'Culture', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', desc: 'Ancient temples, bamboo groves, and traditional tea houses blend seamlessly with modern Japan.', highlights: ['Arashiyama Bamboo', 'Fushimi Inari', 'Geisha District', 'Tea Ceremony'] },
  { id: 3, name: 'Machu Picchu', country: 'Peru', state: 'Cusco', price: 2800, rating: 4.9, reviews: 3120, duration: '8 days', tag: 'Adventure', img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80', desc: 'The legendary Incan citadel set high in the Andes mountains, shrouded in mist and mystery.', highlights: ['Sun Gate Trek', 'Huayna Picchu', 'Inca Trail', 'Sacred Valley'] },
  { id: 4, name: 'Maldives', country: 'Maldives', state: 'South Malé', price: 4500, rating: 5.0, reviews: 987, duration: '6 days', tag: 'Beach', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', desc: 'Overwater bungalows above turquoise lagoons in the most pristine tropical paradise on Earth.', highlights: ['Overwater Villa', 'Coral Diving', 'Dolphin Cruise', 'Sandbank Picnic'] },
  { id: 5, name: 'Amalfi Coast', country: 'Italy', state: 'Campania', price: 2900, rating: 4.7, reviews: 1654, duration: '9 days', tag: 'Scenic', img: 'https://images.unsplash.com/photo-1533606688076-b6f80a6b74e4?w=600&q=80', desc: 'Dramatic coastal cliffs, colourful villages, and the scent of lemon groves along Italy\'s most spectacular drive.', highlights: ['Positano Village', 'Boat Tour', 'Limoncello Making', 'Ravello Gardens'] },
  { id: 6, name: 'Bali', country: 'Indonesia', state: 'Bali', price: 1800, rating: 4.6, reviews: 4201, duration: '7 days', tag: 'Wellness', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', desc: 'Spiritual retreats, lush rice terraces, and ancient temples in the Island of the Gods.', highlights: ['Ubud Rice Terraces', 'Temple Ceremonies', 'Spa Retreat', 'Surfing Lessons'] },
  { id: 7, name: 'Patagonia', country: 'Argentina', state: 'Santa Cruz', price: 3400, rating: 4.8, reviews: 743, duration: '12 days', tag: 'Adventure', img: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=600&q=80', desc: 'Untamed wilderness at the end of the world — glaciers, granite towers, and vast open pampas.', highlights: ['Torres del Paine', 'Perito Moreno Glacier', 'Gaucho Ranch', 'Condor Watching'] },
  { id: 8, name: 'Marrakech', country: 'Morocco', state: 'Marrakech-Safi', price: 1600, rating: 4.5, reviews: 2876, duration: '5 days', tag: 'Culture', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80', desc: 'A sensory feast of vibrant souks, ancient medinas, and the fragrant aromas of spice markets.', highlights: ['Djemaa el-Fna', 'Souks Tour', 'Hammam Experience', 'Atlas Mountains'] },
];

const PACKAGES = [
  { id: 1, name: 'Greek Island Hopper', destinations: ['Santorini', 'Mykonos', 'Crete'], price: 3999, duration: '14 days', rating: 4.9, includes: ['Flights', 'Hotels', 'Ferries', 'Breakfast'], img: 'https://images.unsplash.com/photo-1519400197429-404ae3a4a8db?w=600&q=80', itinerary: ['Day 1-4: Santorini – Explore Oia & Caldera', 'Day 5-9: Mykonos – Beaches & Nightlife', 'Day 10-14: Crete – Minoan History & Gorge Hike'] },
  { id: 2, name: 'Japan Cherry Blossom Tour', destinations: ['Tokyo', 'Kyoto', 'Osaka'], price: 4800, duration: '16 days', rating: 4.8, includes: ['Flights', 'Ryokan Stays', 'JR Pass', 'Guided Tours'], img: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80', itinerary: ['Day 1-5: Tokyo – Shibuya & Shinjuku', 'Day 6-11: Kyoto – Temples & Geishas', 'Day 12-16: Osaka – Street Food Capital'] },
  { id: 3, name: 'Southeast Asia Explorer', destinations: ['Bali', 'Bangkok', 'Singapore'], price: 2799, duration: '18 days', rating: 4.7, includes: ['Flights', 'Hostels & Hotels', 'Activities', 'Transfers'], img: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&q=80', itinerary: ['Day 1-6: Bali – Temples & Rice Terraces', 'Day 7-12: Bangkok – Street Food & Temples', 'Day 13-18: Singapore – Gardens by the Bay'] },
  { id: 4, name: 'South American Odyssey', destinations: ['Machu Picchu', 'Patagonia', 'Buenos Aires'], price: 5600, duration: '21 days', rating: 4.9, includes: ['Flights', 'Lodges', 'Trekking Guide', 'All Meals'], img: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=600&q=80', itinerary: ['Day 1-7: Peru – Inca Trail & Machu Picchu', 'Day 8-14: Patagonia – Torres del Paine', 'Day 15-21: Buenos Aires – Tango & Culture'] },
];

const TAGS = ['All', 'Island', 'Culture', 'Adventure', 'Beach', 'Scenic', 'Wellness'];

// ─────────────────────────────────────────
//  CONTEXT (State Management)
// ─────────────────────────────────────────
const TravelContext = createContext(null);

function TravelProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cart, setCart] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('tm_favorites');
      const storedBookings = localStorage.getItem('tm_bookings');
      const storedUser = localStorage.getItem('tm_user');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      if (storedBookings) setBookings(JSON.parse(storedBookings));
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (e) { /* ignore parse errors */ }
  }, []);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('tm_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist bookings
  useEffect(() => {
    localStorage.setItem('tm_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const toggleFavorite = useCallback((dest) => {
    setFavorites(prev =>
      prev.find(f => f.id === dest.id)
        ? prev.filter(f => f.id !== dest.id)
        : [...prev, dest]
    );
  }, []);

  const addBooking = useCallback((booking) => {
    const newBooking = { ...booking, id: Date.now(), status: 'Confirmed', bookedAt: new Date().toISOString() };
    setBookings(prev => {
      const updated = [newBooking, ...prev];
      localStorage.setItem('tm_bookings', JSON.stringify(updated));
      return updated;
    });
    return newBooking;
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('tm_user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('tm_user');
  }, []);

  // Derived state
  const totalFavorites = favorites.length;
  const totalBookings = bookings.length;
  const upcomingTrips = bookings.filter(b => new Date(b.travelDate) >= new Date());

  return (
    <TravelContext.Provider value={{
      user, login, logout,
      favorites, toggleFavorite, totalFavorites,
      bookings, addBooking, totalBookings,
      upcomingTrips,
      cart, setCart,
    }}>
      {children}
    </TravelContext.Provider>
  );
}

const useTravel = () => {
  const ctx = useContext(TravelContext);
  if (!ctx) throw new Error('useTravel must be used within TravelProvider');
  return ctx;
};

// ─────────────────────────────────────────
//  ERROR BOUNDARY
// ─────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__inner">
            <div className="error-boundary__icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>We hit an unexpected error. Please refresh the page to continue exploring.</p>
            <button className="btn btn--coral" onClick={() => { this.setState({ hasError: false }); window.location.hash = '#/'; }}>
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────
//  HASH ROUTER (SPA Routing – no library needed)
// ─────────────────────────────────────────
function useHashRouter() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return hash;
}

function navigate(path) {
  window.location.hash = path;
}

function ProtectedRoute({ children }) {
  const { user } = useTravel();
  useEffect(() => {
    if (!user) navigate('#/login');
  }, [user]);
  if (!user) return null;
  return children;
}

// ─────────────────────────────────────────
//  SHARED UI COMPONENTS
// ─────────────────────────────────────────

// Star rating display
function Stars({ rating }) {
  return (
    <span className="stars">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span className="stars__num">{rating}</span>
    </span>
  );
}

// Toast notification
function Toast({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return <div className="toast" role="alert">{msg}</div>;
}

// Modal wrapper
function Modal({ children, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────
function Navbar({ currentHash }) {
  const { user, logout, totalFavorites } = useTravel();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Home', hash: '#/' },
    { label: 'Destinations', hash: '#/destinations' },
    { label: 'Packages', hash: '#/packages' },
    { label: 'Favorites', hash: '#/favorites', badge: totalFavorites },
  ];

  const isActive = (h) => currentHash === h || (h !== '#/' && currentHash.startsWith(h));

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => navigate('#/')}>
          <span className="navbar__logo-mark">✈</span> TravelMate
        </button>
        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <button
              key={l.hash}
              className={`navbar__link ${isActive(l.hash) ? 'navbar__link--active' : ''}`}
              onClick={() => { navigate(l.hash); setMenuOpen(false); }}
            >
              {l.label}
              {l.badge > 0 && <span className="navbar__badge">{l.badge}</span>}
            </button>
          ))}
          {user ? (
            <>
              <button className="navbar__link" onClick={() => { navigate('#/dashboard'); setMenuOpen(false); }}>Dashboard</button>
              <button className="btn btn--outline-light" onClick={logout}>Logout</button>
            </>
          ) : (
            <button className="btn btn--coral" onClick={() => { navigate('#/login'); setMenuOpen(false); }}>Sign In</button>
          )}
        </div>
        <button className="navbar__burger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────
//  PRESENTER: Destination Card (Dumb Component)
// ─────────────────────────────────────────
function DestinationCard({ dest, isFav, onToggleFav, onView }) {
  return (
    <article className="dest-card" onClick={onView} tabIndex={0} onKeyDown={e => e.key === 'Enter' && onView()}>
      <div className="dest-card__img-wrap">
        <img src={dest.img} alt={dest.name} className="dest-card__img" loading="lazy" />
        <span className="dest-card__tag">{dest.tag}</span>
        <button
          className={`dest-card__fav ${isFav ? 'dest-card__fav--active' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleFav(dest); }}
          aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="dest-card__body">
        <p className="dest-card__country">{dest.country} · {dest.duration}</p>
        <h3 className="dest-card__name">{dest.name}</h3>
        <Stars rating={dest.rating} />
        <p className="dest-card__reviews">{dest.reviews.toLocaleString()} reviews</p>
        <div className="dest-card__footer">
          <span className="dest-card__price">From <strong>${dest.price.toLocaleString()}</strong></span>
          <button className="btn btn--coral-sm" onClick={e => { e.stopPropagation(); navigate('#/booking'); sessionStorage.setItem('tm_booking_dest', JSON.stringify(dest)); }}>Book Now</button>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────
//  CONTAINER: Destinations (Smart Component)
// ─────────────────────────────────────────
function DestinationContainer({ filterTag, searchQuery, onView }) {
  const { favorites, toggleFavorite } = useTravel();
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate async data fetch
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let results = [...DESTINATIONS];
      if (filterTag && filterTag !== 'All') results = results.filter(d => d.tag === filterTag);
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        results = results.filter(d =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tag.toLowerCase().includes(q)
        );
      }
      setDisplayed(results);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filterTag, searchQuery]);

  if (loading) return <div className="loading-grid">{[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}</div>;
  if (!displayed.length) return (
    <div className="empty-state">
      <div className="empty-state__icon">🗺️</div>
      <h3>No destinations found</h3>
      <p>Try adjusting your search or filter.</p>
    </div>
  );

  return (
    <div className="dest-grid">
      {displayed.map(dest => (
        <DestinationCard
          key={dest.id}
          dest={dest}
          isFav={!!favorites.find(f => f.id === dest.id)}
          onToggleFav={toggleFavorite}
          onView={() => onView(dest)}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
//  PAGE: HOME
// ─────────────────────────────────────────
function HomePage() {
  const searchRef = useRef();  // Uncontrolled component
  const [searchVal, setSearchVal] = useState('');
  const [selectedDest, setSelectedDest] = useState(null);

  const handleSearch = () => {
    const val = searchRef.current.value.trim();
    setSearchVal(val);
    if (val) navigate('#/destinations');
    sessionStorage.setItem('tm_search', val);
  };

  const heroStats = [
    { num: '150+', label: 'Destinations' },
    { num: '50K+', label: 'Happy Travelers' },
    { num: '4.9★', label: 'Average Rating' },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">✈ Curated Travel Experiences</p>
          <h1 className="hero__heading">
            Discover the World's<br />
            <span className="hero__heading--accent">Hidden Wonders</span>
          </h1>
          <p className="hero__sub">From volcanic islands to ancient temples — hand-picked journeys that go beyond the ordinary.</p>
          <div className="hero__search">
            <div className="hero__search-wrap">
              <span className="hero__search-icon">🔍</span>
              {/* Uncontrolled ref-based search input */}
              <input
                ref={searchRef}
                type="text"
                className="hero__search-input"
                placeholder="Search destinations…"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <button className="btn btn--coral hero__search-btn" onClick={handleSearch}>Explore</button>
            </div>
          </div>
          <div className="hero__chips">
            {['Beach', 'Adventure', 'Culture', 'Island'].map(t => (
              <button key={t} className="hero__chip" onClick={() => { sessionStorage.setItem('tm_filter', t); navigate('#/destinations'); }}>{t}</button>
            ))}
          </div>
          <div className="hero__stats">
            {heroStats.map(s => (
              <div key={s.label} className="hero__stat">
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__img-side">
          <div className="hero__card-float hero__card-float--1">
            <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&q=80" alt="Santorini" />
            <span>Santorini, Greece</span>
          </div>
          <div className="hero__card-float hero__card-float--2">
            <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300&q=80" alt="Maldives" />
            <span>Maldives</span>
          </div>
          <div className="hero__card-float hero__card-float--3">
            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=80" alt="Kyoto" />
            <span>Kyoto, Japan</span>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section">
        <div className="section__header">
          <h2>Popular Destinations</h2>
          <button className="btn btn--ghost" onClick={() => navigate('#/destinations')}>View all →</button>
        </div>
        <ErrorBoundary>
          <DestinationContainer
            filterTag="All"
            searchQuery=""
            onView={setSelectedDest}
          />
        </ErrorBoundary>
      </section>

      {/* Featured Packages */}
      <section className="section section--sand">
        <div className="section__header">
          <h2>Featured Packages</h2>
          <button className="btn btn--ghost" onClick={() => navigate('#/packages')}>See all →</button>
        </div>
        <div className="pkg-grid">
          {PACKAGES.slice(0, 3).map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {selectedDest && (
        <Modal onClose={() => setSelectedDest(null)}>
          <DestinationDetail dest={selectedDest} />
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
//  DESTINATION DETAIL (in Modal)
// ─────────────────────────────────────────
function DestinationDetail({ dest }) {
  const { favorites, toggleFavorite, user } = useTravel();
  const isFav = !!favorites.find(f => f.id === dest.id);
  return (
    <div className="dest-detail">
      <div className="dest-detail__img-wrap">
        <img src={dest.img} alt={dest.name} className="dest-detail__img" />
        <span className="dest-card__tag">{dest.tag}</span>
      </div>
      <div className="dest-detail__body">
        <div className="dest-detail__top">
          <div>
            <p className="dest-card__country">{dest.country} · {dest.duration}</p>
            <h2 className="dest-detail__name">{dest.name}</h2>
          </div>
          <button className={`dest-card__fav dest-card__fav--lg ${isFav ? 'dest-card__fav--active' : ''}`} onClick={() => toggleFavorite(dest)}>
            {isFav ? '♥' : '♡'}
          </button>
        </div>
        <Stars rating={dest.rating} />
        <p className="dest-detail__desc">{dest.desc}</p>
        <h4 className="dest-detail__hl-title">Highlights</h4>
        <ul className="dest-detail__highlights">
          {dest.highlights.map(h => <li key={h}><span>✓</span>{h}</li>)}
        </ul>
        <div className="dest-detail__footer">
          <p className="dest-detail__price">From <strong>${dest.price.toLocaleString()}</strong> / person</p>
          <button className="btn btn--coral" onClick={() => { sessionStorage.setItem('tm_booking_dest', JSON.stringify(dest)); navigate(user ? '#/booking' : '#/login'); }}>
            {user ? 'Book This Trip' : 'Sign In to Book'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  PAGE: DESTINATIONS
// ─────────────────────────────────────────
function DestinationsPage() {
  const [filterTag, setFilterTag] = useState(sessionStorage.getItem('tm_filter') || 'All');
  const [searchQuery, setSearchQuery] = useState(sessionStorage.getItem('tm_search') || '');
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedDest, setSelectedDest] = useState(null);

  useEffect(() => { sessionStorage.removeItem('tm_filter'); sessionStorage.removeItem('tm_search'); }, []);

  return (
    <div className="page">
      <div className="page__hero page__hero--sm">
        <h1>All Destinations</h1>
        <p>Explore {DESTINATIONS.length} incredible places worldwide</p>
      </div>
      <div className="page__body">
        <div className="dest-controls">
          <div className="dest-controls__search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search destinations…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setSearchQuery(searchInput)}
              className="dest-controls__input"
            />
            <button className="btn btn--coral-sm" onClick={() => setSearchQuery(searchInput)}>Search</button>
          </div>
          <div className="dest-controls__tags">
            {TAGS.map(t => (
              <button key={t} className={`tag-btn ${filterTag === t ? 'tag-btn--active' : ''}`} onClick={() => setFilterTag(t)}>{t}</button>
            ))}
          </div>
        </div>
        <ErrorBoundary>
          <DestinationContainer filterTag={filterTag} searchQuery={searchQuery} onView={setSelectedDest} />
        </ErrorBoundary>
      </div>
      {selectedDest && <Modal onClose={() => setSelectedDest(null)}><DestinationDetail dest={selectedDest} /></Modal>}
    </div>
  );
}

// ─────────────────────────────────────────
//  PACKAGE CARD (Presenter)
// ─────────────────────────────────────────
function PackageCard({ pkg }) {
  const [expanded, setExpanded] = useState(false);
  const { user } = useTravel();
  return (
    <article className="pkg-card">
      <div className="pkg-card__img-wrap">
        <img src={pkg.img} alt={pkg.name} className="pkg-card__img" loading="lazy" />
        <span className="pkg-card__duration">{pkg.duration}</span>
      </div>
      <div className="pkg-card__body">
        <h3 className="pkg-card__name">{pkg.name}</h3>
        <p className="pkg-card__dests">📍 {pkg.destinations.join(' → ')}</p>
        <Stars rating={pkg.rating} />
        <div className="pkg-card__includes">
          {pkg.includes.map(i => <span key={i} className="include-chip">{i}</span>)}
        </div>
        {expanded && (
          <ul className="pkg-card__itinerary">
            {pkg.itinerary.map(d => <li key={d}>{d}</li>)}
          </ul>
        )}
        <button className="btn btn--ghost pkg-card__toggle" onClick={() => setExpanded(o => !o)}>
          {expanded ? '↑ Hide Itinerary' : '↓ View Itinerary'}
        </button>
        <div className="pkg-card__footer">
          <span className="dest-card__price">From <strong>${pkg.price.toLocaleString()}</strong></span>
          <button className="btn btn--coral" onClick={() => { sessionStorage.setItem('tm_booking_pkg', JSON.stringify(pkg)); navigate(user ? '#/booking' : '#/login'); }}>
            Book Package
          </button>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────
//  PAGE: PACKAGES
// ─────────────────────────────────────────
function PackagesPage() {
  return (
    <div className="page">
      <div className="page__hero page__hero--sm">
        <h1>Travel Packages</h1>
        <p>All-inclusive curated journeys — flights, stays, and experiences</p>
      </div>
      <div className="page__body">
        <div className="pkg-grid pkg-grid--full">
          {PACKAGES.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  PAGE: BOOKING (Controlled Form)
// ─────────────────────────────────────────
function BookingPage() {
  const { addBooking, user } = useTravel();
  const [toast, setToast] = useState(null);

  const preloadDest = (() => {
    try { return JSON.parse(sessionStorage.getItem('tm_booking_dest') || 'null'); } catch { return null; }
  })();
  const preloadPkg = (() => {
    try { return JSON.parse(sessionStorage.getItem('tm_booking_pkg') || 'null'); } catch { return null; }
  })();

  // Controlled form state
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    travelers: '1',
    travelDate: '',
    destination: preloadDest?.name || preloadPkg?.name || '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
    if (!form.travelers || form.travelers < 1) errs.travelers = 'At least 1 traveler';
    if (!form.travelDate) errs.travelDate = 'Travel date is required';
    else if (new Date(form.travelDate) <= new Date()) errs.travelDate = 'Date must be in the future';
    if (!form.destination.trim()) errs.destination = 'Destination is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const booking = addBooking({ ...form, price: preloadDest?.price || preloadPkg?.price || 0, img: preloadDest?.img || preloadPkg?.img || '' });
    setSubmitted(booking);
    sessionStorage.removeItem('tm_booking_dest');
    sessionStorage.removeItem('tm_booking_pkg');
    setToast('🎉 Booking confirmed!');
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="booking-success">
          <div className="booking-success__icon">✈️</div>
          <h2>Booking Confirmed!</h2>
          <p>Your trip to <strong>{submitted.destination}</strong> on <strong>{submitted.travelDate}</strong> is booked.</p>
          <p className="booking-success__id">Booking ID: <code>TM-{submitted.id}</code></p>
          <div className="booking-success__actions">
            <button className="btn btn--coral" onClick={() => navigate('#/dashboard')}>View Dashboard</button>
            <button className="btn btn--ghost" onClick={() => { setSubmitted(null); setForm({ name: user?.name || '', email: user?.email || '', phone: '', travelers: '1', travelDate: '', destination: '', notes: '' }); }}>Book Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      <div className="page__hero page__hero--sm">
        <h1>Book Your Trip</h1>
        <p>Fill in your details and we'll take care of the rest</p>
      </div>
      <div className="page__body">
        <div className="booking-layout">
          {(preloadDest || preloadPkg) && (
            <div className="booking-preview">
              <img src={(preloadDest || preloadPkg).img} alt="" className="booking-preview__img" />
              <div className="booking-preview__info">
                <p className="booking-preview__label">You're booking</p>
                <h3>{(preloadDest || preloadPkg).name}</h3>
                <p className="dest-card__price">From <strong>${((preloadDest || preloadPkg).price || 0).toLocaleString()}</strong> / person</p>
              </div>
            </div>
          )}
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bk-name">Full Name</label>
                <input id="bk-name" type="text" value={form.name} onChange={e => set('name', e.target.value)} className={errors.name ? 'input--error' : ''} placeholder="Jane Doe" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="bk-email">Email</label>
                <input id="bk-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} className={errors.email ? 'input--error' : ''} placeholder="jane@example.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bk-phone">Phone Number</label>
                <input id="bk-phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className={errors.phone ? 'input--error' : ''} placeholder="+1 234 567 8900" />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="bk-travelers">Number of Travelers</label>
                <input id="bk-travelers" type="number" min="1" max="20" value={form.travelers} onChange={e => set('travelers', e.target.value)} className={errors.travelers ? 'input--error' : ''} />
                {errors.travelers && <span className="form-error">{errors.travelers}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bk-dest">Destination</label>
                <input id="bk-dest" type="text" value={form.destination} onChange={e => set('destination', e.target.value)} className={errors.destination ? 'input--error' : ''} placeholder="e.g. Santorini, Greece" />
                {errors.destination && <span className="form-error">{errors.destination}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="bk-date">Travel Date</label>
                <input id="bk-date" type="date" value={form.travelDate} onChange={e => set('travelDate', e.target.value)} className={errors.travelDate ? 'input--error' : ''} min={new Date().toISOString().split('T')[0]} />
                {errors.travelDate && <span className="form-error">{errors.travelDate}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bk-notes">Special Requests (optional)</label>
              <textarea id="bk-notes" rows="3" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Dietary requirements, accessibility needs, preferences…" />
            </div>
            <button type="submit" className="btn btn--coral btn--full">Confirm Booking ✈</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  PAGE: FAVORITES
// ─────────────────────────────────────────
function FavoritesPage() {
  const { favorites, toggleFavorite } = useTravel();
  const [selectedDest, setSelectedDest] = useState(null);

  if (!favorites.length) {
    return (
      <div className="page">
        <div className="page__hero page__hero--sm"><h1>My Favorites</h1></div>
        <div className="page__body">
          <div className="empty-state">
            <div className="empty-state__icon">💛</div>
            <h3>No saved destinations yet</h3>
            <p>Tap the heart on any destination to save it here.</p>
            <button className="btn btn--coral" onClick={() => navigate('#/destinations')}>Browse Destinations</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page__hero page__hero--sm">
        <h1>My Favorites</h1>
        <p>{favorites.length} saved destination{favorites.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="page__body">
        <div className="dest-grid">
          {favorites.map(dest => (
            <DestinationCard key={dest.id} dest={dest} isFav={true} onToggleFav={toggleFavorite} onView={() => setSelectedDest(dest)} />
          ))}
        </div>
      </div>
      {selectedDest && <Modal onClose={() => setSelectedDest(null)}><DestinationDetail dest={selectedDest} /></Modal>}
    </div>
  );
}

// ─────────────────────────────────────────
//  PAGE: DASHBOARD
// ─────────────────────────────────────────
function DashboardPage() {
  const { user, bookings, upcomingTrips, favorites, logout } = useTravel();

  return (
    <div className="page">
      <div className="page__hero page__hero--sm">
        <h1>Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p>Here's your travel overview</p>
      </div>
      <div className="page__body">
        <div className="dashboard-stats">
          {[
            { icon: '✈️', label: 'Total Bookings', val: bookings.length },
            { icon: '🗓️', label: 'Upcoming Trips', val: upcomingTrips.length },
            { icon: '💛', label: 'Saved Places', val: favorites.length },
          ].map(s => (
            <div key={s.label} className="dashboard-stat-card">
              <div className="dashboard-stat-card__icon">{s.icon}</div>
              <div className="dashboard-stat-card__num">{s.val}</div>
              <div className="dashboard-stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="dashboard-section-title">Booking History</h2>
        {!bookings.length ? (
          <div className="empty-state">
            <div className="empty-state__icon">📋</div>
            <h3>No bookings yet</h3>
            <button className="btn btn--coral" onClick={() => navigate('#/destinations')}>Start Exploring</button>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map(b => (
              <div key={b.id} className="booking-item">
                {b.img && <img src={b.img} alt={b.destination} className="booking-item__img" />}
                <div className="booking-item__info">
                  <h4>{b.destination}</h4>
                  <p>📅 {b.travelDate} · 👥 {b.travelers} traveler{b.travelers > 1 ? 's' : ''}</p>
                  <p>✉ {b.email}</p>
                </div>
                <div className="booking-item__right">
                  <span className="booking-item__status">{b.status}</span>
                  <p className="booking-item__id">#{b.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="dashboard-actions">
          <button className="btn btn--ghost" onClick={logout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  PAGE: LOGIN / REGISTER
// ─────────────────────────────────────────
function LoginPage() {
  const { login } = useTravel();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(e => ({ ...e, [f]: '' })); };

  const validate = () => {
    const errs = {};
    if (mode === 'register' && !form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // Simulated auth
    login({ name: form.name || form.email.split('@')[0], email: form.email });
    setToast(mode === 'register' ? '🎉 Account created!' : '👋 Welcome back!');
    setTimeout(() => navigate('#/dashboard'), 1000);
  };

  return (
    <div className="page">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-card__logo">✈ TravelMate</div>
          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`} onClick={() => setMode('login')}>Sign In</button>
            <button className={`auth-tab ${mode === 'register' ? 'auth-tab--active' : ''}`} onClick={() => setMode('register')}>Register</button>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            {mode === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Doe" className={errors.name ? 'input--error' : ''} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" className={errors.email ? 'input--error' : ''} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" className={errors.password ? 'input--error' : ''} />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn--coral btn--full">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <p className="auth-note">This is a demo — no real data is stored.</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">✈ TravelMate</span>
          <p>Curated journeys for curious travellers.</p>
        </div>
        <div className="footer__links">
          {[['Home', '#/'], ['Destinations', '#/destinations'], ['Packages', '#/packages'], ['Favorites', '#/favorites']].map(([l, h]) => (
            <button key={h} className="footer__link" onClick={() => navigate(h)}>{l}</button>
          ))}
        </div>
        <p className="footer__copy">© 2025 TravelMate. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────
//  APP ROOT
// ─────────────────────────────────────────
export default function App() {
  const hash = useHashRouter();

  const renderPage = () => {
    if (hash === '#/' || hash === '') return <HomePage />;
    if (hash === '#/destinations') return <DestinationsPage />;
    if (hash === '#/packages') return <PackagesPage />;
    if (hash === '#/favorites') return <FavoritesPage />;
    if (hash === '#/login') return <LoginPage />;
    if (hash === '#/booking') return <ProtectedRoute><BookingPage /></ProtectedRoute>;
    if (hash === '#/dashboard') return <ProtectedRoute><DashboardPage /></ProtectedRoute>;
    // Dynamic route /destination/:id
    const destMatch = hash.match(/^#\/destination\/(\d+)$/);
    if (destMatch) {
      const dest = DESTINATIONS.find(d => d.id === parseInt(destMatch[1]));
      return dest ? <div className="page"><div className="page__body"><DestinationDetail dest={dest} /></div></div> : <NotFound />;
    }
    return <NotFound />;
  };

  return (
    <TravelProvider>
      <AppInner hash={hash} renderPage={renderPage} />
    </TravelProvider>
  );
}

function NotFound() {
  return (
    <div className="empty-state" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="empty-state__icon">🗺️</div>
      <h2>Page Not Found</h2>
      <button className="btn btn--coral" onClick={() => navigate('#/')}>Back to Home</button>
    </div>
  );
}

function AppInner({ hash, renderPage }) {
  return (
    <div className="app">
      <Navbar currentHash={hash} />
      <main className="main">
        <ErrorBoundary>
          {renderPage()}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}