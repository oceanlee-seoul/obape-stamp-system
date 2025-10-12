'use client';

import { useRouter } from 'next/navigation';
import { Customer } from '@/services/customerService';

interface CustomerListProps {
  customers: Customer[];
  isLoading: boolean;
  error: string;
}

const CustomerList = ({ customers, isLoading, error }: CustomerListProps) => {
  const router = useRouter();
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
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/customers/${customer.id}`)
                          }
                          className="px-3 py-1.5 text-xs font-medium text-pink-700 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 hover:border-pink-300 transition-all"
                        >
                          상세보기
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm">
                          스탬프 +
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 hover:border-rose-300 transition-all">
                          스탬프 -
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
