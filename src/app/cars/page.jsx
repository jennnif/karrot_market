'use client';

import { useState, useEffect } from 'react';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('전체');
  const [selectedFuel, setSelectedFuel] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

  // 자동차 브랜드
  const carBrands = ['전체', '현대', '기아', 'BMW', '벤츠', '아우디', '토요타', '닛산', '기타'];
  
  // 연료 타입
  const fuelTypes = ['전체', '가솔린', '디젤', '하이브리드', '전기', 'LPG'];

  // 임시 중고차 데이터
  const mockCars = [
    {
      id: 1,
      title: '2020년 아반떼 1.6 가솔린',
      description: '무사고, 정기점검 완료, 실내 깨끗합니다.',
      price: 1450,
      year: 2020,
      mileage: 45000,
      fuel: '가솔린',
      brand: '현대',
      model: '아반떼',
      transmission: '자동',
      location: '강남구 역삼동',
      imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isAccidentFree: true,
      hasInsurance: true,
      inspectionDate: '2024.12',
      sellerType: '개인'
    },
    {
      id: 2,
      title: '2019년 쏘나타 하이브리드',
      description: '연비 좋은 하이브리드, 정비이력 완벽합니다.',
      price: 2100,
      year: 2019,
      mileage: 68000,
      fuel: '하이브리드',
      brand: '현대',
      model: '쏘나타',
      transmission: '자동',
      location: '서초구 서초동',
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isAccidentFree: true,
      hasInsurance: true,
      inspectionDate: '2024.08',
      sellerType: '딜러'
    },
    {
      id: 3,
      title: '2021년 BMW 320i',
      description: '준신차급, 풀옵션, BMW AS 이력 완벽합니다.',
      price: 3800,
      year: 2021,
      mileage: 25000,
      fuel: '가솔린',
      brand: 'BMW',
      model: '3시리즈',
      transmission: '자동',
      location: '강남구 청담동',
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isAccidentFree: true,
      hasInsurance: true,
      inspectionDate: '2025.03',
      sellerType: '딜러'
    },
    {
      id: 4,
      title: '2018년 테슬라 모델3',
      description: '전기차 최고 모델, 배터리 상태 양호합니다.',
      price: 3200,
      year: 2018,
      mileage: 89000,
      fuel: '전기',
      brand: '기타',
      model: '모델3',
      transmission: '자동',
      location: '마포구 홍대입구',
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isAccidentFree: true,
      hasInsurance: true,
      inspectionDate: '2024.06',
      sellerType: '개인'
    },
    {
      id: 5,
      title: '2020년 카니발 디젤',
      description: '대형 SUV, 가족용 최적, 실내 넓고 편안합니다.',
      price: 2900,
      year: 2020,
      mileage: 52000,
      fuel: '디젤',
      brand: '기아',
      model: '카니발',
      transmission: '자동',
      location: '송파구 잠실동',
      imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isAccidentFree: false,
      hasInsurance: true,
      inspectionDate: '2024.10',
      sellerType: '개인'
    },
    {
      id: 6,
      title: '2019년 벤츠 C200',
      description: '럭셔리 세단, 풀옵션, 정기점검 완료상태입니다.',
      price: 4200,
      year: 2019,
      mileage: 41000,
      fuel: '가솔린',
      brand: '벤츠',
      model: 'C클래스',
      transmission: '자동',
      location: '용산구 이태원동',
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isAccidentFree: true,
      hasInsurance: true,
      inspectionDate: '2024.11',
      sellerType: '딜러'
    }
  ];

  useEffect(() => {
    // 임시로 로딩 시뮬레이션
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 1000);
  }, []);

  // 필터링된 차량 목록
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === '전체' || car.brand === selectedBrand;
    const matchesFuel = selectedFuel === '전체' || car.fuel === selectedFuel;
    return matchesSearch && matchesBrand && matchesFuel;
  });

  // 정렬된 차량 목록
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'year_new':
        return b.year - a.year;
      case 'mileage_low':
        return a.mileage - b.mileage;
      default:
        return 0;
    }
  });

  const formatPrice = (price) => {
    return `${price.toLocaleString()}만원`;
  };

  const formatMileage = (mileage) => {
    return `${mileage.toLocaleString()}km`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}일 전`;
    return new Date(date).toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-800 font-medium">차량 정보를 불러오는 중...</p>
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
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">중고차</h1>

            {/* 검색바 */}
            <div className="relative mb-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center space-x-3 hover:border-blue-300 focus-within:border-blue-300 transition-all duration-200">
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
                  placeholder="차종이나 모델명을 검색해보세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-gray-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* 필터 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-300 transition-all duration-200"
              >
                {carBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-300 transition-all duration-200"
              >
                {fuelTypes.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-300 transition-all duration-200"
              >
                <option value="latest">최신순</option>
                <option value="price_low">낮은 가격순</option>
                <option value="price_high">높은 가격순</option>
                <option value="year_new">최신 연식순</option>
                <option value="mileage_low">낮은 주행거리순</option>
              </select>
            </div>

            {/* 결과 개수 */}
            <p className="text-slate-600 text-center mb-8 text-sm">
              총 <span className="font-semibold text-slate-800">{sortedCars.length}대</span>의 차량
            </p>
          </div>
        </div>
      </div>

      {/* 차량 목록 */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedCars.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
            <p className="text-slate-800 text-lg mb-2 font-medium">검색 결과가 없습니다</p>
            <p className="text-slate-600">다른 조건으로 검색해보세요</p>
          </div>
        ) : (
          <div className="space-y-16">
            {sortedCars.map((car, index) => (
              <div 
                key={car.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* 차량 이미지 */}
                <div className="relative h-48">
                  <img
                    src={car.imageUrl}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* 무사고 배지 */}
                  {car.isAccidentFree && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      무사고
                    </div>
                  )}
                  
                  {/* 판매자 타입 */}
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {car.sellerType}
                  </div>
                </div>

                <div className="p-6">
                  {/* 차량 정보 */}
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">
                      {car.title}
                    </h3>
                    
                    {/* 가격 */}
                    <div className="text-2xl font-bold text-blue-600 mb-3">
                      {formatPrice(car.price)}
                    </div>

                    {/* 기본 정보 */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-500">연식</span>
                        <div className="font-medium text-slate-800">{car.year}년</div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">주행거리</span>
                        <div className="font-medium text-slate-800">{formatMileage(car.mileage)}</div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">연료</span>
                        <div className="font-medium text-slate-800">{car.fuel}</div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">변속기</span>
                        <div className="font-medium text-slate-800">{car.transmission}</div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                      {car.description}
                    </p>

                    {/* 특징 */}
                    <div className="flex items-center space-x-2 mb-4">
                      {car.isAccidentFree && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          ✅ 무사고
                        </span>
                      )}
                      {car.hasInsurance && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          🛡️ 보험이력
                        </span>
                      )}
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        🔧 검사: {car.inspectionDate}
                      </span>
                    </div>

                    {/* 위치 및 시간 */}
                    <div className="flex items-center text-xs text-slate-500 mb-4">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{car.location}</span>
                      <span className="ml-3">{formatTimeAgo(car.createdAt)}</span>
                    </div>

                    {/* 문의 버튼 */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                        문의하기
                      </button>
                      <button className="border border-blue-500 text-blue-500 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                        찜하기
                      </button>
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
  );
};

export default CarsPage; 