// Reusable Skeleton Loading Components

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-72 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* Dates */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Price and button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-32"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGallery() {
  return (
    <div className="break-inside-avoid animate-pulse">
      <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl h-64 w-full bg-[length:200%_100%] animate-shimmer"></div>
    </div>
  );
}

export function SkeletonTestimonial() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded"
          style={{ width: i === lines - 1 ? '75%' : '100%' }}
        ></div>
      ))}
    </div>
  );
}

export function SkeletonButton({ className = '' }) {
  return (
    <div className={`h-12 bg-gray-200 rounded-xl animate-pulse ${className}`}></div>
  );
}
