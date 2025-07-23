'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SellingPage = () => {
  const router = useRouter();
  const [sellingProducts, setSellingProducts] = useState([]);

  // 랜덤 판매 상품 생성
  const generateRandomSellingProducts = () => {
    const mockProducts = [
      {
        id: 's1',
        title: '아이폰 13 Pro 128GB 시에라블루',
        description: '케이스, 보호필름 사용으로 깨끗한 상태입니다.',
        price: 750000,
        location: '강남구 역삼동',
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        status: 'selling',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        views: 45,
        likes: 8,
        category: '디지털기기'
      },
      {
        id: 's2',
        title: '북유럽 스타일 소파 2인용',
        description: '이사로 인해 급매합니다. 상태 양호해요.',
        price: 180000,
        location: '강남구 역삼동',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        status: 'sold',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        views: 123,
        likes: 15,
        category: '가구/인테리어'
      },
      {
        id: 's3',
        title: '에어팟 프로 2세대 새상품',
        description: '선물받았는데 이미 있어서 판매합니다.',
        price: 280000,
        location: '강남구 역삼동',
        imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
        status: 'reserved',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        views: 89,
        likes: 12,
        category: '디지털기기'
      },
      {
        id: 's4',
        title: 'LG 그램 노트북 17인치',
        description: '회사에서 지급받은 것으로 거의 사용 안했습니다.',
        price: 950000,
        location: '강남구 역삼동',
        imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
        status: 'selling',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        views: 67,
        likes: 9,
        category: '디지털기기'
      },
      {
        id: 's5',
        title: '나이키 운동화 280mm',
        description: '몇 번 신지 않아서 새것과 다름없습니다.',
        price: 85000,
        location: '강남구 역삼동',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        status: 'sold',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        views: 234,
        likes: 18,
        category: '남성의류'
      }
    ];

    // 랜덤하게 3개 선택
    const shuffled = mockProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    // localStorage에서 기존 판매 내역 가져오기
    const savedSellingProducts = localStorage.getItem('mySellingProducts');
    if (savedSellingProducts) {
      const parsedProducts = JSON.parse(savedSellingProducts);
      const productsWithDates = parsedProducts.map(product => ({
        ...product,
        createdAt: new Date(product.createdAt)
      }));
      setSellingProducts(productsWithDates);
    } else {
      // 없으면 랜덤 생성
      const randomProducts = generateRandomSellingProducts();
      setSellingProducts(randomProducts);
      localStorage.setItem('mySellingProducts', JSON.stringify(randomProducts));
    }
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}일 전`;
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'selling':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">판매중</span>;
      case 'reserved':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">예약중</span>;
      case 'sold':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">판매완료</span>;
      default:
        return null;
    }
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
          <h1 className="text-lg font-semibold text-gray-900">판매내역</h1>
        </div>

        {/* 상품 목록 */}
        <div className="p-4">
          {sellingProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">판매한 상품이 없습니다</p>
              <p className="text-gray-400 mb-4">첫 번째 상품을 등록해보세요!</p>
              <Link 
                href="/sell"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors inline-block"
              >
                상품 등록하기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sellingProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex space-x-4">
                    {/* 상품 이미지 */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{product.title}</h3>
                            {getStatusBadge(product.status)}
                          </div>
                          <p className="text-lg font-bold text-gray-900 mb-1">
                            {formatPrice(product.price)}
                          </p>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>{formatDate(product.createdAt)}</span>
                            <span>조회 {product.views}회</span>
                            <span>❤️ {product.likes}개</span>
                          </div>
                        </div>

                        {/* 액션 버튼들 */}
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          {product.status === 'selling' && (
                            <>
                              <button className="text-orange-500 text-xs font-medium border border-orange-500 px-3 py-1 rounded hover:bg-orange-50 transition-colors">
                                끌어올리기
                              </button>
                              <button className="text-gray-500 text-xs font-medium border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                                수정
                              </button>
                            </>
                          )}
                          {product.status === 'sold' && (
                            <button className="text-blue-500 text-xs font-medium border border-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                              후기 확인
                            </button>
                          )}
                          {product.status === 'reserved' && (
                            <button className="text-green-500 text-xs font-medium border border-green-500 px-3 py-1 rounded hover:bg-green-50 transition-colors">
                              거래 진행
                            </button>
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

        {/* 플로팅 버튼 */}
        <Link
          href="/sell"
          className="fixed bottom-6 right-6 bg-orange-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SellingPage; 