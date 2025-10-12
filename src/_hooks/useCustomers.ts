import { useState, useEffect, useCallback } from 'react';
import {
  getCustomers,
  Customer,
  SearchParams,
} from '@/services/customerService';

export const useCustomers = (initialParams?: SearchParams) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState<SearchParams>(
    initialParams || {}
  );

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await getCustomers(searchParams);
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const search = (target: string, keyword: string) => {
    setSearchParams({ target: target as SearchParams['target'], keyword });
  };

  const refresh = () => {
    fetchCustomers();
  };

  return {
    customers,
    isLoading,
    error,
    search,
    refresh,
  };
};
