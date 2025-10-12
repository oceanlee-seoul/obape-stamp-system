import { useState, useEffect } from 'react';
import { getCustomerById } from '@/services/customerService';

interface CustomerDetail {
  id: string;
  name: string;
  phone: string;
  created_at: string;
  stamps: { count: number }[];
}

export const useCustomer = (id: string) => {
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getCustomerById(id);
        setCustomer(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  return {
    customer,
    isLoading,
    error,
  };
};
