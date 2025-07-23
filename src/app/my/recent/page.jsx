'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RecentPage = () => {
  const router = useRouter();
  const [recentItems, setRecentItems] = useState([]);

  // 최근 본 글 임시 데이터 생성
  const generateMockRecentItems = () => {
    const mockItems = [
      {
        id: 'r1',
        title: '맥북 프로 16인치 M1 Pro',
        description: '개발 작업용으로 사용했던 맥북입니다. 상태 매우 좋아요.',
        price: 2200000,
        location: '강남구 역삼동',
        imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
        viewedAt: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
        category: '디지털기기',
        status: 'available'
      },
      {
        id: 'r2',
        title: '나이키 에어맥스 270mm',
        description: '몇 번 신지 않은 거의 새 신발입니다.',
        price: 95000,
        location: '서초구 서초동',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
        category: '남성의류',
        status: 'available'
      },
      {
        id: 'r3',
        title: '무선 청소기 다이슨 V11',
        description: '사용감 있지만 기능은 완벽합니다.',
        price: 350000,
        location: '마포구 홍대입구',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        viewedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4시간 전
        category: '생활가전',
        status: 'reserved'
      },
      {
        id: 'r4',
        title: '원목 책장 5단',
        description: '이사로 인해 급매합니다. 직거래만 가능해요.',
        price: 120000,
        location: '송파구 잠실동',
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        viewedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6시간 전
        category: '가구/인테리어',
        status: 'available'
      },
      {
        id: 'r5',
        title: '아이폰 14 128GB 블루',
        description: '케이스, 보호필름 항상 사용해서 스크래치 없어요.',
        price: 720000,
        location: '용산구 이태원동',
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        viewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1일 전
        category: '디지털기기',
        status: 'sold'
      }
    ];

    return mockItems.slice(0, Math.floor(Math.random() * 3) + 3); // 3-5개 랜덤
  };

  useEffect(() => {
    // localStorage에서 최근 본 글 가져오기
    const savedRecentItems = localStorage.getItem('myRecentItems');
    if (savedRecentItems) {
      const parsedItems = JSON.parse(savedRecentItems);
      const itemsWithDates = parsedItems.map(item => ({
        ...item,
        viewedAt: new Date(item.viewedAt)
      }));
      // 최신순으로 정렬
      itemsWithDates.sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));
      setRecentItems(itemsWithDates);
    } else {
      // 없으면 임시 데이터 생성
      const mockData = generateMockRecentItems();
      setRecentItems(mockData);
      localStorage.setItem('myRecentItems', JSON.stringify(mockData));
    }
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const formatTimeAgo = (dateInput) => {
    const date = new Date(dateInput);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    return new Date(date).toLocaleDateString('ko-KR');
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

  const removeRecentItem = (itemId) => {
    const updatedItems = recentItems.filter(item => item.id !== itemId);
    setRecentItems(updatedItems);
    localStorage.setItem('myRecentItems', JSON.stringify(updatedItems));
  };

  const clearAllRecentItems = () => {
    if (confirm('최근 본 글을 모두 삭제하시겠습니까?')) {
      setRecentItems([]);
      localStorage.removeItem('myRecentItems');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 mr-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">최근 본 글</h1>
          </div>
          {recentItems.length > 0 && (
            <button 
              onClick={clearAllRecentItems}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              전체 삭제
            </button>
          )}
        </div>

        {/* 최근 본 상품 목록 */}
        <div className="p-4">
          {recentItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">최근 본 글이 없습니다</p>
              <p className="text-gray-400 mb-4">상품을 둘러보며 관심있는 글을 확인해보세요!</p>
              <Link 
                href="/products"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors inline-block"
              >
                상품 둘러보기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentItems.map((item) => (
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
                            <span>조회: {formatTimeAgo(item.viewedAt)}</span>
                          </div>
                        </div>

                        {/* 액션 버튼들 */}
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          <button 
                            onClick={() => removeRecentItem(item.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          {item.status === 'available' && (
                            <Link href={`/products/${item.id}`}>
                              <button className="text-orange-500 text-xs font-medium border border-orange-500 px-3 py-1 rounded hover:bg-orange-50 transition-colors">
                                다시 보기
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

export default RecentPage; 