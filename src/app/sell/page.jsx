'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SellPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    location: '강남구 역삼동'
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 주요 카테고리만 간소화
  const categories = [
    '디지털기기', '가구/인테리어', '여성의류', '남성의류', 
    '생활가전', '유아동', '도서/음반', '스포츠/레저', '기타'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length <= 10) {
      const newImages = files.map(file => ({
        file,
        url: URL.createObjectURL(file),
        id: Date.now() + Math.random()
      }));
      setImages(prev => [...prev, ...newImages]);
    } else {
      alert('사진은 최대 10장까지 업로드할 수 있습니다.');
    }
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.price || !formData.description) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (images.length === 0) {
      alert('최소 1장의 사진을 업로드해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    // 여기서 실제 API 호출을 할 수 있습니다
    setTimeout(() => {
      alert('상품이 등록되었습니다!');
      router.push('/products');
    }, 1500);
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={() => router.back()} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🥕</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">당근마켓</span>
              </Link>
            </div>

            <h1 className="text-lg font-bold text-gray-900">내 물건 팔기</h1>

            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-6 py-12">
        {/* 사진 업로드 */}
        <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">상품 사진</h2>
          
          <div className="grid grid-cols-5 gap-4">
            {/* 업로드 버튼 */}
            <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-500">{images.length}/10</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* 업로드된 이미지들 */}
            {images.map((image, index) => (
              <div key={image.id} className="relative aspect-square">
                <img
                  src={image.url}
                  alt={`상품 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    대표
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-70"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">기본 정보</h2>
          
          <div className="space-y-6">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="상품명을 입력해주세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                maxLength={100}
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">카테고리를 선택해주세요</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* 거래지역 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">거래지역</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* 가격 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                가격 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatPrice(formData.price)}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="가격을 입력해주세요"
                  className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 상품설명 */}
        <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">상품설명</h2>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="상품 설명을 입력해주세요. 브랜드, 모델명, 구입시기, 사용감, 하자 유무 등"
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            maxLength={2000}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">신뢰할 수 있는 거래를 위해 자세히 써주세요</p>
            <p className="text-sm text-gray-500">{formData.description.length}/2000</p>
          </div>
        </div>

        {/* 등록하기 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {isSubmitting ? '등록 중...' : '작성 완료'}
        </button>
      </form>
    </div>
  );
};

export default SellPage; 