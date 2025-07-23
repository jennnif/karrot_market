'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // 임시 상품 데이터 (실제로는 API에서 가져올 데이터)
  const mockProducts = {
    1: {
      id: 1,
      title: '아이폰 14 Pro 256GB 딥퍼플',
      description: `아이폰 14 Pro 256GB 딥퍼플 색상입니다.

구매한 지 6개월 정도 되었고, 항상 케이스와 보호필름을 사용해서 상태 양호합니다.

포함 물품:
- 아이폰 14 Pro 본체
- 원래 박스
- 라이트닝 케이블
- 충전 어댑터 (별도 구매)

배터리 성능: 94%
액정 깨짐이나 스크래치 없습니다.

직거래 우선이며, 택배 거래도 가능합니다.
문의사항 있으시면 채팅 주세요!`,
      price: 950000,
      location: '강남구 역삼동',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
      ],
      likes: 12,
      views: 156,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'available',
      category: '디지털기기',
      seller: {
        id: 'user123',
        name: '김민수',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        rating: 4.8,
        reviewCount: 23,
        responseTime: '보통 1시간 이내',
        location: '강남구 역삼동'
      }
    },
    2: {
      id: 2,
      title: '맥북 에어 M2 13인치 스페이스그레이',
      description: `맥북 에어 M2 13인치 스페이스그레이입니다.

구매일: 2023년 8월
사용 기간: 약 1년
상태: 매우 좋음

포함사항:
- 맥북 에어 본체
- 원래 박스 및 구성품
- MagSafe 3 충전 케이블
- 67W USB-C 전원 어댑터

주로 문서 작업용으로만 사용했고, 게임이나 무리한 작업은 하지 않았습니다.
외관상 기스나 손상 없이 깔끔합니다.

직거래 선호하며, 테스트 후 거래 가능합니다.`,
      price: 1200000,
      location: '서초구 서초동',
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
      ],
      likes: 8,
      views: 234,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'available',
      category: '디지털기기',
      seller: {
        id: 'user456',
        name: '이지현',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b75d9b7e?w=100',
        rating: 4.9,
        reviewCount: 31,
        responseTime: '보통 30분 이내',
        location: '서초구 서초동'
      }
    },
    3: {
      id: 3,
      title: '원목 책상 140cm',
      description: `원목 책상 140cm x 80cm 판매합니다.

구매처: 이케아
구매 가격: 25만원
사용 기간: 1년 6개월

상태:
- 전체적으로 깨끗함
- 모서리 일부 작은 흠집 있음 (사진 참조)
- 기능상 문제 없음

이사로 인해 급하게 판매합니다.
조립 분해 필요하며, 직거래만 가능합니다.

픽업 가능 시간: 평일 저녁, 주말 언제나`,
      price: 150000,
      location: '송파구 잠실동',
      images: [
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'
      ],
      likes: 3,
      views: 89,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'reserved',
      category: '가구/인테리어',
      seller: {
        id: 'user789',
        name: '박준호',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 4.7,
        reviewCount: 15,
        responseTime: '보통 2시간 이내',
        location: '송파구 잠실동'
      }
    },
    4: {
      id: 4,
      title: '나이키 에어포스 270 새상품',
      description: `나이키 에어포스 270mm 새상품입니다.

구매처: 나이키 공식몰
구매 가격: 12만원
상태: 새상품 (미착용)

제품 정보:
- 사이즈: 270mm
- 색상: 화이트/블랙
- 박스 포함 (라벨, 영수증 있음)
- 여분 신발끈 포함

새상품이지만 사이즈가 안맞아서 판매합니다.
직거래, 택배 모두 가능하며 착불도 가능합니다.

실제 착용해보시고 구매 결정하셔도 됩니다.`,
      price: 80000,
      location: '마포구 홍대입구',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
      ],
      likes: 15,
      views: 267,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'sold',
      category: '남성의류',
      seller: {
        id: 'user202',
        name: '정민호',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        rating: 4.6,
        reviewCount: 18,
        responseTime: '보통 3시간 이내',
        location: '마포구 홍대입구'
      }
    },
    5: {
      id: 5,
      title: '다이슨 청소기 V11',
      description: `다이슨 V11 무선 청소기 판매합니다.

구매일: 2023년 3월
모델: Dyson V11 Absolute
사용 기간: 1년 정도

포함사항:
- 다이슨 V11 본체
- 충전 거치대
- 다양한 헤드 (바닥용, 틈새용, 매트리스용 등)
- 새 필터 (추가 구매한 것)
- 원래 박스

사용한지 1년 정도 되었고, 필터까지 새거로 교체해서 드립니다.
흡입력 여전히 강하고 배터리도 정상 작동합니다.

이사로 인한 급매이며, 직거래 우선입니다.`,
      price: 300000,
      location: '용산구 이태원동',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
      ],
      likes: 6,
      views: 143,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'available',
      category: '생활가전',
      seller: {
        id: 'user303',
        name: '최수진',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        rating: 4.8,
        reviewCount: 26,
        responseTime: '보통 1시간 이내',
        location: '용산구 이태원동'
      }
    },
    6: {
      id: 6,
      title: '조던 1 하이 시카고 280mm',
      description: `에어 조던 1 하이 시카고 280mm 판매합니다.

구매처: 나이키 SNKRS 
구매일: 2023년 11월
사이즈: 280mm
상태: 중고 (착용 5회 정도)

포함사항:
- 조던 1 하이 본체
- 원래 박스 
- 여분 신발끈 (빨강, 검정)
- 영수증 및 SNKRS 구매 내역

정품이고 박스까지 다 있습니다.
몇 번 착용했지만 상태 매우 좋습니다.
밑창 마모도 거의 없어요.

조던 좋아하시는 분께 합리적인 가격에 드립니다.`,
      price: 450000,
      location: '강남구 청담동',
      images: [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400',
        'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400'
      ],
      likes: 22,
      views: 412,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      status: 'available',
      category: '남성의류',
      seller: {
        id: 'user404',
        name: '강태현',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 4.9,
        reviewCount: 34,
        responseTime: '보통 30분 이내',
        location: '강남구 청담동'
      }
    },
    7: {
      id: 7,
      title: '파세코 창문형 인버터 에어컨 PWA-3250W',
      description: `올해 여름에 구매했지만 이사로 인해 판매합니다. 상태 매우 좋아요.

구매일: 2024년 5월
모델명: PWA-3250W (창문형)
냉방 능력: 2.5kW
인버터 기능: 있음

특징:
- 전기료 절약되는 인버터 타입
- 소음이 적음 (약 45dB)
- 리모컨 포함
- 창문 설치 키트 포함
- 제습 기능

사용 기간이 짧고 관리 잘 해서 깨끗합니다.
직거래 우선이며, 설치 도움 가능합니다.

실제 제품 사진으로 상태 확인 가능하시고,
작동 테스트도 해보실 수 있습니다.`,
      price: 340000,
      location: '망원제1동',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        'https://images.unsplash.com/photo-1631545806838-4b8e4b1b12c7?w=400',
        'https://images.unsplash.com/photo-1585338447937-7dd89188ca5d?w=400'
      ],
      likes: 6,
      views: 89,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'available',
      category: '생활가전',
      seller: {
        id: 'user101',
        name: '김현정',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        rating: 4.6,
        reviewCount: 12,
        responseTime: '보통 1시간 이내',
        location: '망원제1동'
      }
    },
    8: {
      id: 8,
      title: '캐리어 벽걸이 에어컨',
      description: `캐리어 벽걸이 에어컨 판매합니다.

모델명: CSV-Q098D
냉방 능력: 9평형 (2.8kW)
구매일: 2023년 6월
사용 기간: 1년 4개월

포함사항:
- 에어컨 본체 (실내기, 실외기)
- 리모컨
- 설치 브라켓
- 배관 및 전선

특징:
- 인버터 기능으로 전기료 절약
- 공기청정 기능
- 제습 기능
- 타이머 기능

설치 포함해서 판매합니다. 
전문 업체를 통해 안전하게 설치해드려요.
해체 및 재설치 모두 포함된 가격입니다.`,
      price: 450000,
      location: '양평동4가',
      images: [
        'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      ],
      likes: 1,
      views: 78,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
      status: 'available',
      category: '생활가전',
      seller: {
        id: 'user505',
        name: '이영수',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        rating: 4.5,
        reviewCount: 9,
        responseTime: '보통 2시간 이내',
        location: '양평동4가'
      }
    }
  };

  // 임시 댓글 데이터
  const mockComments = {
    1: [
      {
        id: 1,
        content: '배터리 상태는 어떤가요? 교체한 적 있나요?',
        author: {
          name: '홍길동',
          profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
        },
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isSellerReply: false
      },
      {
        id: 2,
        content: '배터리는 94%로 아직 매우 좋습니다! 한 번도 교체한 적 없어요.',
        author: {
          name: '김민수',
          profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
        },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isSellerReply: true
      },
      {
        id: 3,
        content: '직거래 위치 정확히 어디인가요?',
        author: {
          name: '이영희',
          profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b75d9b7e?w=100'
        },
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isSellerReply: false
      }
    ],
    2: [
      {
        id: 1,
        content: '맥북 성능은 어떤가요? 무거운 작업도 잘 돌아가나요?',
        author: {
          name: '박철수',
          profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
        },
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isSellerReply: false
      },
      {
        id: 2,
        content: 'M2 칩이라 성능은 정말 좋아요. 영상편집이나 개발 작업도 문제없이 됩니다!',
        author: {
          name: '이지현',
          profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b75d9b7e?w=100'
        },
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isSellerReply: true
      }
    ]
  };

  useEffect(() => {
    // 실제로는 API 호출로 상품 정보를 가져올 것
    const productData = mockProducts[params.id];
    if (productData) {
      setProduct(productData);
    }
    
    // localStorage에서 댓글 데이터 불러오기
    const savedComments = localStorage.getItem(`comments_${params.id}`);
    if (savedComments) {
      const parsedComments = JSON.parse(savedComments);
      // createdAt을 Date 객체로 변환
      const commentsWithDates = parsedComments.map(comment => ({
        ...comment,
        createdAt: new Date(comment.createdAt)
      }));
      setComments(commentsWithDates);
    } else {
      // localStorage에 저장된 댓글이 없으면 mock 데이터 사용
      const productComments = mockComments[params.id] || [];
      setComments(productComments);
      // mock 데이터를 localStorage에 저장
      if (productComments.length > 0) {
        localStorage.setItem(`comments_${params.id}`, JSON.stringify(productComments));
      }
    }
    
    setLoading(false);
  }, [params.id]);

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}일 전`;
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    
    // 임시로 새 댓글 추가 (실제로는 API 호출)
    const newCommentData = {
      id: Date.now(), // 고유 ID로 타임스탬프 사용
      content: newComment.trim(),
      author: {
        name: '현재사용자', // 실제로는 로그인한 사용자 정보
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      },
      createdAt: new Date(),
      isSellerReply: false
    };

    setTimeout(() => {
      const updatedComments = [...comments, newCommentData];
      setComments(updatedComments);
      
      // localStorage에 댓글 저장
      localStorage.setItem(`comments_${params.id}`, JSON.stringify(updatedComments));
      
      setNewComment('');
      setIsSubmittingComment(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-900 font-medium">상품 정보를 불러오는 중...</p>
          </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900 text-lg mb-4 font-medium">상품을 찾을 수 없습니다</p>
          <button 
            onClick={() => router.push('/products')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            상품 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white min-h-screen">
        {/* 헤더 */}
        <div className="sticky top-16 bg-white border-b border-gray-200 px-4 py-3 flex items-center z-40">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 mr-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 flex-1 truncate">
            {product.title}
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>

        {/* 이미지 갤러리 */}
        <div className="relative">
          <div className="aspect-square bg-gray-200">
            <Image
              src={product.images[currentImageIndex] || '/placeholder-image.svg'}
              alt={product.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          
          {product.images.length > 1 && (
            <>
              {/* 이미지 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              {/* 이미지 네비게이션 */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </>
          )}

          {/* 상태 배지 */}
          {product.status === 'sold' && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-medium">
                판매완료
              </span>
            </div>
          )}
          {product.status === 'reserved' && (
            <div className="absolute top-4 left-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                예약중
              </span>
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="p-4">
          {/* 제목과 가격 */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <div className="flex items-center space-x-4 text-gray-700 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {product.views}
                </div>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center hover:text-red-500 transition-colors"
                >
                  <svg 
                    className={`w-4 h-4 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                    fill={isLiked ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {product.likes + (isLiked ? 1 : 0)}
                </button>
              </div>
            </div>
          </div>

          {/* 위치와 시간 */}
          <div className="flex items-center text-gray-700 text-sm mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{product.location} · {formatTimeAgo(product.createdAt)}</span>
          </div>

          {/* 설명 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">상품 설명</h3>
            <div className="text-gray-900 leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </div>

          {/* 판매자 정보 */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">판매자 정보</h3>
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={product.seller.profileImage}
                  alt={product.seller.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">{product.seller.name}</span>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.seller.rating} ({product.seller.reviewCount})
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{product.seller.location}</p>
                <p className="text-gray-700 text-sm">{product.seller.responseTime}</p>
              </div>
                                      <button 
                          onClick={() => setShowSellerModal(true)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          프로필 보기
                        </button>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              댓글 ({comments.length})
            </h3>
            
            {/* 댓글 목록 */}
            <div className="space-y-4 mb-6">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">아직 댓글이 없습니다</p>
                  <p className="text-gray-400 text-sm">첫 번째 댓글을 작성해보세요!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={comment.author.profileImage}
                        alt={comment.author.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">
                          {comment.author.name}
                        </span>
                        {comment.isSellerReply && (
                          <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">
                            판매자
                          </span>
                        )}
                        <span className="text-gray-500 text-xs">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 댓글 작성 폼 */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="flex space-x-3">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                    alt="현재사용자"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="궁금한 점을 댓글로 물어보세요!"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-slate-900"
                    rows={3}
                    disabled={isSubmittingComment}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {newComment.length}/500
                    </span>
                    <button
                      type="submit"
                      disabled={!newComment.trim() || isSubmittingComment}
                      className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmittingComment ? '등록 중...' : '댓글 등록'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex space-x-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-lg border ${
              isLiked 
                ? 'border-red-500 bg-red-50 text-red-500' 
                : 'border-gray-300 hover:bg-gray-50'
            } transition-colors`}
          >
            <svg 
              className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button 
            onClick={() => router.push('/chat')}
            className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            채팅하기
          </button>
        </div>

        {/* 판매자 정보 모달 */}
        {showSellerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-sm">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">판매자 정보</h3>
                <button 
                  onClick={() => setShowSellerModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 모달 내용 */}
              <div className="p-6">
                <div className="text-center">
                  {/* 프로필 이미지 */}
                  <div className="w-20 h-20 relative mx-auto mb-4">
                    <Image
                      src={product.seller.profileImage}
                      alt={product.seller.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>

                  {/* 판매자 이름 */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {product.seller.name}
                  </h4>

                  {/* 평점 */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-lg font-semibold text-gray-900">
                        {product.seller.rating}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">
                        ({product.seller.reviewCount}개)
                      </span>
                    </div>
                  </div>

                  {/* 거주지 */}
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      {product.seller.location}
                    </span>
                  </div>

                  {/* 추가 정보 */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {product.seller.reviewCount}
                        </div>
                        <div className="text-sm text-gray-500">받은 후기</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {product.seller.responseTime}
                        </div>
                        <div className="text-sm text-gray-500">응답시간</div>
                      </div>
                    </div>
                  </div>

                  {/* 신뢰도 표시 */}
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      신뢰도 높음
                    </div>
                    <div className="flex items-center text-blue-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      본인인증
                    </div>
                  </div>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowSellerModal(false);
                    router.push('/chat');
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  {product.seller.name}님과 채팅하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage; 