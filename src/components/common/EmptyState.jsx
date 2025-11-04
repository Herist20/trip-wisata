import { Search, Package, Image, ShoppingCart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function EmptyGallery({ searchQuery, onReset }) {
  const { t } = useTranslation('common');
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <Image className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        {searchQuery ? t('emptyState.gallery.noPhotos') : t('emptyState.gallery.emptyGallery')}
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {searchQuery
          ? t('emptyState.gallery.noResults', { query: searchQuery })
          : t('emptyState.gallery.noPhotosCategory')}
      </p>
      {searchQuery && onReset && (
        <button
          onClick={onReset}
          className="btn-primary btn-animate inline-flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          {t('emptyState.gallery.resetSearch')}
        </button>
      )}
    </div>
  );
}

export function EmptyTours({ filters, onReset }) {
  const { t } = useTranslation('common');
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <Package className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        {t('emptyState.tours.noTours')}
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {t('emptyState.tours.noResults')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onReset && (
          <button
            onClick={onReset}
            className="btn-outline btn-animate inline-flex items-center gap-2"
          >
            {t('emptyState.tours.resetFilter')}
          </button>
        )}
        <Link
          to="/tours"
          className="btn-primary btn-animate inline-flex items-center gap-2"
        >
          <Package className="w-5 h-5" />
          {t('emptyState.tours.viewAllTours')}
        </Link>
      </div>
    </div>
  );
}

export function EmptyBooking() {
  const { t } = useTranslation('common');
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <ShoppingCart className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        {t('emptyState.booking.noSelection')}
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {t('emptyState.booking.description')}
      </p>
      <Link
        to="/tours"
        className="btn-primary btn-animate inline-flex items-center gap-2"
      >
        <Package className="w-5 h-5" />
        {t('emptyState.booking.exploreTours')}
      </Link>
    </div>
  );
}

export function EmptySearch({ query }) {
  const { t } = useTranslation('common');
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <Search className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        {t('emptyState.search.noResults', { query })}
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {t('emptyState.search.tryDifferent')}
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-text-light">{t('emptyState.search.suggestions')}</span>
        <button className="px-4 py-1 bg-gray-100 text-secondary rounded-full text-sm hover:bg-gray-200 transition-colors">
          {t('searchSuggestions.bali')}
        </button>
        <button className="px-4 py-1 bg-gray-100 text-secondary rounded-full text-sm hover:bg-gray-200 transition-colors">
          {t('searchSuggestions.beach')}
        </button>
        <button className="px-4 py-1 bg-gray-100 text-secondary rounded-full text-sm hover:bg-gray-200 transition-colors">
          {t('searchSuggestions.mountain')}
        </button>
      </div>
    </div>
  );
}

export function NetworkError({ onRetry }) {
  const { t } = useTranslation('common');
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        {t('emptyState.network.title')}
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {t('emptyState.network.description')}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary btn-animate inline-flex items-center gap-2"
        >
          {t('emptyState.network.retry')}
        </button>
      )}
    </div>
  );
}

export default {
  EmptyGallery,
  EmptyTours,
  EmptyBooking,
  EmptySearch,
  NetworkError,
};
