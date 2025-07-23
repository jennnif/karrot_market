'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BuyingPage = () => {
  const router = useRouter();
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  // 랜덤 구매 상품 생성
  const generateRandomPurchasedProducts = () => {
    const mockProducts = [
      {
        id: 'b1',
        title: '무선 마우스 로지텍 MX Master',
        description: '깨끗한 상태로 잘 받았습니다. 좋은 거래였어요!',
        price: 95000,
        seller: '김기술',
        location: '서초구 서초동',
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        purchaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'completed',
        category: '디지털기기',
        hasReview: false
      },
      {
        id: 'b2',
        title: '책상 조명 LED 스탠드',
        description: '설치까지 도움주셔서 감사했습니다. 밝기도 완벽해요!',
        price: 45000,
        seller: '조명왕',
        location: '강남구 논현동',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        purchaseDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        status: 'completed',
        category: '가구/인테리어',
        hasReview: true
      },
      {
        id: 'b3',
        title: '겨울 패딩 점퍼 네이비',
        description: '사이즈도 딱 맞고 따뜻해요. 만족스러운 구매!',
        price: 120000,
        seller: '패션마니아',
        location: '마포구 합정동',
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
        purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        status: 'completed',
        category: '남성의류',
        hasReview: false
      },
      {
        id: 'b4',
        title: '블루투스 스피커 JBL',
        description: '음질 좋고 배송도 빨라서 만족합니다.',
        price: 78000,
        seller: '음악러버',
        location: '송파구 잠실동',
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        purchaseDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        status: 'completed',
        category: '디지털기기',
        hasReview: true
      },
      {
        id: 'b5',
        title: '요가매트 천연고무',
        description: '두께도 적당하고 미끄럽지 않아서 좋아요.',
        price: 35000,
        seller: '헬스매니아',
        location: '강동구 천호동',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        purchaseDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        status: 'completed',
        category: '스포츠/레저',
        hasReview: false
      }
    ];

    // 랜덤하게 3개 선택
    const shuffled = mockProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    // localStorage에서 기존 구매 내역 가져오기
    const savedPurchases = localStorage.getItem('myPurchasedProducts');
    if (savedPurchases) {
      const parsedPurchases = JSON.parse(savedPurchases);
      const purchasesWithDates = parsedPurchases.map(product => ({
        ...product,
        purchaseDate: new Date(product.purchaseDate)
      }));
      setPurchasedProducts(purchasesWithDates);
    } else {
      // 없으면 랜덤 생성
      const randomProducts = generateRandomPurchasedProducts();
      setPurchasedProducts(randomProducts);
      localStorage.setItem('myPurchasedProducts', JSON.stringify(randomProducts));
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
          <h1 className="text-lg font-semibold text-gray-900">구매내역</h1>
        </div>

        {/* 상품 목록 */}
        <div className="p-4">
          {purchasedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">구매한 상품이 없습니다</p>
              <p className="text-gray-400 mb-4">당근마켓에서 첫 구매를 해보세요!</p>
              <Link 
                href="/products"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors inline-block"
              >
                상품 둘러보기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {purchasedProducts.map((product) => (
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
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">구매완료</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900 mb-1">
                            {formatPrice(product.price)}
                          </p>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>판매자: {product.seller}</span>
                            <span>{product.location}</span>
                            <span>{formatDate(product.purchaseDate)}</span>
                          </div>
                        </div>

                        {/* 액션 버튼들 */}
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          {!product.hasReview ? (
                            <button className="text-orange-500 text-xs font-medium border border-orange-500 px-3 py-1 rounded hover:bg-orange-50 transition-colors">
                              후기 작성
                            </button>
                          ) : (
                            <button className="text-green-500 text-xs font-medium border border-green-500 px-3 py-1 rounded hover:bg-green-50 transition-colors">
                              후기 확인
                            </button>
                          )}
                          <button className="text-gray-500 text-xs font-medium border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                            다시 구매
                          </button>
                          <button className="text-blue-500 text-xs font-medium border border-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                            판매자 채팅
                          </button>
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

export default BuyingPage; 