'use client';

import { useState, useEffect } from 'react';
import supabase from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  // 이미 로그인되어 있는지 체크
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // 이미 로그인되어 있으면 customers로 이동
        router.push('/customers');
      } else {
        setIsChecking(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async () => {
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      // 로그인 성공 시 메인 페이지로 이동
      router.push('/customers');
    }
  };

  // 세션 체크 중일 때 로딩 표시
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
        <p className="text-pink-400">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-pink-100">
        {/* 로고 */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">OSS</span>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
          로그인
        </h1>

        {/* 폼 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg mt-6"
          >
            로그인
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
