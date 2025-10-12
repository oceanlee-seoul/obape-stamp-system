import { useState, useEffect, useCallback } from 'react';
import { getLogsByCustomer, Log } from '@/services/logService';

export const useLogs = (customerId: string) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await getLogsByCustomer(customerId);
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    if (customerId) {
      fetchLogs();
    }
  }, [customerId, fetchLogs]);

  return {
    logs,
    isLoading,
    error,
    refresh: fetchLogs,
  };
};
