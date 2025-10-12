'use client';

import { useState } from 'react';
import StampCards from './StampCards';
import { addStamp, removeStamp } from '@/services/stampService';

interface StampSectionProps {
  stampCount: number;
  customerId: string;
  onUpdate: () => void;
}

const StampSection = ({
  stampCount,
  customerId,
  onUpdate,
}: StampSectionProps) => {
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (amount < 1) return;

    try {
      setIsLoading(true);
      await addStamp(customerId, amount);
      onUpdate(); // 데이터 새로고침
      setAmount(1); // 입력값 초기화
    } catch (error) {
      console.error('스탬프 추가 실패:', error);
      alert('스탬프 추가에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (amount < 1) return;

    try {
      setIsLoading(true);
      await removeStamp(customerId, amount);
      onUpdate(); // 데이터 새로고침
      setAmount(1); // 입력값 초기화
    } catch (error) {
      console.error('스탬프 제거 실패:', error);
      alert(
        error instanceof Error ? error.message : '스탬프 제거에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUse10 = async () => {
    if (stampCount < 10) {
      alert('스탬프가 10개 미만입니다.');
      return;
    }

    try {
      setIsLoading(true);
      await removeStamp(customerId, 10);
      onUpdate();
      alert('10개 사용처리 완료!');
    } catch (error) {
      console.error('사용처리 실패:', error);
      alert('사용처리에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-1 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-sm border border-pink-200 p-6">
      <h2 className="text-xl font-semibold text-pink-700 mb-6 pb-3 border-b border-pink-200">
        스탬프 현황
      </h2>

      <StampCards count={stampCount} />

      <div className="mt-6 pt-6 border-t border-pink-200 space-y-3">
        {/* 입력 + 추가/제거 버튼 */}
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="개수"
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : '추가'}
          </button>
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : '제거'}
          </button>
        </div>

        {/* 10개 사용처리 버튼 */}
        <div>
          <button
            onClick={handleUse10}
            disabled={isLoading || stampCount < 10}
            className="w-full px-4 py-3 text-sm font-medium text-pink-700 bg-white border-2 border-pink-300 rounded-lg hover:bg-pink-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '처리 중...' : '10개 사용처리'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default StampSection;
