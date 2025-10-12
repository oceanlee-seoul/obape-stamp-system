import supabase from '@/libs/supabaseClient';

export interface Stamp {
  id: string;
  customer_id: string;
  created_at: string;
  // 다른 필드들 추가
}

/**
 * 스탬프 추가
 */
export const addStamp = async (customerId: string) => {
  const { data, error } = await supabase
    .from('stamps')
    .insert({ customer_id: customerId })
    .select()
    .single();

  if (error) throw error;

  return data;
};

/**
 * 스탬프 삭제 (최근 스탬프 하나)
 */
export const removeStamp = async (customerId: string) => {
  // 해당 고객의 가장 최근 스탬프 하나 찾아서 삭제
  const { data: stamps, error: findError } = await supabase
    .from('stamps')
    .select('id')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (findError) throw findError;
  if (!stamps || stamps.length === 0) {
    throw new Error('삭제할 스탬프가 없습니다');
  }

  const { error: deleteError } = await supabase
    .from('stamps')
    .delete()
    .eq('id', stamps[0].id);

  if (deleteError) throw deleteError;
};

/**
 * 특정 고객의 스탬프 목록 조회
 */
export const getStampsByCustomer = async (customerId: string) => {
  const { data, error } = await supabase
    .from('stamps')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data as Stamp[];
};

/**
 * 특정 스탬프 삭제
 */
export const deleteStamp = async (stampId: string) => {
  const { error } = await supabase.from('stamps').delete().eq('id', stampId);

  if (error) throw error;
};
