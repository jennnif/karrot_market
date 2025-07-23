'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 임시 상품 데이터
  const mockProduct = {
    id: params.id,
    title: '아이폰 14 Pro 256GB 딥퍼플',
    price: 950000,
    originalPrice: 1200000,
    location: '강남구 역삼동',
    timeAgo: '1시간 전',
    views: 127,
    likes: 24,
    category: '디지털기기',
    condition: '상급',
    tradingMethod: '직거래, 택배거래',
    description: `아이폰 14 Pro 256GB 딥퍼플 색상입니다.

구매한지 6개월 정도 되었고, 항상 케이스와 보호필름을 붙여서 사용했습니다.

상태는 정말 깨끗합니다. 스크래치나 흠집 전혀 없어요!

박스, 충전기, 이어폰 모두 다 있습니다.

직거래는 강남역 근처에서 가능하고, 택배거래도 가능합니다.

급하게 팔아야 해서 저렴하게 내놓습니다.

연락 주세요!`,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'
    ],
    seller: {
      name: '김민수',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      temperature: 36.8,
      location: '강남구 역삼동',
      joinDate: '2023년 3월',
      reviewCount: 128
    }
  };

  const relatedProducts = [
    {
      id: 2,
      title: '삼성 갤럭시 S23',
      price: 700000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      location: '서초구 방배동'
    },
    {
      id: 3,
      title: '아이폰 13 Pro',
      price: 750000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
      location: '송파구 잠실동'
    },
    {
      id: 4,
      title: '갤럭시 노트 20',
      price: 550000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      location: '마포구 상암동'
    }
  ];

  useEffect(() => {
    setProduct(mockProduct);
  }, [params.id]);

  const formatPrice = (price) => {
    return price.toLocaleString() + '원';
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleChat = () => {
    router.push('/chat');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={() => router.back()} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🥕</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">당근마켓</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* 이미지 섹션 */}
          <div className="space-y-6">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-100">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`상품 이미지 ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 상품 정보 섹션 */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.timeAgo}</span>
                <span>•</span>
                <span>조회 {product.views}</span>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            {/* 상품 상세 정보 */}
            <div className="bg-white rounded-lg border border-gray-100 p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="block text-gray-500 mb-2">상품상태</span>
                  <p className="font-medium text-gray-900">{product.condition}</p>
                </div>
                <div>
                  <span className="block text-gray-500 mb-2">거래방법</span>
                  <p className="font-medium text-gray-900">{product.tradingMethod}</p>
                </div>
                <div>
                  <span className="block text-gray-500 mb-2">거래지역</span>
                  <p className="font-medium text-gray-900">{product.location}</p>
                </div>
                <div>
                  <span className="block text-gray-500 mb-2">관심</span>
                  <p className="font-medium text-gray-900">{product.likes}명</p>
                </div>
              </div>
            </div>

            {/* 상품 설명 */}
            <div className="bg-white rounded-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">상품 설명</h3>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                {product.description}
              </div>
            </div>

            {/* 판매자 정보 */}
            <div className="bg-white rounded-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">판매자 정보</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.seller.profileImage}
                    alt={product.seller.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-lg">{product.seller.name}</p>
                    <p className="text-gray-500">{product.seller.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-orange-500">{product.seller.temperature}°C</span>
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-500">매너온도</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                <span>{product.seller.joinDate} 가입</span>
                <span>후기 {product.seller.reviewCount}개</span>
              </div>
            </div>
          </div>
        </div>

        {/* 관련 상품 */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">이런 상품은 어때요?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="group">
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      {formatPrice(relatedProduct.price)}
                    </p>
                    <p className="text-sm text-gray-500">{relatedProduct.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`p-3 rounded-lg border transition-colors ${
              isLiked 
                ? 'border-red-300 bg-red-50 text-red-500' 
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={handleChat}
            className="flex-1 bg-orange-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            채팅하기
          </button>
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-24"></div>
    </div>
  );
};

export default ProductDetailPage; 