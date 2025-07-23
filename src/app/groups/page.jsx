'use client';

import { useState, useEffect } from 'react';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedTime, setSelectedTime] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

  // 모임 카테고리
  const categories = ['전체', '운동/헬스', '취미/문화', '스터디', '친목/소통', '요리/맛집', '반려동물', '육아/맘카페', '기타'];
  
  // 모임 시간
  const timeOptions = ['전체', '평일 오전', '평일 오후', '평일 저녁', '주말 오전', '주말 오후', '주말 저녁'];

  // 임시 모임 데이터
  const mockGroups = [
    {
      id: 1,
      title: '강남 러닝크루 🏃‍♂️',
      description: '매주 화, 목 저녁 7시 한강에서 러닝하는 모임입니다. 초보자도 환영!',
      category: '운동/헬스',
      location: '강남구 역삼동',
      meetingTime: '평일 저녁',
      schedule: '매주 화/목 19:00',
      participants: 24,
      maxParticipants: 30,
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      hostName: '런너킹',
      isPopular: true,
      tags: ['러닝', '건강', '한강', '초보환영'],
      nextMeeting: '2024.03.21 19:00'
    },
    {
      id: 2,
      title: '홍대 보드게임 모임 🎲',
      description: '다양한 보드게임을 즐기는 모임! 매주 새로운 게임으로 재미있게 놀아요.',
      category: '취미/문화',
      location: '마포구 홍대입구',
      meetingTime: '주말 오후',
      schedule: '매주 토 14:00',
      participants: 18,
      maxParticipants: 20,
      imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      hostName: '게임마스터',
      isPopular: false,
      tags: ['보드게임', '친목', '실내활동'],
      nextMeeting: '2024.03.23 14:00'
    },
    {
      id: 3,
      title: '토익 스터디 그룹 📚',
      description: 'TOEIC 800점 목표! 함께 공부하며 동기부여 받아요. 매일 단어시험',
      category: '스터디',
      location: '서초구 서초동',
      meetingTime: '평일 저녁',
      schedule: '매일 19:30',
      participants: 12,
      maxParticipants: 15,
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      hostName: '영어왕',
      isPopular: true,
      tags: ['토익', '영어', '스터디', '시험준비'],
      nextMeeting: '2024.03.20 19:30'
    },
    {
      id: 4,
      title: '맛집 탐방 모임 🍽️',
      description: '매주 새로운 맛집을 발굴하고 함께 식사하는 모임입니다. 미식가들 환영!',
      category: '요리/맛집',
      location: '송파구 잠실동',
      meetingTime: '주말 저녁',
      schedule: '매주 토 18:00',
      participants: 16,
      maxParticipants: 25,
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      hostName: '푸드헌터',
      isPopular: false,
      tags: ['맛집', '식사', '친목', '미식'],
      nextMeeting: '2024.03.24 18:00'
    },
    {
      id: 5,
      title: '반려견 산책 모임 🐕',
      description: '강아지들과 함께 공원에서 산책하고 정보 공유하는 모임입니다.',
      category: '반려동물',
      location: '용산구 이태원동',
      meetingTime: '주말 오전',
      schedule: '매주 일 10:00',
      participants: 20,
      maxParticipants: 30,
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      hostName: '댕댕이맘',
      isPopular: true,
      tags: ['반려견', '산책', '공원', '펫케어'],
      nextMeeting: '2024.03.25 10:00'
    },
    {
      id: 6,
      title: '육아맘 카페 모임 ☕',
      description: '육아 정보 공유하고 아이들과 함께 놀 수 있는 편안한 모임입니다.',
      category: '육아/맘카페',
      location: '강동구 천호동',
      meetingTime: '평일 오후',
      schedule: '매주 수 15:00',
      participants: 14,
      maxParticipants: 20,
      imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      hostName: '슈퍼맘',
      isPopular: false,
      tags: ['육아', '맘카페', '아이', '정보공유'],
      nextMeeting: '2024.03.22 15:00'
    }
  ];

  useEffect(() => {
    // 임시로 로딩 시뮬레이션
    setTimeout(() => {
      setGroups(mockGroups);
      setLoading(false);
    }, 1000);
  }, []);

  // 필터링된 모임 목록
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '전체' || group.category === selectedCategory;
    const matchesTime = selectedTime === '전체' || group.meetingTime === selectedTime;
    return matchesSearch && matchesCategory && matchesTime;
  });

  // 정렬된 모임 목록
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return b.participants - a.participants;
      case 'upcoming':
        return new Date(a.nextMeeting) - new Date(b.nextMeeting);
      default:
        return 0;
    }
  });

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}일 전`;
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const getParticipationRate = (current, max) => {
    return Math.round((current / max) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-800 font-medium">모임 정보를 불러오는 중...</p>
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
            <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">동네 모임</h1>

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
                  placeholder="관심있는 모임을 검색해보세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-gray-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* 필터 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-300 transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-300 transition-all duration-200"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-300 transition-all duration-200"
              >
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
                <option value="upcoming">모임 임박순</option>
              </select>
            </div>

            {/* 결과 개수 */}
            <p className="text-slate-600 text-center mb-8 text-sm">
              총 <span className="font-semibold text-slate-800">{sortedGroups.length}개</span>의 모임
            </p>
          </div>
        </div>
      </div>

      {/* 모임 목록 */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedGroups.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-slate-800 text-lg mb-2 font-medium">검색 결과가 없습니다</p>
            <p className="text-slate-600">다른 조건으로 검색해보세요</p>
          </div>
        ) : (
          <div className="space-y-16">
            {sortedGroups.map((group, index) => (
              <div 
                key={group.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-orange-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* 모임 이미지 */}
                <div className="relative h-48">
                  <img
                    src={group.imageUrl}
                    alt={group.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* 인기 배지 */}
                  {group.isPopular && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      🔥 인기
                    </div>
                  )}
                  
                  {/* 참여율 */}
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {group.participants}/{group.maxParticipants}명
                  </div>
                </div>

                <div className="p-6">
                  {/* 모임 정보 */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-800 text-lg">
                        {group.title}
                      </h3>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {group.category}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                      {group.description}
                    </p>

                    {/* 모임 일정 */}
                    <div className="bg-orange-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-orange-600 font-medium">다음 모임</div>
                          <div className="text-sm font-bold text-orange-800">{group.nextMeeting}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-orange-600">정기 일정</div>
                          <div className="text-sm font-medium text-orange-800">{group.schedule}</div>
                        </div>
                      </div>
                    </div>

                    {/* 참여 현황 */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">참여 현황</span>
                        <span className="font-medium">{getParticipationRate(group.participants, group.maxParticipants)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getParticipationRate(group.participants, group.maxParticipants)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 태그들 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 위치 및 호스트 정보 */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span>호스트: {group.hostName}</span>
                        <span className="ml-3">{formatTimeAgo(group.createdAt)}</span>
                      </div>
                    </div>

                    {/* 참여 버튼 */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                        참여하기
                      </button>
                      <button className="border border-orange-500 text-orange-500 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                        관심표시
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

export default GroupsPage; 