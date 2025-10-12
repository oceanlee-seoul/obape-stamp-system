'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCustomer } from '@/hooks/useCustomer';
import StampCards from './_components/StampCards';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;
  const { customer, isLoading, error } = useCustomer(customerId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-pink-400">로딩 중...</p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || '고객을 찾을 수 없습니다.'}
          </p>
          <button
            onClick={() => router.push('/customers')}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const stampCount = customer.stamps?.[0]?.count || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {/* 헤더 */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
          고객 상세
        </h1>
        <button
          onClick={() => router.push('/customers')}
          className="px-4 py-2 text-sm font-medium text-pink-700 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 hover:border-pink-300 transition-all"
        >
          ← 목록으로
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex gap-6">
        {/* User Info Section */}
        <section className="flex-1 bg-white rounded-lg shadow-sm border border-pink-100 p-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-6 pb-3 border-b border-pink-100">
            고객 정보
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                이름
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {customer.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                전화번호
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {customer.phone}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                가입일
              </label>
              <p className="text-sm text-gray-700">
                {new Date(customer.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Stamps Count Section */}
        <section className="flex-1 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-sm border border-pink-200 p-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-6 pb-3 border-b border-pink-200">
            스탬프 현황
          </h2>

          <StampCards count={stampCount} />

          <div className="mt-6 pt-6 border-t border-pink-200">
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm">
                스탬프 추가
              </button>
              <button className="flex-1 px-4 py-3 text-sm font-medium text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-50 transition-all">
                스탬프 제거
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
