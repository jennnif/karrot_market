'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SellPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '전체',
    tradeType: 'sell', // 'sell' or 'share'
    images: []
  });
  const [aiMode, setAiMode] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const categories = [
    '전체', '디지털기기', '가구/인테리어', '여성의류', '남성의류',
    '생활가전', '유아동', '도서/음반', '스포츠/레저', '기타'
  ];

  const commonPhrases = [
    '직거래 우선',
    '택배거래 가능',
    '상태 양호함',
    '급처분합니다',
    '네고 불가',
    '교환 불가',
    '반품 불가',
    '문의 환영'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 10) {
      alert('이미지는 최대 10장까지 업로드 가능합니다.');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, {
            id: Date.now() + Math.random(),
            url: event.target.result,
            file: file
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const addCommonPhrase = (phrase) => {
    const currentDescription = formData.description;
    const newDescription = currentDescription 
      ? `${currentDescription}\n\n${phrase}` 
      : phrase;
    handleInputChange('description', newDescription);
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formData.description.trim()) {
      alert('상품 설명을 입력해주세요.');
      return;
    }
    if (formData.tradeType === 'sell' && !formData.price) {
      alert('가격을 입력해주세요.');
      return;
    }

    // 상품 데이터 생성
    const newProduct = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      price: formData.tradeType === 'sell' ? formData.price : 0,
      category: formData.category,
      tradeType: formData.tradeType,
      images: formData.images,
      status: 'selling',
      createdAt: new Date().toISOString(),
      location: '강남구 역삼동' // 실제로는 사용자 위치
    };

    // localStorage에 저장
    const existingProducts = JSON.parse(localStorage.getItem('myProducts') || '[]');
    const updatedProducts = [newProduct, ...existingProducts];
    localStorage.setItem('myProducts', JSON.stringify(updatedProducts));

    // 전체 상품 목록에도 추가 (시뮬레이션)
    const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
    const updatedAllProducts = [newProduct, ...allProducts];
    localStorage.setItem('allProducts', JSON.stringify(updatedAllProducts));

    // 임시저장 데이터 삭제
    localStorage.removeItem('tempProduct');
    
    alert('상품이 성공적으로 등록되었습니다!');
    router.push('/my');
  };

  const handleTempSave = () => {
    localStorage.setItem('tempProduct', JSON.stringify(formData));
    alert('임시저장되었습니다.');
  };

  // 컴포넌트 마운트 시 임시저장된 데이터 복구
  useEffect(() => {
    const tempProduct = localStorage.getItem('tempProduct');
    if (tempProduct) {
      const parsedData = JSON.parse(tempProduct);
      setFormData(parsedData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">내 물건 팔기</h1>
          <button 
            onClick={handleTempSave}
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
          >
            임시저장
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white min-h-screen">
        <div className="p-4 space-y-6">
          {/* AI 작성하기 토글 */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-white text-purple-600 text-xs px-2 py-1 rounded font-medium">
                Beta
              </span>
              <span className="text-white font-medium">AI로 작성하기</span>
            </div>
            <button
              onClick={() => setAiMode(!aiMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                aiMode ? 'bg-white' : 'bg-white bg-opacity-30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-purple-500 transition-transform ${
                  aiMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 이미지 업로드 */}
          <div>
            <div className="grid grid-cols-5 gap-2">
              {/* 업로드 버튼 */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors ${
                    isDragOver ? 'border-orange-500 bg-orange-50' : ''
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    const files = Array.from(e.dataTransfer.files);
                    if (files.length > 0) {
                      handleImageUpload({ target: { files } });
                    }
                  }}
                >
                  <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">
                    {formData.images.length}/10
                  </span>
                </label>
              </div>

              {/* 업로드된 이미지들 */}
              {formData.images.map((image, index) => (
                <div key={image.id} className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={`상품 이미지 ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-1 left-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded">
                      대표
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">제목</label>
            <input
              type="text"
              placeholder="글 제목"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              maxLength={100}
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">카테고리</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* 가격 (판매일 때만) */}
          {formData.tradeType === 'sell' && (
            <div>
              <label className="block text-gray-900 font-medium mb-2">가격</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="가격을 입력하세요"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
              </div>
            </div>
          )}

          {/* 자세한 설명 */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">자세한 설명</label>
            <textarea
              placeholder="합정동에 올릴 게시글 내용을 작성해 주세요.&#10;(판매 금지 물품은 게시가 제한될 수 있어요.)&#10;&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요. 과학기술정보통신부, 한국 인터넷진흥원과 함께 해요."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
            />
          </div>

          {/* 자주 쓰는 문구 */}
          <div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors mb-3">
              자주 쓰는 문구
            </button>
            <div className="flex flex-wrap gap-2">
              {commonPhrases.map((phrase, index) => (
                <button
                  key={index}
                  onClick={() => addCommonPhrase(phrase)}
                  className="text-sm bg-gray-50 text-gray-700 px-3 py-1 rounded-full border border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-colors"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* 거래 방식 */}
          <div>
            <label className="block text-gray-900 font-medium mb-3">거래 방식</label>
            <div className="flex space-x-3">
              <button
                onClick={() => handleInputChange('tradeType', 'sell')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  formData.tradeType === 'sell'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                판매하기
              </button>
              <button
                onClick={() => handleInputChange('tradeType', 'share')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  formData.tradeType === 'share'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                나눔하기
              </button>
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellPage; 