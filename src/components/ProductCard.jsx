'use client';

import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    if (!price) return '나눔';
    return parseInt(price).toLocaleString('ko-KR') + '원';
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const getStatusBadge = () => {
    if (product.status === 'sold') {
      return (
        <div className="absolute top-2 left-2 bg-slate-800/80 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
          판매완료
        </div>
      );
    }
    if (product.status === 'reserved') {
      return (
        <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
          예약중
        </div>
      );
    }
    return null;
  };

  const getImageUrl = () => {
    if (product.imageUrl) return product.imageUrl;
    if (product.imagePreview) return product.imagePreview;
    if (product.images && product.images.length > 0) return product.images[0].url;
    return null;
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer">
        {/* Minimal Product Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 hover:border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          
          {/* Small Icon-like Image */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            {getImageUrl() ? (
              <Image
                src={getImageUrl()}
                alt={product.title}
                fill
                className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Status Badge */}
            {getStatusBadge()}
          </div>

          {/* Minimal Product Info */}
          <div className="text-center space-y-2">
            {/* Title */}
            <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">
              {product.title}
            </h3>

            {/* Price */}
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(product.price)}
            </p>

            {/* Location and Time - Simplified */}
            <div className="flex items-center justify-center space-x-3 text-xs text-slate-500">
              <span className="truncate">{product.location}</span>
              <span>•</span>
              <span>{formatTimeAgo(product.createdAt)}</span>
            </div>

            {/* Minimal Stats */}
            <div className="flex items-center justify-center space-x-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{Math.floor(Math.random() * 50) + 10}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{Math.floor(Math.random() * 15) + 1}</span>
              </div>
            </div>
          </div>

          {/* Floating Heart Button - Smaller */}
          <button 
            className="absolute top-3 right-3 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Heart click logic here
            }}
          >
            <svg className="w-3 h-3 text-slate-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 