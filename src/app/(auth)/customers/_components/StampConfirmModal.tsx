'use client';

import { useState } from 'react';

export default function StampConfirmModal({
  mode,
  amount,
  onConfirm,
  onCancel,
}: {
  mode: 'add' | 'remove' | 'use10';
  amount?: number;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title =
    mode === 'add'
      ? '스탬프 추가'
      : mode === 'remove'
      ? '스탬프 제거'
      : '10개 사용처리';
  const displayAmount = mode === 'use10' ? 10 : amount ?? 1;
  const description =
    mode === 'use10'
      ? '스탬프를 10개 사용 처리하시겠습니까?'
      : `스탬프를 ${displayAmount}개 ${
          mode === 'add' ? '추가' : '제거'
        }하시겠습니까?`;

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      await onConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm opacity-80 mb-4">{description}</p>

      {/* 수량 입력은 사전에 입력된 값을 그대로 사용합니다. */}

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 text-sm rounded border border-brand-300 text-brand-700 hover:bg-brand-50"
        >
          아니오
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleConfirm}
          className={`px-3 py-2 text-sm rounded text-white ${
            mode === 'remove'
              ? 'bg-rose-500 hover:bg-rose-600'
              : 'bg-brand-500 hover:bg-brand-600'
          } disabled:opacity-50`}
        >
          {isSubmitting ? '처리 중...' : '예'}
        </button>
      </div>
    </div>
  );
}
