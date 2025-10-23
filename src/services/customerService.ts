import supabase from '@/libs/supabaseClient';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  gender?: 'male' | 'female';
  note?: string | null;
  created_at: string;
  stamps: { count: number }[];
}

export interface SearchParams {
  target?: 'all' | 'name' | 'phone';
  keyword?: string;
}

/**
 * 고객 목록 조회
 */
export const getCustomers = async (params?: SearchParams) => {
  let query = supabase.from('customers').select(`
    *,
    stamps(count)
  `);

  // 검색 조건 추가
  if (params?.keyword) {
    const { target, keyword } = params;

    if (target === 'name') {
      query = query.ilike('name', `%${keyword}%`);
    } else if (target === 'phone') {
      query = query.ilike('phone', `%${keyword}%`);
    } else if (target === 'all') {
      query = query.or(`name.ilike.%${keyword}%,phone.ilike.%${keyword}%`);
    }
  }

  // 최신순 정렬
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) throw error;

  return data as Customer[];
};

/**
 * 고객 상세 조회
 */
export const getCustomerById = async (id: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select(
      `
      *,
      stamps(count)
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};

/**
 * 고객 생성
 */
export const createCustomer = async (customer: {
  name: string;
  phone: string;
  gender: 'male' | 'female';
  note?: string;
}) => {
  // duplicate check by phone only
  const { data: existing, error: existingError } = await supabase
    .from('customers')
    .select('id')
    .eq('phone', customer.phone)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) {
    throw new Error('DUPLICATE_CUSTOMER');
  }

  const { data, error } = await supabase
    .from('customers')
    .insert(customer)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/**
 * 고객 수정
 */
export const updateCustomer = async (
  id: string,
  updates: { name?: string; phone?: string }
) => {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/**
 * 고객 삭제
 */
export const deleteCustomer = async (id: string) => {
  const { error } = await supabase.from('customers').delete().eq('id', id);

  if (error) throw error;
};
