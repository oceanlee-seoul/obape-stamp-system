'use client';

import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

type FormValues = {
  name: string;
  phone: string;
  gender: 'male' | 'female';
  note?: string;
};

const schema = z.object({
  name: z.coerce.string().trim().min(1, { message: '이름을 입력하세요.' }),
  phone: z.coerce
    .string()
    .trim()
    .min(1, { message: '전화번호를 입력하세요.' })
    .regex(/^[0-9]{10,11}$/, { message: '10-11자리 숫자만 입력하세요.' }),
  gender: z.enum(['male', 'female']),
  note: z.coerce
    .string()
    .trim()
    .max(500, { message: '메모는 500자 이하로 입력하세요.' })
    .optional(),
});

// 안전한 resolver 생성자 (커스텀)
const safeResolver = (schema: z.ZodTypeAny) => async (data: unknown) => {
  try {
    const parsed = await schema.safeParseAsync(data);
    if (parsed.success) return { values: parsed.data, errors: {} };

    // Zod 에러를 react-hook-form 형식으로 변환
    const formattedErrors = parsed.error.format();
    const errors: Record<string, { type: string; message: string }> = {};

    Object.keys(formattedErrors).forEach((key) => {
      if (key !== '_errors' && formattedErrors[key]?._errors?.length > 0) {
        errors[key] = {
          type: 'validation',
          message: formattedErrors[key]._errors[0],
        };
      }
    });

    return { values: {}, errors };
  } catch (err) {
    console.error('[safeResolver Error]', err);
    return { values: {}, errors: {} };
  }
};

export default function CustomerEditModal({
  customer,
  onSubmit,
  onCancel,
}: {
  customer: {
    name: string;
    phone: string;
    gender?: 'male' | 'female';
    note?: string | null;
  };
  onSubmit: (values: FormValues) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: safeResolver(schema) as Resolver<FormValues, unknown>,
    defaultValues: {
      name: customer.name,
      phone: customer.phone,
      gender: customer.gender || 'male',
      note: customer.note || '',
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    // Check if form is valid before proceeding
    if (!isValid) {
      return;
    }
    setFormData(values);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      await onSubmit(formData);
    }
  };

  if (showConfirm && formData) {
    return (
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-4">고객 정보 수정 확인</h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">이름:</span>
              <p className="text-base font-semibold text-gray-900">
                {formData.name}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">
                전화번호:
              </span>
              <p className="text-base font-semibold text-gray-900">
                {formData.phone}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">성별:</span>
              <p className="text-base font-semibold text-gray-900">
                {formData.gender === 'male' ? '남자' : '여자'}
              </p>
            </div>
            {formData.note && (
              <div>
                <span className="text-sm font-medium text-gray-600">메모:</span>
                <p className="text-base text-gray-900">{formData.note}</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-gray-700 text-sm">
            위 정보로 고객 정보를 수정하시겠습니까?
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowConfirm(false)}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            수정
          </button>
          <button
            type="button"
            disabled={isSubmitting || !isValid}
            onClick={handleConfirm}
            className="px-6 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:bg-brand-300 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? '수정 중...' : '수정'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full"
      noValidate
    >
      <h2 className="text-lg font-semibold mb-3">고객 정보 수정</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            이름 <span className="text-rose-600">*</span>
          </label>
          <input
            className="w-full rounded border border-brand-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="홍길동"
            aria-invalid={!!errors.name || undefined}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            전화번호 <span className="text-rose-600">*</span>
          </label>
          <input
            type="number"
            className="w-full rounded border border-brand-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="'-' 없이 숫자만 (ex: 01012345678)"
            aria-invalid={!!errors.phone || undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <span className="block text-sm font-medium mb-1">
            성별 <span className="text-rose-600">*</span>
          </span>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" value="male" {...register('gender')} />
              남자
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" value="female" {...register('gender')} />
              여자
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
            placeholder="결제관련 특이사항, 주소지 등"
            aria-invalid={!!errors.note || undefined}
            {...register('note')}
          />
          {errors.note && (
            <p className="mt-1 text-xs text-rose-600">{errors.note.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:bg-brand-300 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? '수정 중...' : '수정'}
        </button>
      </div>
    </form>
  );
}
