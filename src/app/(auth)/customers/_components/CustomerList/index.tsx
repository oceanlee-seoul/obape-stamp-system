'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Customer } from '@/services/customerService';
import { addStamp, removeStamp } from '@/services/stampService';
import Loading from '@/components/Loading';

interface CustomerListProps {
  customers: Customer[];
  isLoading: boolean;
  error: string;
  onUpdate: () => void;
}

const CustomerList = ({
  customers,
  isLoading,
  error,
  onUpdate,
}: CustomerListProps) => {
  const router = useRouter();
  const [loadingCustomerId, setLoadingCustomerId] = useState<string | null>(
    null
  );
  const [amounts, setAmounts] = useState<Record<string, number>>({});

  const handleAdd = async (customerId: string) => {
    const amount = amounts[customerId] || 1;
    try {
      setLoadingCustomerId(customerId);
      await addStamp(customerId, amount);
      onUpdate();
      setAmounts({ ...amounts, [customerId]: 1 });
    } catch (error) {
      console.error('스탬프 추가 실패:', error);
      alert('스탬프 추가에 실패했습니다.');
    } finally {
      setLoadingCustomerId(null);
    }
  };

  const handleRemove = async (customerId: string) => {
    const amount = amounts[customerId] || 1;
    try {
      setLoadingCustomerId(customerId);
      await removeStamp(customerId, amount);
      onUpdate();
      setAmounts({ ...amounts, [customerId]: 1 });
    } catch (error) {
      console.error('스탬프 제거 실패:', error);
      alert(
        error instanceof Error ? error.message : '스탬프 제거에 실패했습니다.'
      );
    } finally {
      setLoadingCustomerId(null);
    }
  };

  const handleUse10 = async (customerId: string, stampCount: number) => {
    if (stampCount < 10) {
      alert('스탬프가 10개 미만입니다.');
      return;
    }

    try {
      setLoadingCustomerId(customerId);
      await removeStamp(customerId, 10);
      onUpdate();
      alert('10개 사용처리 완료!');
    } catch (error) {
      console.error('사용처리 실패:', error);
      alert('사용처리에 실패했습니다.');
    } finally {
      setLoadingCustomerId(null);
    }
  };
  if (isLoading) {
    return <Loading size="lg" text="고객 목록 불러오는 중..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-sm border border-brand-100 overflow-hidden">
        <table className="min-w-full divide-y divide-brand-100">
          <thead className="bg-gradient-to-r from-brand-50 to-brand-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-brand-700">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-brand-700">
                이름
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-brand-700">
                전화번호
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-brand-700">
                스탬프
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-brand-700">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-brand-50">
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  고객 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              customers.map((customer, index) => {
                const stampCount = customer.stamps?.[0]?.count || 0;
                const isThisLoading = loadingCustomerId === customer.id;
                const amount = amounts[customer.id] || 1;

                return (
                  <tr
                    key={customer.id}
                    className="hover:bg-brand-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-brand-100 text-brand-700">
                        {stampCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <input
                          type="number"
                          min="1"
                          value={amount}
                          onChange={(e) =>
                            setAmounts({
                              ...amounts,
                              [customer.id]: Number(e.target.value),
                            })
                          }
                          disabled={isThisLoading}
                          className="w-16 px-2 py-1 text-xs border border-brand-200 rounded focus:outline-none focus:ring-1 focus:ring-brand-300 disabled:bg-gray-100"
                        />
                        <button
                          onClick={() => handleAdd(customer.id)}
                          disabled={isThisLoading}
                          className="px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded hover:from-brand-600 hover:to-brand-700 transition-all shadow-sm disabled:opacity-50"
                        >
                          추가
                        </button>
                        <button
                          onClick={() => handleRemove(customer.id)}
                          disabled={isThisLoading}
                          className="px-2 py-1 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-all disabled:opacity-50"
                        >
                          제거
                        </button>
                        <button
                          onClick={() => handleUse10(customer.id, stampCount)}
                          disabled={isThisLoading || stampCount < 10}
                          className="px-2 py-1 text-xs font-medium text-brand-700 bg-white border border-brand-300 rounded hover:bg-brand-50 transition-all disabled:opacity-50"
                        >
                          10개
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/customers/${customer.id}`)
                          }
                          disabled={isThisLoading}
                          className="px-2 py-1 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 rounded hover:bg-brand-100 hover:border-brand-300 transition-all disabled:opacity-50"
                        >
                          상세
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        총{' '}
        <span className="font-semibold text-brand-600">{customers.length}</span>
        명
      </div>
    </div>
  );
};

export default CustomerList;
