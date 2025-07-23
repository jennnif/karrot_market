'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('동네별');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 9999999999]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [inputMinPrice, setInputMinPrice] = useState('');
  const [inputMaxPrice, setInputMaxPrice] = useState('');

  // 카테고리 목록
  const categories = [
    '전체', '디지털기기', '가구/인테리어', '여성의류', '남성의류',
    '생활가전', '유아동', '도서/음반', '스포츠/레저', '기타'
  ];

  // 동네 목록
  const neighborhoods = [
    '동네별', '강남구 역삼동', '서초구 서초동', '송파구 잠실동', '내 동네 설정'
  ];

  // 임시 데이터 (실제로는 API에서 가져올 데이터)
  const mockProducts = [
    {
      id: 1,
      title: '아이폰 14 Pro 256GB 딥퍼플',
      description: '구매한 지 6개월 정도 되었고, 항상 케이스와 보호필름을 사용해서 상태 양호합니다.',
      price: 950000,
      location: '강남구 역삼동',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      likes: 12,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
      status: 'available',
      category: '디지털기기'
    },
    {
      id: 2,
      title: '맥북 에어 M2 13인치 스페이스그레이',
      description: '주로 문서 작업용으로만 사용했고, 게임이나 무리한 작업은 하지 않았습니다.',
      price: 1200000,
      location: '서초구 서초동',
      imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      likes: 8,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5시간 전
      status: 'available',
      category: '디지털기기'
    },
    {
      id: 3,
      title: '원목 책상 140cm',
      description: '이사로 인해 급하게 판매합니다. 조립 분해 필요하며, 직거래만 가능합니다.',
      price: 150000,
      location: '송파구 잠실동',
      imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
      likes: 3,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1일 전
      status: 'reserved',
      category: '가구/인테리어'
    },
    {
      id: 4,
      title: '나이키 에어포스 270 새상품',
      description: '새상품이지만 사이즈가 안맞아서 판매합니다. 박스 포함해서 드려요.',
      price: 80000,
      location: '마포구 홍대입구',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      likes: 15,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
      status: 'sold',
      category: '남성의류'
    },
    {
      id: 5,
      title: '다이슨 청소기 V11',
      description: '사용한지 1년 정도 되었고, 필터까지 새거로 교체해서 드립니다.',
      price: 300000,
      location: '용산구 이태원동',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      likes: 6,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6시간 전
      status: 'available',
      category: '생활가전'
    },
    {
      id: 6,
      title: '조던 1 하이 시카고 280mm',
      description: '정품이고 박스까지 다 있습니다. 신발끈도 여분으로 하나 더 드려요.',
      price: 450000,
      location: '강남구 청담동',
      imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
      likes: 22,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12시간 전
      status: 'available',
      category: '남성의류'
    },
    {
      id: 7,
      title: '파세코 창문형 인버터 에어컨 PWA-3250W',
      description: '올해 여름에 구매했지만 이사로 인해 판매합니다. 상태 매우 좋아요.',
      price: 340000,
      location: '망원제1동',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      likes: 6,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1시간 전
      status: 'available',
      category: '생활가전'
    },
    {
      id: 8,
      title: '캐리어 벽걸이 에어컨',
      description: '설치 포함해서 판매합니다. 전문 업체를 통해 안전하게 설치해드려요.',
      price: 450000,
      location: '양평동4가',
      imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400',
      likes: 1,
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5분 전
      status: 'available',
      category: '생활가전'
    }
  ];

  useEffect(() => {
    // URL 쿼리 파라미터에서 카테고리 확인
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }

    // 임시로 로딩 시뮬레이션
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  // GPS 위치 가져오기
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setLocationLoading(true);
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // 실제로는 카카오맵 API 등을 사용해야 하지만, 여기서는 mock 데이터로 처리
      const mockNeighborhoods = [
        { lat: 37.5665, lng: 126.9780, name: '중구 명동' },
        { lat: 37.5663, lng: 127.0092, name: '강남구 역삼동' },
        { lat: 37.4979, lng: 127.0276, name: '서초구 서초동' },
        { lat: 37.5134, lng: 127.1006, name: '송파구 잠실동' },
        { lat: 37.5563, lng: 126.9238, name: '마포구 홍대입구' },
      ];

      // 현재 위치에서 가장 가까운 동네 찾기 (간단한 거리 계산)
      let closestNeighborhood = mockNeighborhoods[0];
      let minDistance = Math.abs(latitude - closestNeighborhood.lat) + Math.abs(longitude - closestNeighborhood.lng);

      mockNeighborhoods.forEach(neighborhood => {
        const distance = Math.abs(latitude - neighborhood.lat) + Math.abs(longitude - neighborhood.lng);
        if (distance < minDistance) {
          minDistance = distance;
          closestNeighborhood = neighborhood;
        }
      });

      setCurrentLocation({
        latitude,
        longitude,
        neighborhood: closestNeighborhood.name
      });

    } catch (error) {
      console.error('위치를 가져오는데 실패했습니다:', error);
      alert('위치를 가져오는데 실패했습니다. GPS가 활성화되어 있는지 확인해주세요.');
    } finally {
      setLocationLoading(false);
    }
  };

  // 동네 설정 처리
  const handleNeighborhoodChange = (value) => {
    if (value === '내 동네 설정') {
      setShowLocationModal(true);
    } else {
      setSelectedNeighborhood(value);
    }
  };

  // 위치 설정 확인
  const confirmLocationSetting = () => {
    if (currentLocation) {
      setSelectedNeighborhood(currentLocation.neighborhood);
      setShowLocationModal(false);
    }
  };

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    if (price >= 100000000) {
      return `${(price / 100000000).toFixed(1)}억`;
    } else if (price >= 10000) {
      return `${(price / 10000).toFixed(0)}만`;
    } else {
      return `${price.toLocaleString()}원`;
    }
  };

  // 슬라이더 트랙 클릭 핸들러
  const handleTrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const trackWidth = rect.width;
    const percentage = clickPosition / trackWidth;
    const newValue = Math.round(percentage * 9999999999);
    
    // 클릭한 위치가 현재 범위의 어느 쪽에 더 가까운지 판단
    const distanceToMin = Math.abs(newValue - priceRange[0]);
    const distanceToMax = Math.abs(newValue - priceRange[1]);
    
    if (distanceToMin < distanceToMax) {
      // 최소값 조정
      if (newValue <= priceRange[1]) {
        setPriceRange([newValue, priceRange[1]]);
      }
    } else {
      // 최대값 조정
      if (newValue >= priceRange[0]) {
        setPriceRange([priceRange[0], newValue]);
      }
    }
  };

  // 직접입력 모드 토글
  const toggleDirectInput = () => {
    if (isDirectInput) {
      // 슬라이더 모드로 전환 시 입력값 초기화
      setInputMinPrice('');
      setInputMaxPrice('');
    } else {
      // 직접입력 모드로 전환 시 현재 가격을 입력값으로 설정
      setInputMinPrice(priceRange[0] === 0 ? '' : priceRange[0].toString());
      setInputMaxPrice(priceRange[1] === 9999999999 ? '' : priceRange[1].toString());
    }
    setIsDirectInput(!isDirectInput);
  };

  // 직접입력 가격 적용
  const applyDirectInput = () => {
    const minPrice = inputMinPrice === '' ? 0 : parseInt(inputMinPrice.replace(/,/g, ''));
    const maxPrice = inputMaxPrice === '' ? 9999999999 : parseInt(inputMaxPrice.replace(/,/g, ''));
    
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      alert('올바른 숫자를 입력해주세요.');
      return;
    }
    
    if (minPrice > maxPrice) {
      alert('최소 가격이 최대 가격보다 클 수 없습니다.');
      return;
    }
    
    setPriceRange([minPrice, maxPrice]);
  };

  // 숫자 포맷팅 (천 단위 콤마)
  const formatNumberInput = (value) => {
    const number = value.replace(/,/g, '');
    if (isNaN(number) || number === '') return '';
    return parseInt(number).toLocaleString();
  };

  // 입력값 처리
  const handlePriceInput = (value, type) => {
    const formatted = formatNumberInput(value);
    if (type === 'min') {
      setInputMinPrice(formatted);
    } else {
      setInputMaxPrice(formatted);
    }
  };

  // 필터링된 상품 목록
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || product.category === selectedCategory;
    const matchesNeighborhood = selectedNeighborhood === '동네별' || product.location.includes(selectedNeighborhood);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesNeighborhood && matchesPrice;
  });

  // 정렬된 상품 목록
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'priceHigh':
        return b.price - a.price;
      case 'priceLow':
        return a.price - b.price;
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-800 font-medium">상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">중고거래</h1>

            {/* 검색바 - 박스 스타일 */}
            <div className="relative mb-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center space-x-3 hover:border-orange-300 focus-within:border-orange-300 transition-all duration-200">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="상품명을 검색해보세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-gray-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* 필터 및 정렬 - 3개 컬럼 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* 카테고리 필터 */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-300 transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* 동네별 필터 */}
              <div>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => handleNeighborhoodChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-300 transition-all duration-200"
                >
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
              </div>

              {/* 정렬 */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-300 transition-all duration-200"
                >
                  <option value="latest">최신순</option>
                  <option value="priceHigh">높은 가격순</option>
                  <option value="priceLow">낮은 가격순</option>
                  <option value="popular">인기순</option>
                </select>
              </div>
            </div>

            {/* 가격 범위 필터 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 mb-6">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">가격 범위</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleDirectInput}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                        isDirectInput 
                          ? 'bg-orange-500 text-white hover:bg-orange-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                      }`}
                    >
                      직접입력
                    </button>
                    <button
                      onClick={() => {
                        setPriceRange([0, 9999999999]);
                        setInputMinPrice('');
                        setInputMaxPrice('');
                      }}
                      className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                    >
                      초기화
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-orange-600">
                    {formatPrice(priceRange[0])} ~ {formatPrice(priceRange[1])}
                  </span>
                </div>
              </div>

              {/* 슬라이더 또는 직접입력 */}
              {isDirectInput ? (
                /* 직접입력 모드 */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">최소 가격</label>
                      <input
                        type="text"
                        placeholder="0"
                        value={inputMinPrice}
                        onChange={(e) => handlePriceInput(e.target.value, 'min')}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-black font-semibold focus:outline-none focus:border-orange-300 transition-colors placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">최대 가격</label>
                      <input
                        type="text"
                        placeholder="제한없음"
                        value={inputMaxPrice}
                        onChange={(e) => handlePriceInput(e.target.value, 'max')}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-black font-semibold focus:outline-none focus:border-orange-300 transition-colors placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyDirectInput}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
                  >
                    가격 적용
                  </button>
                </div>
              ) : (
                /* 이중 범위 슬라이더 */
                <div className="relative">
                  {/* 슬라이더 트랙 - 클릭 가능 */}
                  <div 
                    className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
                    onClick={handleTrackClick}
                  >
                    {/* 활성 범위 */}
                    <div
                      className="absolute h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full pointer-events-none"
                      style={{
                        left: `${(priceRange[0] / 9999999999) * 100}%`,
                        width: `${((priceRange[1] - priceRange[0]) / 9999999999) * 100}%`
                      }}
                    />
                  </div>

                  {/* 최소값 슬라이더 */}
                  <input
                    type="range"
                    min="0"
                    max="9999999999"
                    step="10000"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      if (newMin <= priceRange[1]) {
                        setPriceRange([newMin, priceRange[1]]);
                      }
                    }}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    style={{ zIndex: 1 }}
                  />

                  {/* 최대값 슬라이더 */}
                  <input
                    type="range"
                    min="0"
                    max="9999999999"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      if (newMax >= priceRange[0]) {
                        setPriceRange([priceRange[0], newMax]);
                      }
                    }}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    style={{ zIndex: 2 }}
                  />

                  {/* 최소값 핸들 */}
                  <div
                    className="absolute w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-y-1.5 hover:scale-110 transition-all duration-200"
                    style={{
                      left: `calc(${(priceRange[0] / 9999999999) * 100}% - 10px)`,
                      zIndex: 3
                    }}
                  >
                    {/* 툴팁 */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatPrice(priceRange[0])}
                    </div>
                  </div>

                  {/* 최대값 핸들 */}
                  <div
                    className="absolute w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-y-1.5 hover:scale-110 transition-all duration-200"
                    style={{
                      left: `calc(${(priceRange[1] / 9999999999) * 100}% - 10px)`,
                      zIndex: 4
                    }}
                  >
                    {/* 툴팁 */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatPrice(priceRange[1])}
                    </div>
                  </div>
                </div>
              )}

              {/* 빠른 설정 버튼들 - 슬라이더 모드에서만 표시 */}
              {!isDirectInput && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <button
                    onClick={() => setPriceRange([0, 100000])}
                    className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 py-2 rounded-lg transition-colors font-medium"
                  >
                    ~10만
                  </button>
                  <button
                    onClick={() => setPriceRange([100000, 500000])}
                    className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 py-2 rounded-lg transition-colors font-medium"
                  >
                    10만~50만
                  </button>
                  <button
                    onClick={() => setPriceRange([500000, 2000000])}
                    className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 py-2 rounded-lg transition-colors font-medium"
                  >
                    50만~200만
                  </button>
                  <button
                    onClick={() => setPriceRange([2000000, 9999999999])}
                    className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 py-2 rounded-lg transition-colors font-medium"
                  >
                    200만+
                  </button>
                </div>
              )}
            </div>

            {/* 결과 개수 */}
            <p className="text-slate-600 text-center mb-8 text-sm">
              총 <span className="font-semibold text-slate-800">{sortedProducts.length}개</span>의 상품
            </p>
          </div>
        </div>
      </div>

      {/* 상품 목록 - 세로 스크롤 레이아웃 */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-slate-800 text-lg mb-2 font-medium">검색 결과가 없습니다</p>
            <p className="text-slate-600">다른 검색어나 카테고리를 시도해보세요</p>
          </div>
        ) : (
          /* 세로 단일 컬럼 레이아웃 with 스크롤 애니메이션 */
          <div className="space-y-16">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 여백 */}
      <div className="h-20"></div>

      {/* 위치 설정 모달 */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                내 동네 설정
              </h3>
              
              <p className="text-sm text-slate-600 mb-6">
                GPS를 이용해서 현재 위치의 동네를 자동으로 설정합니다.
              </p>

              {!currentLocation ? (
                <button
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className={`w-full bg-orange-500 text-white py-3 rounded-xl font-medium mb-3 transition-colors ${
                    locationLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                  }`}
                >
                  {locationLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      위치 확인 중...
                    </div>
                  ) : (
                    '현재 위치 가져오기'
                  )}
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center text-green-700 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    위치 확인 완료!
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    📍 {currentLocation.neighborhood}
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    위도: {currentLocation.latitude.toFixed(4)}, 경도: {currentLocation.longitude.toFixed(4)}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowLocationModal(false);
                    setCurrentLocation(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                {currentLocation && (
                  <button
                    onClick={confirmLocationSetting}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    설정 완료
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage; 