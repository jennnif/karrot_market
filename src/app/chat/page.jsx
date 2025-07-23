'use client';

import { useState } from 'react';
import Link from 'next/link';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // 채팅 사용자 목록 (간소화)
  const chatUsers = [
    {
      id: 1,
      name: '김민수',
      lastMessage: '네, 직거래 가능합니다!',
      lastMessageTime: '1분 전',
      unreadCount: 2,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      productTitle: '아이폰 14 Pro 256GB',
      isOnline: true
    },
    {
      id: 2,
      name: '이영희',
      lastMessage: '언제 거래 가능하신가요?',
      lastMessageTime: '10분 전',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100',
      productTitle: '맥북 프로 13인치',
      isOnline: false
    },
    {
      id: 3,
      name: '박지훈',
      lastMessage: '사진 더 보내주실 수 있나요?',
      lastMessageTime: '1시간 전',
      unreadCount: 1,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      productTitle: '북유럽 스타일 책상',
      isOnline: true
    }
  ];

  // 간소화된 메시지들
  const messages = [
    {
      id: 1,
      message: '안녕하세요! 아이폰 구매 문의드립니다.',
      timestamp: '오후 2:30',
      isMe: false
    },
    {
      id: 2,
      message: '네 안녕하세요! 문의 감사합니다.',
      timestamp: '오후 2:31',
      isMe: true
    },
    {
      id: 3,
      message: '직거래 가능한가요? 강남역 근처에서요.',
      timestamp: '오후 2:32',
      isMe: false
    },
    {
      id: 4,
      message: '네, 직거래 가능합니다!',
      timestamp: '오후 2:35',
      isMe: true
    }
  ];

  const selectedUser = chatUsers.find(user => user.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // 메시지 전송 로직
      setNewMessage('');
    }
  };

  const filteredChats = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
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
              <Link href="/chat" className="text-orange-500 font-medium">
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
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex overflow-hidden max-w-6xl mx-auto w-full">
        {/* 채팅 목록 */}
        <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
          {/* 헤더 */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900 mb-4">채팅</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="이름, 상품명으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 채팅 목록 */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedChat(user.id)}
                className={`w-full p-6 border-b border-gray-50 hover:bg-gray-50 text-left ${
                  selectedChat === user.id ? 'bg-orange-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* 프로필 이미지 */}
                  <div className="relative">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* 채팅 내용 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">{user.lastMessage}</p>
                    <p className="text-xs text-gray-500 truncate">{user.productTitle}</p>
                  </div>

                  {/* 읽지 않은 메시지 카운트 */}
                  {user.unreadCount > 0 && (
                    <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {user.unreadCount}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 채팅창 */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedUser ? (
            <>
              {/* 채팅 헤더 */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.productTitle}</p>
                  </div>
                </div>
              </div>

              {/* 메시지 목록 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                      message.isMe
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.isMe ? 'text-orange-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 메시지 입력 */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">채팅을 시작해보세요</h3>
                <p className="text-gray-500">왼쪽에서 채팅방을 선택하면 대화를 시작할 수 있습니다.</p>
              </div>
            </div>
          )}
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
          <Link href="/chat" className="flex flex-col items-center justify-center text-orange-500">
            <span className="text-xl mb-1">💬</span>
            <span className="text-xs">채팅</span>
          </Link>
          <Link href="/my" className="flex flex-col items-center justify-center text-gray-600">
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">나의당근</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 