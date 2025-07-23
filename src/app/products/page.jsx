'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// useSearchParams를 사용하는 컴포넌트를 별도로 분리
const ProductsContent = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');

  const categories = ['전체', '디지털기기', '가구/인테리어', '여성의류', '남성의류', '생활가전', '유아동', '도서/음반', '스포츠/레저'];
  const sortOptions = ['최신순', '인기순', '가격 낮은순', '가격 높은순'];

  // 임시 상품 데이터
  const mockProducts = [
    {
      id: 1,
      title: '아이폰 14 Pro 256GB',
      price: 950000,
      location: '강남구 역삼동',
      timeAgo: '1시간 전',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
      likes: 12,
      category: '디지털기기'
    },
    {
      id: 2,
      title: '삼성 갤럭시 S23',
      price: 700000,
      location: '서초구 방배동',
      timeAgo: '2시간 전',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      likes: 8,
      category: '디지털기기'
    },
    {
      id: 3,
      title: '맥북 프로 13인치',
      price: 1200000,
      location: '송파구 잠실동',
      timeAgo: '3시간 전',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
      likes: 24,
      category: '디지털기기'
    },
    {
      id: 4,
      title: '북유럽 스타일 책상',
      price: 150000,
      location: '마포구 상암동',
      timeAgo: '4시간 전',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
      likes: 6,
      category: '가구/인테리어'
    },
    {
      id: 5,
      title: '나이키 에어포스 1',
      price: 80000,
      location: '용산구 이태원동',
      timeAgo: '5시간 전',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
      likes: 15,
      category: '여성의류'
    },
    {
      id: 6,
      title: '다이슨 청소기',
      price: 250000,
      location: '종로구 종로1가',
      timeAgo: '6시간 전',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
      likes: 9,
      category: '생활가전'
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      (selectedCategory === '전체' || product.category === selectedCategory) &&
      (searchTerm === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const formatPrice = (price) => {
    return price.toLocaleString() + '원';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🥕</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">당근마켓</span>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <Link href="/products" className="text-orange-500 font-medium">
                중고거래
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-gray-900 font-medium">
                채팅
              </Link>
              <Link href="/my" className="text-gray-600 hover:text-gray-900 font-medium">
                나의 당근
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                로그인
              </button>
              <Link href="/sell" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                글쓰기
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">중고거래</h1>
          <p className="text-gray-600">우리 동네 중고 거래 상품을 확인해보세요!</p>
        </div>

        {/* 검색 바 */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="상품명을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 간단한 필터 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              총 {filteredProducts.length}개의 상품
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 상품 목록 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-gray-900 mb-3">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{product.location}</span>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      <span>{product.likes}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{product.timeAgo}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            더보기
          </button>
        </div>
      </div>

      {/* 모바일 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="grid grid-cols-4 h-16">
          <Link href="/" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs">홈</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center justify-center text-orange-500">
            <span className="text-xl mb-1">🛍️</span>
            <span className="text-xs">중고거래</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">💬</span>
            <span className="text-xs">채팅</span>
          </Link>
          <Link href="/my" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">나의당근</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 로딩 컴포넌트
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">상품을 불러오는 중...</p>
    </div>
  </div>
);

// 메인 컴포넌트 (Suspense로 감싸기)
const ProductsPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductsContent />
    </Suspense>
  );
};

export default ProductsPage; 