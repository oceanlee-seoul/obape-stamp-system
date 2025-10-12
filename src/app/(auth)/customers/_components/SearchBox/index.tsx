'use client';

import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (target: string, keyword: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [target, setTarget] = useState('all');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(target, keyword);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-pink-100 p-6">
      <div className="flex gap-3 items-center">
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
        >
          <option value="all">전체</option>
          <option value="name">이름</option>
          <option value="phone">전화번호</option>
        </select>

        <input
          type="text"
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
        />

        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
