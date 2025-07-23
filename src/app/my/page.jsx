'use client';

import { useState } from 'react';
import Link from 'next/link';

const MyPage = () => {
  const [currentLocation, setCurrentLocation] = useState('강남구 역삼동');
  const [temperature, setTemperature] = useState(36.8);

  // 주요 서비스만 4개로 간소화
  const services = [
    { name: '알바', icon: '💼', href: '/jobs' },
    { name: '부동산', icon: '🏠', href: '/realestate' },
    { name: '중고차', icon: '🚗', href: '/cars' },
    { name: '전문가찾기', icon: '🔧', href: '/experts' }
  ];

  // 메뉴 간소화
  const myMenus = [
    { name: '판매내역', icon: '📦', href: '/my/selling' },
    { name: '구매내역', icon: '🛍️', href: '/my/buying' },
    { name: '관심목록', icon: '❤️', href: '/my/wishlist' },
    { name: '받은 후기', icon: '⭐', href: '/my/reviews' },
    { name: '설정', icon: '⚙️', href: '/my/settings' },
    { name: '고객센터', icon: '💬', href: '/help' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🥕</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">당근마켓</span>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <Link href="/products" className="text-gray-600 hover:text-gray-900 font-medium">
                중고거래
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-gray-900 font-medium">
                채팅
              </Link>
              <Link href="/my" className="text-orange-500 font-medium">
                나의 당근
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 프로필 섹션 */}
        <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                alt="프로필"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">김민수</h1>
                <p className="text-gray-600">{currentLocation}</p>
              </div>
            </div>
            <Link href="/my/profile" className="text-orange-500 hover:text-orange-600 font-medium">
              프로필 수정
            </Link>
          </div>

          {/* 매너온도 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">매너온도</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-orange-500">{temperature}°C</span>
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${(temperature / 100) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              첫 온도 36.5°C에서 시작해서 매너 거래를 할수록 올라가요
            </p>
          </div>

          {/* 거래 통계 */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">12</p>
              <p className="text-sm text-gray-500">판매상품</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">24</p>
              <p className="text-sm text-gray-500">구매상품</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">85</p>
              <p className="text-sm text-gray-500">받은 후기</p>
            </div>
          </div>
        </div>

        {/* 나의 거래 */}
        <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">나의 거래</h2>
          <div className="grid grid-cols-2 gap-6">
            {myMenus.slice(0, 4).map((menu, index) => (
              <Link key={index} href={menu.href} className="group">
                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-2xl">{menu.icon}</span>
                  <span className="text-gray-700 group-hover:text-orange-600 font-medium">{menu.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 다양한 서비스 */}
        <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">다양한 서비스</h2>
          <div className="grid grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href} className="group">
                <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{service.icon}</span>
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 기타 메뉴 */}
        <div className="bg-white rounded-lg border border-gray-100 p-8">
          <div className="space-y-2">
            {myMenus.slice(4).map((menu, index) => (
              <Link key={index} href={menu.href} className="group">
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className="text-xl">{menu.icon}</span>
                    <span className="text-gray-700 group-hover:text-orange-600 font-medium">{menu.name}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 모바일 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="grid grid-cols-4 h-16">
          <Link href="/" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs">홈</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">🛍️</span>
            <span className="text-xs">중고거래</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">💬</span>
            <span className="text-xs">채팅</span>
          </Link>
          <Link href="/my" className="flex flex-col items-center justify-center text-orange-500">
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">나의당근</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage; 