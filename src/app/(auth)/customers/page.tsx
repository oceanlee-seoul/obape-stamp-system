'use client';

import { useCustomers } from '@/_hooks/useCustomers';
import CustomerList from './_components/CustomerList';
import SearchBox from './_components/SearchBox';

export default function CustomersPage() {
  const { customers, isLoading, error, search, refresh, hasQuery } =
    useCustomers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-4">
      <SearchBox onSearch={search} />
      {!hasQuery ? (
        <div className="bg-white rounded-lg border border-brand-100 p-10 text-center text-gray-500">
          검색어를 입력해주세요.
        </div>
      ) : (
        <CustomerList
          customers={customers}
          isLoading={isLoading}
          error={error}
          onUpdate={refresh}
        />
      )}
    </div>
  );
}
