import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

function FilterSidebar({ filters, onFilterChange, onResetFilters, onApplyFilters, isMobile, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    destination: true,
    duration: true,
    price: true,
    category: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const destinations = [
    'Bali', 'Bromo', 'Labuan Bajo', 'Raja Ampat', 'Yogyakarta', 'Lombok',
    'Nusa Penida', 'Toraja', 'Manado', 'Bandung', 'Belitung', 'Derawan',
    'Sumba', 'Banyuwangi', 'Wakatobi', 'Flores', 'Dieng', 'Kepulauan Seribu',
    'Karimunjawa', 'Mentawai', 'Malang', 'Semeru'
  ];

  const categories = [
    { id: 'beach', name: 'Beach', icon: '🏖️' },
    { id: 'mountain', name: 'Mountain', icon: '⛰️' },
    { id: 'culture', name: 'Culture', icon: '🏛️' },
    { id: 'adventure', name: 'Adventure', icon: '🏄' },
    { id: 'diving', name: 'Diving', icon: '🤿' },
    { id: 'photography', name: 'Photography', icon: '📷' },
  ];

  const ratings = [
    { value: 4.5, label: '4.5+ Stars' },
    { value: 4.0, label: '4.0+ Stars' },
    { value: 3.5, label: '3.5+ Stars' },
  ];

  const handleDestinationChange = (destination) => {
    const newDestinations = filters.destinations.includes(destination)
      ? filters.destinations.filter((d) => d !== destination)
      : [...filters.destinations, destination];
    onFilterChange('destinations', newDestinations);
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange('categories', newCategories);
  };

  const handleRatingChange = (rating) => {
    onFilterChange('rating', filters.rating === rating ? null : rating);
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-secondary">{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-text-light" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-light" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const containerClasses = isMobile
    ? 'fixed inset-0 z-50 bg-white overflow-y-auto'
    : 'sticky top-24 bg-white rounded-2xl shadow-lg overflow-hidden';

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-secondary to-secondary-light">
        <div className="flex items-center gap-2 text-white">
          <Filter className="w-5 h-5" />
          <h3 className="font-bold text-lg">Filters</h3>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-gray-200">
        {/* Destination Filter */}
        <FilterSection title="Destination" sectionKey="destination">
          <div className="max-h-48 overflow-y-auto space-y-2">
            {destinations.map((destination) => (
              <label
                key={destination}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.destinations.includes(destination)}
                  onChange={() => handleDestinationChange(destination)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-light">{destination}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Duration Filter */}
        <FilterSection title="Duration (Days)" sectionKey="duration">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-light mb-2 block">
                Min Days: {filters.durationRange[0]}
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={filters.durationRange[0]}
                onChange={(e) =>
                  onFilterChange('durationRange', [
                    parseInt(e.target.value),
                    filters.durationRange[1],
                  ])
                }
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="text-xs text-text-light mb-2 block">
                Max Days: {filters.durationRange[1]}
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={filters.durationRange[1]}
                onChange={(e) =>
                  onFilterChange('durationRange', [
                    filters.durationRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full accent-primary"
              />
            </div>
          </div>
        </FilterSection>

        {/* Price Filter */}
        <FilterSection title="Price Range (USD)" sectionKey="price">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-light mb-2 block">
                Min Price: ${filters.priceRange[0]}
              </label>
              <input
                type="range"
                min="99"
                max="1499"
                step="50"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  onFilterChange('priceRange', [
                    parseInt(e.target.value),
                    filters.priceRange[1],
                  ])
                }
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="text-xs text-text-light mb-2 block">
                Max Price: ${filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="99"
                max="1499"
                step="50"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onFilterChange('priceRange', [
                    filters.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full accent-primary"
              />
            </div>
          </div>
        </FilterSection>

        {/* Category Filter */}
        <FilterSection title="Category" sectionKey="category">
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary focus:ring-2"
                />
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm text-text-light">{category.name}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Rating" sectionKey="rating">
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label
                key={rating.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating.value}
                  onChange={() => handleRatingChange(rating.value)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-light">{rating.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2 bg-gray-50">
        <button
          onClick={onApplyFilters}
          className="w-full bg-primary hover:bg-primary-light text-secondary font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Apply Filters
        </button>
        <button
          onClick={onResetFilters}
          className="w-full bg-white hover:bg-gray-100 text-secondary font-semibold py-3 rounded-xl border-2 border-gray-300 transition-all duration-300"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default FilterSidebar;
