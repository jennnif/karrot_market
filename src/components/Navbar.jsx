'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  // 카테고리 목록
  const categories = [
    '디지털기기', '가구/인테리어', '여성의류', '남성의류',
    '생활가전', '유아동', '도서/음반', '스포츠/레저', '기타'
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">🥕</span>
            </div>
            <span className="ml-2 text-xl font-bold text-slate-800">당근마켓</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-slate-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-orange-50 rounded-lg"
            >
              중고거래
            </Link>
            <Link 
              href="/chat" 
              className="text-slate-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-orange-50 rounded-lg"
            >
              채팅
            </Link>
            <Link 
              href="/my" 
              className="text-slate-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-orange-50 rounded-lg"
            >
              나의 당근
            </Link>
          </div>

          {/* 버튼들 */}
          <div className="flex items-center space-x-3">
            {/* 글쓰기 버튼 - 박스 모양 */}
            <Link 
              href="/sell"
              className="hidden sm:block px-4 py-2 border-2 border-gray-300 rounded-xl text-sm font-medium text-slate-900 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
            >
              글쓰기
            </Link>
            
            {/* 사용자 아이콘 - 드롭다운 메뉴 */}
            <div className="relative">
              <button 
                className="text-slate-700 hover:text-orange-500 p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              {/* 드롭다운 메뉴 */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="py-2">
                    <Link 
                      href="/my"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      마이페이지
                    </Link>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      onClick={() => {
                        // 로그아웃 로직 추가
                        alert('로그아웃 되었습니다.');
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 햄버거 메뉴 */}
          <div className="relative">
            <button 
              className="text-slate-700 hover:text-orange-500 p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
              onMouseEnter={() => setIsHamburgerMenuOpen(true)}
              onMouseLeave={() => setIsHamburgerMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* 햄버거 드롭다운 메뉴 */}
            {isHamburgerMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                onMouseEnter={() => setIsHamburgerMenuOpen(true)}
                onMouseLeave={() => setIsHamburgerMenuOpen(false)}
              >
                <div className="py-2">
                  {/* 중고거래 */}
                  <Link 
                    href="/products"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="font-medium">중고거래</span>
                    </div>
                  </Link>

                  {/* 카테고리별 */}
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="font-medium text-sm text-slate-700">카테고리별</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 ml-8">
                        {categories.map((category, index) => (
                          <Link
                            key={index}
                            href={`/products?category=${encodeURIComponent(category)}`}
                            className="text-xs text-slate-600 hover:text-orange-600 py-1 hover:bg-orange-50 rounded px-2 transition-colors"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 관심목록 */}
                  <Link 
                    href="/my/favorites"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-medium">관심목록</span>
                    </div>
                  </Link>

                  {/* 최근 본 글 */}
                  <Link 
                    href="/my/recent"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">최근 본 글</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 