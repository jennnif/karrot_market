'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

  // 카테고리 목록
  const categories = [
    '전체', '카페/음식점', '편의점/마트', '배달/운전', '사무/관리',
    '판매/영업', '서비스', '과외/강사', '디자인', '기타'
  ];

  // 임시 알바 데이터
  const mockJobs = [
    {
      id: 1,
      title: '스타벅스 바리스타 구합니다',
      description: '경험 무관, 친절하신 분 환영! 주 3-4일 근무 가능합니다.',
      hourlyWage: 10000,
      workHours: '09:00 - 18:00',
      location: '강남구 역삼동',
      company: '스타벅스 역삼점',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: '카페/음식점',
      workType: '아르바이트',
      isUrgent: true
    },
    {
      id: 2,
      title: '편의점 야간 아르바이트',
      description: '야간 근무 가능하신 분! 조용한 환경에서 일할 수 있어요.',
      hourlyWage: 12000,
      workHours: '22:00 - 08:00',
      location: '서초구 서초동',
      company: 'CU 서초역점',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: '편의점/마트',
      workType: '아르바이트',
      isUrgent: false
    },
    {
      id: 3,
      title: '배달라이더 모집 (오토바이)',
      description: '시간당 15,000원! 유연한 근무시간, 주휴수당 지급',
      hourlyWage: 15000,
      workHours: '11:00 - 21:00 (협의)',
      location: '마포구 홍대입구',
      company: '배달의민족 홍대지점',
      imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: '배달/운전',
      workType: '아르바이트',
      isUrgent: true
    },
    {
      id: 4,
      title: '수학 과외 선생님',
      description: '중/고등학생 수학 과외, 경험자 우대, 주 2-3회',
      hourlyWage: 25000,
      workHours: '협의 가능',
      location: '송파구 잠실동',
      company: '개인',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      category: '과외/강사',
      workType: '과외',
      isUrgent: false
    },
    {
      id: 5,
      title: '카페 홀서빙 스태프',
      description: '주말 위주 근무, 밝고 성실하신 분 환영합니다!',
      hourlyWage: 11000,
      workHours: '10:00 - 19:00',
      location: '용산구 이태원동',
      company: '카페베네 이태원점',
      imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      category: '카페/음식점',
      workType: '아르바이트',
      isUrgent: false
    },
    {
      id: 6,
      title: '마케팅 어시스턴트',
      description: 'SNS 관리, 콘텐츠 제작 업무, 대학생 환영',
      hourlyWage: 13000,
      workHours: '14:00 - 18:00',
      location: '강남구 청담동',
      company: '(주)마케팅플러스',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      category: '사무/관리',
      workType: '인턴',
      isUrgent: true
    }
  ];

  useEffect(() => {
    // 임시로 로딩 시뮬레이션
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  // 필터링된 알바 목록
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 정렬된 알바 목록
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'salary':
        return b.hourlyWage - a.hourlyWage;
      case 'urgent':
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const formatWage = (wage) => {
    return `시급 ${wage.toLocaleString()}원`;
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-800 font-medium">알바 정보를 불러오는 중...</p>
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
            <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">알바 구인</h1>

            {/* 검색바 */}
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
                  placeholder="원하는 알바를 검색해보세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-gray-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* 필터 및 정렬 */}
            <div className="flex gap-3 mb-6">
              {/* 카테고리 필터 */}
              <div className="flex-1">
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

              {/* 정렬 */}
              <div className="flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-300 transition-all duration-200"
                >
                  <option value="latest">최신순</option>
                  <option value="salary">높은 시급순</option>
                  <option value="urgent">급구순</option>
                </select>
              </div>
            </div>

            {/* 결과 개수 */}
            <p className="text-slate-600 text-center mb-8 text-sm">
              총 <span className="font-semibold text-slate-800">{sortedJobs.length}개</span>의 구인정보
            </p>
          </div>
        </div>
      </div>

      {/* 알바 목록 */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedJobs.length === 0 ? (
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h8m-8 0v2a2 2 0 002 2h4a2 2 0 002-2V6m0 0H8"
                />
              </svg>
            </div>
            <p className="text-slate-800 text-lg mb-2 font-medium">검색 결과가 없습니다</p>
            <p className="text-slate-600">다른 검색어나 카테고리를 시도해보세요</p>
          </div>
        ) : (
          <div className="space-y-16">
            {sortedJobs.map((job, index) => (
              <div 
                key={job.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* 급구 배지 */}
                {job.isUrgent && (
                  <div className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-3 font-medium">
                    급구
                  </div>
                )}

                <div className="flex space-x-4">
                  {/* 회사 이미지 */}
                  <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                    <img
                      src={job.imageUrl}
                      alt={job.company}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 알바 정보 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-1">{job.company}</p>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {job.workType}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 mb-3 line-clamp-2">
                      {job.description}
                    </p>

                    {/* 시급 및 근무시간 */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-orange-600">
                        {formatWage(job.hourlyWage)}
                      </span>
                      <span className="text-sm text-slate-600">
                        {job.workHours}
                      </span>
                    </div>

                    {/* 위치 및 시간 */}
                    <div className="flex items-center text-xs text-slate-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{job.location}</span>
                      <span className="ml-3">{formatTimeAgo(job.createdAt)}</span>
                    </div>

                    {/* 지원 버튼 */}
                    <div className="mt-4">
                      <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                        지원하기
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

export default JobsPage; 