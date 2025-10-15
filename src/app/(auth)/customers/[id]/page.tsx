'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCustomer } from '@/_hooks/useCustomer';
import { useLogs } from '@/_hooks/useLogs';
import CustomerInfo from './_components/CustomerInfo';
import StampSection from './_components/StampSection';
import LogList from './_components/LogList';
import Loading from '@/_components/Loading';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;
  const { customer, isLoading, error, refresh } = useCustomer(customerId);
  const {
    logs,
    isLoading: logsLoading,
    error: logsError,
    refresh: refreshLogs,
  } = useLogs(customerId);

  const handleUpdate = () => {
    refresh();
    refreshLogs();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading size="lg" text="고객 정보 불러오는 중..." />
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
            className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
          고객 상세
        </h1>
        <button
          onClick={() => router.push('/customers')}
          className="px-4 py-2 text-sm font-medium text-brand-700 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 hover:border-brand-300 transition-all"
        >
          ← 목록으로
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex gap-6 mb-6 items-stretch">
        <div className="flex-1 self-stretch">
          <CustomerInfo customer={customer} />
        </div>
        <StampSection
          stampCount={stampCount}
          customerId={customerId}
          onUpdate={handleUpdate}
        />
      </div>

      {/* 로그 섹션 */}
      <div>
        <LogList logs={logs} isLoading={logsLoading} error={logsError} />
      </div>
    </div>
  );
}
