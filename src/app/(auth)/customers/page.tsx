'use client';

import { useCustomers } from '@/hooks/useCustomers';
import CustomerList from './_components/CustomerList';
import SearchBox from './_components/SearchBox';

export default function CustomersPage() {
  const { customers, isLoading, error, search, refresh } = useCustomers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <SearchBox onSearch={search} />
      <CustomerList
        customers={customers}
        isLoading={isLoading}
        error={error}
        onUpdate={refresh}
      />
    </div>
  );
}
