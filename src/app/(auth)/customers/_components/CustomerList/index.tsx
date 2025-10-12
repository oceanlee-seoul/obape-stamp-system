'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Customer } from '@/services/customerService';
import { addStamp, removeStamp } from '@/services/stampService';

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
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-pink-400">로딩 중...</p>
      </div>
    );
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
      <div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden">
        <table className="min-w-full divide-y divide-pink-100">
          <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-pink-700">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-pink-700">
                이름
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-pink-700">
                전화번호
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-pink-700">
                스탬프
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-pink-700">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pink-50">
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
                    className="hover:bg-pink-50/50 transition-colors"
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
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-pink-100 text-pink-700">
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
                          className="w-16 px-2 py-1 text-xs border border-pink-200 rounded focus:outline-none focus:ring-1 focus:ring-pink-300 disabled:bg-gray-100"
                        />
                        <button
                          onClick={() => handleAdd(customer.id)}
                          disabled={isThisLoading}
                          className="px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm disabled:opacity-50"
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
                          className="px-2 py-1 text-xs font-medium text-pink-700 bg-white border border-pink-300 rounded hover:bg-pink-50 transition-all disabled:opacity-50"
                        >
                          10개
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/customers/${customer.id}`)
                          }
                          disabled={isThisLoading}
                          className="px-2 py-1 text-xs font-medium text-pink-700 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100 hover:border-pink-300 transition-all disabled:opacity-50"
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
        <span className="font-semibold text-pink-600">{customers.length}</span>
        명
      </div>
    </div>
  );
};

export default CustomerList;
