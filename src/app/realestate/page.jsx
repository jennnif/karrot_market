'use client';

import { useState, useEffect } from 'react';

const RealEstatePage = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedRooms, setSelectedRooms] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

  // 매물 타입
  const propertyTypes = ['전체', '원룸', '투룸', '쓰리룸+', '오피스텔', '아파트', '빌라'];
  
  // 방 개수
  const roomOptions = ['전체', '원룸', '1.5룸', '2룸', '3룸', '4룸+'];

  // 임시 부동산 데이터
  const mockProperties = [
    {
      id: 1,
      title: '강남역 도보 5분 원룸',
      description: '신축 원룸, 풀옵션, 보안 우수, 교통 편리합니다.',
      monthlyRent: 80,
      deposit: 1000,
      maintenanceFee: 7,
      area: 23,
      floor: '3/12층',
      location: '강남구 역삼동',
      subway: '강남역 5분',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      propertyType: '원룸',
      rooms: '원룸',
      isNew: true,
      hasParking: false,
      hasElevator: true,
      moveInDate: '즉시'
    },
    {
      id: 2,
      title: '홍대입구 투룸 전세',
      description: '리모델링 완료, 남향, 햇빛 좋은 투룸입니다.',
      monthlyRent: 0,
      deposit: 45000,
      maintenanceFee: 12,
      area: 42,
      floor: '7/15층',
      location: '마포구 홍대입구',
      subway: '홍대입구역 3분',
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      propertyType: '투룸',
      rooms: '2룸',
      isNew: false,
      hasParking: true,
      hasElevator: true,
      moveInDate: '2024.04.01'
    },
    {
      id: 3,
      title: '서초동 오피스텔 월세',
      description: '복층 구조, 넓은 공간, 사무실 겸용 가능합니다.',
      monthlyRent: 150,
      deposit: 2000,
      maintenanceFee: 15,
      area: 33,
      floor: '10/20층',
      location: '서초구 서초동',
      subway: '서초역 7분',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      propertyType: '오피스텔',
      rooms: '1.5룸',
      isNew: false,
      hasParking: true,
      hasElevator: true,
      moveInDate: '협의'
    },
    {
      id: 4,
      title: '잠실 아파트 쓰리룸',
      description: '한강뷰, 학군 좋은 아파트, 아이 키우기 좋습니다.',
      monthlyRent: 200,
      deposit: 5000,
      maintenanceFee: 25,
      area: 84,
      floor: '15/25층',
      location: '송파구 잠실동',
      subway: '잠실역 10분',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      propertyType: '아파트',
      rooms: '3룸',
      isNew: false,
      hasParking: true,
      hasElevator: true,
      moveInDate: '2024.05.15'
    },
    {
      id: 5,
      title: '이태원 빌라 투룸',
      description: '조용한 주택가, 개별 난방, 반려동물 가능합니다.',
      monthlyRent: 90,
      deposit: 1500,
      maintenanceFee: 8,
      area: 36,
      floor: '2/4층',
      location: '용산구 이태원동',
      subway: '이태원역 8분',
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      propertyType: '빌라',
      rooms: '2룸',
      isNew: false,
      hasParking: false,
      hasElevator: false,
      moveInDate: '즉시'
    },
    {
      id: 6,
      title: '신촌 신축 원룸',
      description: '올해 완공, 최신 시설, 대학가 근처 좋은 위치입니다.',
      monthlyRent: 75,
      deposit: 500,
      maintenanceFee: 6,
      area: 20,
      floor: '5/12층',
      location: '서대문구 신촌동',
      subway: '신촌역 3분',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      propertyType: '원룸',
      rooms: '원룸',
      isNew: true,
      hasParking: false,
      hasElevator: true,
      moveInDate: '즉시'
    }
  ];

  useEffect(() => {
    // 임시로 로딩 시뮬레이션
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  // 필터링된 매물 목록
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '전체' || property.propertyType === selectedType;
    const matchesRooms = selectedRooms === '전체' || property.rooms === selectedRooms;
    return matchesSearch && matchesType && matchesRooms;
  });

  // 정렬된 매물 목록
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'price_low':
        return (a.monthlyRent || a.deposit/100) - (b.monthlyRent || b.deposit/100);
      case 'price_high':
        return (b.monthlyRent || b.deposit/100) - (a.monthlyRent || a.deposit/100);
      case 'area':
        return b.area - a.area;
      default:
        return 0;
    }
  });

  const formatPrice = (monthlyRent, deposit) => {
    if (monthlyRent === 0) {
      return `전세 ${deposit.toLocaleString()}만`;
    }
    return `월세 ${deposit.toLocaleString()}/${monthlyRent}만`;
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-800 font-medium">매물 정보를 불러오는 중...</p>
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
            <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">부동산</h1>

            {/* 검색바 */}
            <div className="relative mb-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center space-x-3 hover:border-purple-300 focus-within:border-purple-300 transition-all duration-200">
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
                  placeholder="지역이나 매물 특징을 검색해보세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-gray-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* 필터 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-purple-300 transition-all duration-200"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={selectedRooms}
                onChange={(e) => setSelectedRooms(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-purple-300 transition-all duration-200"
              >
                {roomOptions.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-purple-300 transition-all duration-200"
              >
                <option value="latest">최신순</option>
                <option value="price_low">낮은 가격순</option>
                <option value="price_high">높은 가격순</option>
                <option value="area">넓은 평수순</option>
              </select>
            </div>

            {/* 결과 개수 */}
            <p className="text-slate-600 text-center mb-8 text-sm">
              총 <span className="font-semibold text-slate-800">{sortedProperties.length}개</span>의 매물
            </p>
          </div>
        </div>
      </div>

      {/* 매물 목록 */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <p className="text-slate-800 text-lg mb-2 font-medium">검색 결과가 없습니다</p>
            <p className="text-slate-600">다른 조건으로 검색해보세요</p>
          </div>
        ) : (
          <div className="space-y-16">
            {sortedProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* 매물 이미지 */}
                <div className="relative h-48">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* 신축 배지 */}
                  {property.isNew && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      신축
                    </div>
                  )}
                  
                  {/* 입주일 */}
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    입주: {property.moveInDate}
                  </div>
                </div>

                <div className="p-6">
                  {/* 매물 정보 */}
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800 text-lg mb-2">
                      {property.title}
                    </h3>
                    
                    {/* 가격 정보 */}
                    <div className="text-xl font-bold text-purple-600 mb-2">
                      {formatPrice(property.monthlyRent, property.deposit)}
                      <span className="text-sm font-normal text-slate-600 ml-2">
                        관리비 {property.maintenanceFee}만
                      </span>
                    </div>

                    {/* 면적 및 층수 */}
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {property.area}㎡
                      </span>
                      <span>{property.floor}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {property.rooms}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    {/* 편의시설 */}
                    <div className="flex items-center space-x-3 mb-4">
                      {property.hasParking && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          🅿️ 주차
                        </span>
                      )}
                      {property.hasElevator && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          🛗 엘리베이터
                        </span>
                      )}
                    </div>

                    {/* 위치 및 교통 */}
                    <div className="flex items-center text-xs text-slate-500 mb-4">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{property.location}</span>
                      <span className="ml-3 text-blue-600">🚇 {property.subway}</span>
                    </div>

                    <div className="text-xs text-slate-500">
                      {formatTimeAgo(property.createdAt)}
                    </div>

                    {/* 문의 버튼 */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <button className="bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                        문의하기
                      </button>
                      <button className="border border-purple-500 text-purple-500 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                        관심등록
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

export default RealEstatePage; 