import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-b from-orange-50/80 to-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
              우리 동네
              <span className="text-gradient"> 중고거래</span>
            </h1>
            <p className="text-lg text-slate-600 mb-12">
              동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요
            </p>
            
            {/* 아이콘 중심 버튼들 */}
            <div className="flex justify-center gap-12 max-w-md mx-auto">
              <Link 
                href="/products"
                className="group flex flex-col items-center space-y-3"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-slate-800 font-medium text-sm group-hover:text-orange-600 transition-colors">
                  중고거래 둘러보기
                </span>
              </Link>
              
              <Link 
                href="/sell"
                className="group flex flex-col items-center space-y-3"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-slate-800 font-medium text-sm group-hover:text-green-600 transition-colors">
                  내 물건 팔기
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 - 미니멀 */}
      <section className="py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">
              안전하고 편리한 거래
            </h2>
            <p className="text-white/80">
              이웃과 함께하는 따뜻한 중고거래
            </p>
          </div>

          {/* 세로 스크롤 기능들 */}
          <div className="space-y-6">
            {[
              {
                icon: '📍',
                title: '우리 동네 거래',
                desc: '가까운 거리에서 직거래'
              },
              {
                icon: '🛡️',
                title: '안전한 거래',
                desc: '실명 인증과 거래 후기'
              },
              {
                icon: '💬',
                title: '편리한 채팅',
                desc: '실시간 채팅으로 빠른 소통'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-green-100/50 hover:shadow-md transition-all duration-300 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-green-100 rounded-xl flex items-center justify-center text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-base">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 카테고리 섹션 - 세로 레이아웃 */}
      <section className="bg-white/80 backdrop-blur-sm py-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              인기 카테고리
            </h2>
            <p className="text-lg text-slate-600">
              지금 가장 많이 거래되고 있는 카테고리들
            </p>
          </div>

          {/* 세로 스크롤 카테고리 */}
          <div className="space-y-8">
            {[
              { name: '디지털기기', icon: '📱', count: '1,234' },
              { name: '가구/인테리어', icon: '🪑', count: '856' },
              { name: '여성의류', icon: '👗', count: '2,103' },
              { name: '남성의류', icon: '👔', count: '1,567' },
              { name: '생활가전', icon: '🔌', count: '789' },
              { name: '유아동', icon: '🧸', count: '432' },
              { name: '도서/음반', icon: '📚', count: '678' },
              { name: '스포츠/레저', icon: '⚽', count: '543' }
            ].map((category, index) => (
              <Link 
                key={index}
                href={`/products?category=${category.name}`}
                className="block animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 hover:border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex items-center space-x-4">
                    {/* 아이콘 */}
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-green-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    
                    {/* 카테고리 정보 */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 text-lg group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-500">{category.count}개 상품</p>
                    </div>

                    {/* 화살표 아이콘 */}
                    <div className="w-6 h-6 text-slate-400 group-hover:text-orange-500 transition-colors">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
