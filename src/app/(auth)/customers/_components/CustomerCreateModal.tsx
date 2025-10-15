'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormValues = {
  name: string;
  phone: string;
  gender: 'male' | 'female';
  note?: string;
};

const schema = z.object({
  name: z.string().trim().min(1, { message: '이름을 입력하세요.' }),
  phone: z
    .string()
    .trim()
    .min(1, { message: '전화번호를 입력하세요.' })
    .regex(/^[0-9\-+()\s]{7,20}$/i, {
      message: '유효한 전화번호를 입력하세요.',
    }),
  gender: z.enum(['male', 'female']),
  note: z
    .string()
    .max(500, { message: '메모는 500자 이하로 입력하세요.' })
    .optional(),
});

export default function CustomerCreateModal({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: FormValues) => Promise<void> | void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { gender: 'male' },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="w-full"
    >
      <h2 className="text-lg font-semibold mb-3">고객 추가</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            className="w-full rounded border border-brand-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="홍길동"
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">전화번호</label>
          <input
            className="w-full rounded border border-brand-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="010-1234-5678"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <span className="block text-sm font-medium mb-1">성별</span>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" value="male" {...register('gender')} />
              남성
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" value="female" {...register('gender')} />
              여성
            </label>
          </div>
          {errors.gender && (
            <p className="mt-1 text-xs text-rose-600">
              {errors.gender.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">메모</label>
          <textarea
            className="w-full min-h-24 rounded border border-brand-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="특이사항을 입력하세요."
            {...register('note')}
          />
          {errors.note && (
            <p className="mt-1 text-xs text-rose-600">{errors.note.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="px-3 py-2 text-sm rounded border border-brand-300 text-brand-700 hover:bg-brand-50"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3 py-2 text-sm rounded bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50"
        >
          {isSubmitting ? '등록 중...' : '등록'}
        </button>
      </div>
    </form>
  );
}
