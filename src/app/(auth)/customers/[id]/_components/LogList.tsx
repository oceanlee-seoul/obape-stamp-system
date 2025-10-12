'use client';

import { Log } from '@/services/logService';

interface LogListProps {
  logs: Log[];
  isLoading: boolean;
  error: string;
}

const LogList = ({ logs, isLoading, error }: LogListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-pink-400">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const getActionText = (action: string) => {
    if (action.startsWith('add-')) {
      const amount = action.replace('add-', '');
      return { text: `${amount}개 추가`, color: 'text-pink-600 bg-pink-50' };
    } else if (action.startsWith('remove-')) {
      const amount = action.replace('remove-', '');
      return { text: `${amount}개 제거`, color: 'text-rose-600 bg-rose-50' };
    }
    return { text: action, color: 'text-gray-600 bg-gray-50' };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-pink-100 p-6">
      <h2 className="text-xl font-semibold text-pink-700 mb-4 pb-3 border-b border-pink-100">
        작업 이력
      </h2>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            작업 이력이 없습니다.
          </div>
        ) : (
          logs.map((log: any) => {
            const actionInfo = getActionText(log.action);
            return (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 rounded-lg border border-pink-50 hover:bg-pink-50/30 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${actionInfo.color}`}
                  >
                    {actionInfo.text}
                  </span>

                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      작업자:{' '}
                      <span className="font-medium text-gray-900">
                        {log.users?.name || log.users?.email || '알 수 없음'}
                      </span>
                    </p>
                    {log.note && (
                      <p className="text-xs text-gray-500 mt-1">{log.note}</p>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  {new Date(log.created_at).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LogList;
