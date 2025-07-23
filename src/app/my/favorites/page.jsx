'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FavoritesPage = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  // 관심목록 임시 데이터 생성
  const generateMockFavorites = () => {
    const mockFavorites = [
      {
        id: 'f1',
        title: '아이패드 프로 11인치 3세대',
        description: '애플펜슬, 키보드 포함 풀세트로 판매합니다.',
        price: 850000,
        location: '강남구 역삼동',
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        addedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        category: '디지털기기',
        status: 'available'
      },
      {
        id: 'f2',
        title: '일렉기타 Fender Stratocaster',
        description: '상태 좋은 일렉기타입니다. 앰프도 같이 드려요.',
        price: 450000,
        location: '마포구 홍대입구',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        addedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        category: '도서/음반',
        status: 'available'
      },
      {
        id: 'f3',
        title: '북유럽 원목 식탁 세트',
        description: '4인용 식탁과 의자 세트입니다. 직거래만 가능해요.',
        price: 320000,
        location: '송파구 잠실동',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        category: '가구/인테리어',
        status: 'reserved'
      },
      {
        id: 'f4',
        title: '캠핑 텐트 4인용',
        description: '한 번만 사용한 새 것과 다름없는 텐트입니다.',
        price: 180000,
        location: '서초구 서초동',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
        addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        category: '스포츠/레저',
        status: 'sold'
      }
    ];

    return mockFavorites.slice(0, Math.floor(Math.random() * 3) + 2); // 2-4개 랜덤
  };

  useEffect(() => {
    // localStorage에서 관심목록 가져오기
    const savedFavorites = localStorage.getItem('myFavorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      const favoritesWithDates = parsedFavorites.map(item => ({
        ...item,
        addedAt: new Date(item.addedAt)
      }));
      setFavorites(favoritesWithDates);
    } else {
      // 없으면 임시 데이터 생성
      const mockData = generateMockFavorites();
      setFavorites(mockData);
      localStorage.setItem('myFavorites', JSON.stringify(mockData));
    }
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    return `${Math.floor(diffDays / 30)}달 전`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">판매중</span>;
      case 'reserved':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">예약중</span>;
      case 'sold':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">판매완료</span>;
      default:
        return null;
    }
  };

  const removeFavorite = (itemId) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem('myFavorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* 헤더 */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 mr-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">관심목록</h1>
        </div>

        {/* 관심 상품 목록 */}
        <div className="p-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">관심 상품이 없습니다</p>
              <p className="text-gray-400 mb-4">마음에 드는 상품에 하트를 눌러보세요!</p>
              <Link 
                href="/products"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors inline-block"
              >
                상품 둘러보기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex space-x-4">
                    {/* 상품 이미지 */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-lg font-bold text-gray-900 mb-1">
                            {formatPrice(item.price)}
                          </p>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>{item.location}</span>
                            <span>관심 등록: {formatDate(item.addedAt)}</span>
                          </div>
                        </div>

                        {/* 하트 및 삭제 버튼 */}
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          <button 
                            onClick={() => removeFavorite(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          {item.status === 'available' && (
                            <Link href={`/products/${item.id}`}>
                              <button className="text-orange-500 text-xs font-medium border border-orange-500 px-3 py-1 rounded hover:bg-orange-50 transition-colors">
                                상품 보기
                              </button>
                            </Link>
                          )}
                          {item.status === 'sold' && (
                            <span className="text-gray-400 text-xs">판매완료</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 여백 */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default FavoritesPage; 