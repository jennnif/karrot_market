import Link from "next/link";

export default function Home() {
  // 주요 카테고리만 8개로 줄임 - 각각 다른 색상 적용
  const categories = [
    { name: '디지털기기', icon: '📱', href: '/products?category=digital', bgColor: 'bg-blue-100', hoverColor: 'hover:bg-blue-200' },
    { name: '가구/인테리어', icon: '🪑', href: '/products?category=furniture', bgColor: 'bg-purple-100', hoverColor: 'hover:bg-purple-200' },
    { name: '여성의류', icon: '👗', href: '/products?category=women-clothing', bgColor: 'bg-pink-100', hoverColor: 'hover:bg-pink-200' },
    { name: '남성의류', icon: '👔', href: '/products?category=men-clothing', bgColor: 'bg-indigo-100', hoverColor: 'hover:bg-indigo-200' },
    { name: '생활가전', icon: '🔌', href: '/products?category=electronics', bgColor: 'bg-green-100', hoverColor: 'hover:bg-green-200' },
    { name: '유아동', icon: '🧸', href: '/products?category=baby', bgColor: 'bg-yellow-100', hoverColor: 'hover:bg-yellow-200' },
    { name: '스포츠/레저', icon: '⚽', href: '/products?category=sports', bgColor: 'bg-red-100', hoverColor: 'hover:bg-red-200' },
    { name: '도서/음반', icon: '📚', href: '/products?category=books', bgColor: 'bg-orange-100', hoverColor: 'hover:bg-orange-200' }
  ];

  return (
    <>
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
              <Link href="/my" className="text-gray-600 hover:text-gray-900 font-medium">
                나의 당근
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                로그인
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="bg-white">
        {/* 히어로 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              우리 동네
              <br />
              중고거래 당근마켓
            </h1>
            <p className="text-xl text-gray-600 mb-16 leading-relaxed">
              믿을만한 이웃간 중고거래<br />
              이제 가깝고 따뜻한 거래를 경험해보세요
            </p>
            
            <div className="flex justify-center gap-8">
              <Link href="/products" className="group">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🛍️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">중고거래 둘러보기</h3>
                  <p className="text-gray-600 text-sm">우리 동네 상품들을 구경해보세요</p>
                </div>
              </Link>
              
              <Link href="/sell" className="group">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">내 물건 팔기</h3>
                  <p className="text-gray-600 text-sm">안 쓰는 물건을 올려보세요</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              카테고리별 상품 찾기
            </h2>
            
            <div className="grid grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  href={category.href}
                  className="group"
                >
                  <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                    <div className={`w-16 h-16 ${category.bgColor} ${category.hoverColor} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors`}>
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <p className="font-medium text-gray-700 group-hover:text-orange-600">
                      {category.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 안전한 거래 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              안전하고 편리한 거래
            </h2>
            <p className="text-lg text-gray-600 mb-16">
              당근마켓에서 믿을 수 있는 중고거래를 경험해보세요
            </p>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">안전한 결제</h3>
                <p className="text-gray-600">당근페이로 안전하게 거래하세요</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">가까운 거리</h3>
                <p className="text-gray-600">우리 동네 이웃과 직거래</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">실시간 채팅</h3>
                <p className="text-gray-600">빠르고 편리한 소통</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 모바일 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="grid grid-cols-4 h-16">
          <Link href="/" className="flex flex-col items-center justify-center text-orange-500">
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
          <Link href="/my" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">나의당근</span>
          </Link>
        </div>
      </div>
    </>
  );
}
