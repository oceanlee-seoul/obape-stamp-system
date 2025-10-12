import supabase from '@/libs/supabaseClient';

export interface Log {
  id: string;
  admin_id: string;
  customer_id: string;
  action: string;
  note: string;
  created_at: string;
}

/**
 * 로그 추가
 */
export const createLog = async (
  customerId: string,
  action: string,
  note: string = ''
) => {
  // 현재 세션에서 user id 가져오기
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error('세션을 찾을 수 없습니다');
  }

  const adminId = session.user.id;

  const { data, error } = await supabase
    .from('logs')
    .insert({
      admin_id: adminId,
      customer_id: customerId,
      action,
      note,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

/**
 * 특정 고객의 로그 조회 (최신순)
 */
export const getLogsByCustomer = async (customerId: string) => {
  const { data, error } = await supabase
    .from('logs')
    .select(
      `
      *,
      users!admin_id(name, email)
    `
    )
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data as Log[];
};
