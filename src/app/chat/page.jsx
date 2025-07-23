'use client';

import { useState } from 'react';
import Image from 'next/image';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [messagesEndRef, setMessagesEndRef] = useState(null);

  // 채팅 메시지 데이터
  const chatMessages = {
    1: [ // 김민수와의 채팅
      {
        id: 1,
        senderId: 1,
        senderName: '김민수',
        message: '안녕하세요! 아이폰 문의드립니다.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: 2,
        senderId: 'me',
        senderName: '나',
        message: '네, 안녕하세요! 어떤 부분이 궁금하신가요?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
        type: 'text'
      },
      {
        id: 3,
        senderId: 1,
        senderName: '김민수',
        message: '배터리 성능이 어떤가요? 그리고 스크래치는 없나요?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
        type: 'text'
      },
      {
        id: 4,
        senderId: 'me',
        senderName: '나',
        message: '배터리는 94% 상태이고, 항상 케이스 끼고 써서 스크래치 전혀 없어요! 직접 보시면 만족하실 것 같습니다.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 15 * 60 * 1000),
        type: 'text'
      },
      {
        id: 5,
        senderId: 1,
        senderName: '김민수',
        message: '직거래 가능한 위치가 어디인가요?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: 6,
        senderId: 'me',
        senderName: '나',
        message: '강남역 근처에서 가능해요. 몇 시쯤 괜찮으신가요?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000 + 3 * 60 * 1000),
        type: 'text'
      },
      {
        id: 7,
        senderId: 1,
        senderName: '김민수',
        message: '네, 직거래 가능합니다!',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        type: 'text'
      }
    ],
    2: [ // 이지현과의 채팅
      {
        id: 1,
        senderId: 2,
        senderName: '이지현',
        message: '맥북 에어 문의드려요',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: 2,
        senderId: 'me',
        senderName: '나',
        message: '네, 말씀하세요!',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 2 * 60 * 1000),
        type: 'text'
      },
      {
        id: 3,
        senderId: 2,
        senderName: '이지현',
        message: '사용 기간이 어떻게 되나요? 혹시 A/S 받은 적 있나요?',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 5 * 60 * 1000),
        type: 'text'
      },
      {
        id: 4,
        senderId: 'me',
        senderName: '나',
        message: '1년 정도 사용했고, A/S 받은 적은 없어요. 문서 작업용으로만 사용해서 상태 매우 좋습니다.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: 5,
        senderId: 2,
        senderName: '이지현',
        message: '상태 확인하고 연락드릴게요',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text'
      }
    ],
    3: [ // 박준호와의 채팅
      {
        id: 1,
        senderId: 3,
        senderName: '박준호',
        message: '책상 구매 희망합니다',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: 2,
        senderId: 'me',
        senderName: '나',
        message: '감사합니다! 언제 픽업 가능하신가요?',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000 + 10 * 60 * 1000),
        type: 'text'
      },
      {
        id: 3,
        senderId: 3,
        senderName: '박준호',
        message: '오늘 오후에 픽업 가능한가요?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: 'text'
      }
    ]
  };

  // 채팅 사용자 목록 (최대 10명)
  const chatUsers = [
    {
      id: 1,
      name: '김민수',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      lastMessage: '네, 직거래 가능합니다!',
      lastMessageTime: '1분 전',
      unreadCount: 2,
      productTitle: '아이폰 14 Pro 256GB',
      productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100',
      isOnline: true
    },
    {
      id: 2,
      name: '이지현',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b75d9b7e?w=100',
      lastMessage: '상태 확인하고 연락드릴게요',
      lastMessageTime: '5분 전',
      unreadCount: 0,
      productTitle: '맥북 에어 M2',
      productImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100',
      isOnline: false
    },
    {
      id: 3,
      name: '박준호',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      lastMessage: '오늘 오후에 픽업 가능한가요?',
      lastMessageTime: '30분 전',
      unreadCount: 1,
      productTitle: '원목 책상 140cm',
      productImage: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100',
      isOnline: true
    },
    {
      id: 4,
      name: '최수현',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      lastMessage: '가격 조정 가능한가요?',
      lastMessageTime: '1시간 전',
      unreadCount: 0,
      productTitle: '다이슨 청소기 V11',
      productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100',
      isOnline: false
    },
    {
      id: 5,
      name: '정태윤',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      lastMessage: '사진 더 보여주실 수 있나요?',
      lastMessageTime: '2시간 전',
      unreadCount: 3,
      productTitle: '조던 1 하이 시카고',
      productImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=100',
      isOnline: true
    },
    {
      id: 6,
      name: '김현정',
      profileImage: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100',
      lastMessage: '내일 거래 어떠세요?',
      lastMessageTime: '3시간 전',
      unreadCount: 0,
      productTitle: '파세코 에어컨',
      productImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100',
      isOnline: false
    },
    {
      id: 7,
      name: '안성민',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f82?w=100',
      lastMessage: '교환도 가능한가요?',
      lastMessageTime: '5시간 전',
      unreadCount: 0,
      productTitle: '캐리어 벽걸이 에어컨',
      productImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=100',
      isOnline: false
    },
    {
      id: 8,
      name: '윤서영',
      profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
      lastMessage: '안녕하세요! 문의드립니다',
      lastMessageTime: '1일 전',
      unreadCount: 1,
      productTitle: '나이키 에어포스 270',
      productImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100',
      isOnline: true
    }
  ];

  // 검색 필터링
  const filteredUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timeStr) => {
    return timeStr;
  };

  const formatMessageTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 24 * 60) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    
    return messageDate.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      senderName: '나',
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || chatMessages[selectedUser.id] || []), newMsg]
    }));

    setNewMessage('');

    // 메시지 전송 후 자동 스크롤
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    // 상대방 자동 응답 시뮬레이션 (2-5초 후)
    if (Math.random() > 0.3) { // 70% 확률로 응답
      setIsTyping(true);
      const responseDelay = Math.random() * 3000 + 2000; // 2-5초

      setTimeout(() => {
        setIsTyping(false);
        const responses = getAutoResponses(newMessage.trim());
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const autoReply = {
          id: Date.now() + 1,
          senderId: selectedUser.id,
          senderName: selectedUser.name,
          message: randomResponse,
          timestamp: new Date(),
          type: 'text'
        };

        setMessages(prev => ({
          ...prev,
          [selectedUser.id]: [...(prev[selectedUser.id] || chatMessages[selectedUser.id] || []), newMsg, autoReply]
        }));

        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }, responseDelay);
    }
  };

  const getAutoResponses = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('안녕') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return ['안녕하세요! 😊', '네, 안녕하세요!', '반갑습니다!'];
    }
    if (lowerMessage.includes('가격') || lowerMessage.includes('얼마')) {
      return ['가격은 게시글에 적힌 대로입니다', '네고 조금 가능해요', '직거래시 조금 깎아드릴게요'];
    }
    if (lowerMessage.includes('상태') || lowerMessage.includes('어떤가요')) {
      return ['상태 정말 좋아요!', '직접 보시면 만족하실 거예요', '사진으로는 다 못 보여드리지만 깨끗해요'];
    }
    if (lowerMessage.includes('언제') || lowerMessage.includes('시간')) {
      return ['오늘 저녁 어떠세요?', '주말에 가능해요', '시간 맞춰서 만나요'];
    }
    if (lowerMessage.includes('어디') || lowerMessage.includes('위치') || lowerMessage.includes('장소')) {
      return ['지하철역 근처에서 만나요', '편하신 곳으로 갈게요', '주차 가능한 곳에서 만날까요?'];
    }
    if (lowerMessage.includes('감사') || lowerMessage.includes('고마')) {
      return ['네, 감사합니다!', '좋은 거래 되길 바라요', '연락주셔서 감사해요'];
    }
    if (lowerMessage.includes('네고') || lowerMessage.includes('깎')) {
      return ['조금은 가능해요', '너무 많이는 어려워요', '직거래시 조금 할인해드릴게요'];
    }
    
    return [
      '네, 알겠습니다!',
      '좋아요 😊',
      '그렇군요',
      '네네, 맞아요',
      '확인했습니다',
      '좋은 생각이네요',
      '그럼 그렇게 해요',
      '연락 기다릴게요'
    ];
  };

  const scrollToBottom = () => {
    if (messagesEndRef) {
      messagesEndRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getCurrentMessages = () => {
    if (!selectedUser) return [];
    return messages[selectedUser.id] || chatMessages[selectedUser.id] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* 왼쪽 채팅 목록 */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* 헤더 */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900 mb-4">채팅</h1>
            
            {/* 검색바 */}
            <div className="relative">
              <input
                type="text"
                placeholder="채팅방 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600"
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
            </div>
          </div>

          {/* 채팅 목록 */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>검색 결과가 없습니다</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedUser?.id === user.id ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* 프로필 이미지 */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={user.profileImage}
                          alt={user.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    {/* 채팅 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {user.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(user.lastMessageTime)}
                          </span>
                          {user.unreadCount > 0 && (
                            <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {user.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* 상품 정보 */}
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 relative">
                          <Image
                            src={user.productImage}
                            alt={user.productTitle}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-600 truncate">
                          {user.productTitle}
                        </span>
                      </div>

                      {/* 마지막 메시지 */}
                      <p className="text-sm text-gray-600 truncate">
                        {user.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 오른쪽 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* 채팅 헤더 */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={selectedUser.profileImage}
                        alt={selectedUser.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    {selectedUser.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedUser.name}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 relative">
                        <Image
                          src={selectedUser.productImage}
                          alt={selectedUser.productTitle}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {selectedUser.productTitle}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 채팅 메시지 영역 */}
              <div className="flex-1 bg-gray-50 overflow-y-auto">
                {getCurrentMessages().length === 0 ? (
                  <div className="h-full flex items-center justify-center p-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {selectedUser.name}님과의 채팅을 시작해보세요!
                      </p>
                      <p className="text-sm text-gray-500">
                        안전한 거래를 위해 정중하게 대화해주세요.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {/* 거래 상품 정보 */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative">
                          <Image
                            src={selectedUser.productImage}
                            alt={selectedUser.productTitle}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{selectedUser.productTitle}</h4>
                          <p className="text-sm text-gray-600">100,000원</p>
                        </div>
                        <button className="text-orange-500 text-sm font-medium border border-orange-500 px-3 py-1 rounded">
                          거래완료
                        </button>
                      </div>
                    </div>

                                         {/* 채팅 메시지들 */}
                     {getCurrentMessages().map((message, index) => (
                       <div
                         key={message.id}
                         className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                       >
                         <div className={`max-w-xs lg:max-w-md ${message.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                           {message.senderId !== 'me' && (
                             <div className="flex items-center space-x-2 mb-1">
                               <div className="w-8 h-8 relative">
                                 <Image
                                   src={selectedUser.profileImage}
                                   alt={selectedUser.name}
                                   fill
                                   className="rounded-full object-cover"
                                 />
                               </div>
                               <span className="text-xs text-gray-600">{message.senderName}</span>
                             </div>
                           )}
                           <div
                             className={`px-4 py-2 rounded-lg transform transition-all duration-200 hover:scale-105 ${
                               message.senderId === 'me'
                                 ? 'bg-orange-500 text-white shadow-lg'
                                 : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                             }`}
                           >
                             <p className="text-sm">{message.message}</p>
                           </div>
                           <div className={`mt-1 text-xs text-gray-500 ${message.senderId === 'me' ? 'text-right' : 'text-left'}`}>
                             {formatMessageTime(message.timestamp)}
                           </div>
                         </div>
                       </div>
                     ))}

                     {/* 타이핑 인디케이터 */}
                     {isTyping && (
                       <div className="flex justify-start animate-pulse">
                         <div className="max-w-xs lg:max-w-md">
                           <div className="flex items-center space-x-2 mb-1">
                             <div className="w-8 h-8 relative">
                               <Image
                                 src={selectedUser.profileImage}
                                 alt={selectedUser.name}
                                 fill
                                 className="rounded-full object-cover"
                               />
                             </div>
                             <span className="text-xs text-gray-600">{selectedUser.name}</span>
                           </div>
                           <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg">
                             <div className="flex items-center space-x-1">
                               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                             </div>
                           </div>
                         </div>
                       </div>
                     )}

                     {/* 스크롤 앵커 */}
                     <div ref={setMessagesEndRef} />
                  </div>
                )}
              </div>

              {/* 메시지 입력 영역 */}
              <div className="bg-white border-t border-gray-200 p-4">
                {/* 빠른 응답 버튼들 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {['안녕하세요!', '네, 관심있어요', '가격 조정 가능한가요?', '언제 거래 가능하신가요?', '상태 어떤가요?'].map((quickMessage) => (
                    <button
                      key={quickMessage}
                      onClick={() => {
                        setNewMessage(quickMessage);
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors"
                    >
                      {quickMessage}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="메시지를 입력하세요..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-600 pr-12"
                    />
                    {newMessage && (
                      <button
                        onClick={() => setNewMessage('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-lg transition-all duration-200 transform ${
                      newMessage.trim() 
                        ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 shadow-lg' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* 초기 상태 - 사용자 미선택 */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  채팅할 상대방을 선택해주세요
                </h2>
                <p className="text-gray-600">
                  왼쪽 목록에서 대화하고 싶은 상대방을 선택하세요
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 