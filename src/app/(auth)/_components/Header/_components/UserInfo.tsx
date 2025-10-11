'use client';

import { useUser } from '@/app/contexts/UserContext';

const UserInfo = () => {
  const { user, isLoading, logout } = useUser();

  if (isLoading) {
    return <div className="text-pink-400">로딩 중...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 bg-white/70 px-4 py-2 rounded-full border border-pink-200">
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-pink-700">
            {user.name || user.email}
          </span>
          {user.oss_role && (
            <span className="text-xs text-pink-500">{user.oss_role}</span>
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold">
          {(user.name || user.email).charAt(0).toUpperCase()}
        </div>
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 rounded-lg bg-white/70 border border-pink-200 text-pink-700 font-medium hover:bg-pink-50 hover:border-pink-300 transition-all"
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserInfo;
