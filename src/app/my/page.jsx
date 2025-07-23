'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MyPage = () => {
  const [user, setUser] = useState({
    name: 'skyblue00',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    location: '강남구 역삼동',
    temperature: 36.8,
    rating: 4.8,
    reviewCount: 23,
    joinDate: '2023년 3월'
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [editingProfile, setEditingProfile] = useState({
    name: '',
    profileImage: '',
    newImageFile: null
  });

  // 스토리 데이터
  const stories = [
    {
      id: 1,
      author: '동네친구',
      location: '강남구 역삼동',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450',
      content: '오늘 한강에서 피크닉! 날씨가 너무 좋아요 🌞',
      time: '2시간 전'
    },
    {
      id: 2,
      author: '카페사장',
      location: '강남구 논현동',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=450',
      content: '새로운 원두가 들어왔어요! 시음 이벤트 중 ☕',
      time: '5시간 전'
    },
    {
      id: 3,
      author: '헬스매니아',
      location: '서초구 서초동',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450',
      content: '홈트레이닝 루틴 공유! 같이 운동해요 💪',
      time: '8시간 전'
    },
    {
      id: 4,
      author: '요리왕',
      location: '송파구 잠실동',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=450',
      content: '오늘 저녁 메뉴 추천! 집에서 만든 파스타 🍝',
      time: '12시간 전'
    }
  ];

  // 이벤트 데이터
  const events = [
    {
      id: 1,
      title: '🎉 당근마켓 5주년 기념 이벤트',
      content: '거래 완료 시 당근페이 포인트 2배 적립!',
      buttonText: '참여하기',
      bgColor: 'bg-orange-500'
    },
    {
      id: 2,
      title: '🛍️ 봄맞이 대청소 이벤트',
      content: '사용하지 않는 물건들을 이웃과 나눠보세요',
      buttonText: '구경하기',
      bgColor: 'bg-green-500'
    },
    {
      id: 3,
      title: '🏆 이달의 신뢰 거래왕',
      content: '매너 온도 36.5도 이상 유지 시 혜택 증정',
      buttonText: '확인하기',
      bgColor: 'bg-blue-500'
    }
  ];

  useEffect(() => {
    // localStorage에서 사용자 정보 가져오기
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({...parsedUser, temperature: parsedUser.temperature || 36.8});
    }

    // 랜덤으로 이벤트 팝업 표시 (30% 확률)
    if (Math.random() < 0.3) {
      setTimeout(() => {
        setShowEventModal(true);
      }, 2000);
    }
  }, []);

  const openProfileModal = () => {
    setEditingProfile({
      name: user.name,
      profileImage: user.profileImage,
      newImageFile: null
    });
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setEditingProfile({
      name: '',
      profileImage: '',
      newImageFile: null
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditingProfile(prev => ({
          ...prev,
          profileImage: reader.result,
          newImageFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name: editingProfile.name,
      profileImage: editingProfile.profileImage
    };
    
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    closeProfileModal();
  };

  const openStoryModal = () => {
    setCurrentStoryIndex(0);
    setShowStoryModal(true);
  };

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setShowStoryModal(false);
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const openEventModal = () => {
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
  };

  const randomEvent = events[Math.floor(Math.random() * events.length)];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">나의 당근</h1>
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* 프로필 섹션 */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 relative">
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">{user.name}</span>
                  <span className="text-orange-500 font-bold">{user.temperature}°C</span>
                </div>
                <p className="text-sm text-gray-500">{user.location}</p>
              </div>
            </div>
            <button onClick={openProfileModal}>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 당근페이 섹션 */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">pay</span>
            </div>
            <span className="text-gray-600 text-sm">700만명이 믿고 이용하는 <span className="font-bold">당근페이</span></span>
          </div>
          <Link href="/" className="block w-full">
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              안전한 거래 시작하기
            </button>
          </Link>
        </div>

        {/* 서비스 섹션 */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-900">서비스</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Link href="/products" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">중고거래</span>
            </Link>

            <Link href="/jobs" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">알바</span>
            </Link>

            <Link href="/realestate" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">부동산</span>
            </Link>

            <Link href="/cars" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">중고차</span>
            </Link>

            <Link href="/groups" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">모임</span>
            </Link>

            <button onClick={openStoryModal} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-9a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">스토리</span>
            </button>
          </div>
        </div>

        {/* 관심목록, 최근 본 글, 이벤트 */}
        <div className="p-4 border-b border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <Link href="/my/favorites" className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">관심목록</span>
            </Link>

            <Link href="/my/recent" className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">최근 본 글</span>
            </Link>

            <button onClick={openEventModal} className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">이벤트</span>
            </button>
          </div>
        </div>

        {/* 나의 거래 */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">나의 거래</h2>
          
          <Link href="/my/selling" className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">판매내역</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link href="/my/buying" className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-gray-900 font-medium">구매내역</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* 여백 */}
        <div className="h-20"></div>
      </div>

      {/* 스토리 모달 */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full max-w-sm mx-4">
            {/* 스토리 진행 바 */}
            <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full ${
                    index <= currentStoryIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 z-10 text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 스토리 이미지 */}
            <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={stories[currentStoryIndex].imageUrl}
                alt="스토리"
                fill
                className="object-cover"
              />
              
              {/* 스토리 정보 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium text-sm">{stories[currentStoryIndex].author}</p>
                    <p className="text-white/70 text-xs">{stories[currentStoryIndex].location}</p>
                  </div>
                  <span className="text-white/70 text-xs ml-auto">{stories[currentStoryIndex].time}</span>
                </div>
                <p className="text-white text-sm">{stories[currentStoryIndex].content}</p>
              </div>

              {/* 이전/다음 터치 영역 */}
              <button
                onClick={prevStory}
                className="absolute left-0 top-0 w-1/3 h-full"
                disabled={currentStoryIndex === 0}
              />
              <button
                onClick={nextStory}
                className="absolute right-0 top-0 w-2/3 h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* 이벤트 모달 */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className={`w-16 h-16 ${randomEvent.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{randomEvent.title}</h3>
            <p className="text-gray-600 mb-6">{randomEvent.content}</p>
            <div className="flex space-x-3">
              <button
                onClick={closeEventModal}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={closeEventModal}
                className={`flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors ${randomEvent.bgColor}`}
              >
                {randomEvent.buttonText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 프로필 수정 모달 */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">프로필 수정</h2>
              <button
                onClick={closeProfileModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* 프로필 이미지 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 relative">
                  <Image
                    src={editingProfile.profileImage}
                    alt="프로필"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <label className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <span>사진 변경</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
                  placeholder="이름을 입력하세요"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={closeProfileModal}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={saveProfile}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage; 