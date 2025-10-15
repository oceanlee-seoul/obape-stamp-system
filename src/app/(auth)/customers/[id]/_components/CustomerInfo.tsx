interface CustomerInfoProps {
  customer: {
    name: string;
    phone: string;
    created_at: string;
  };
}

const CustomerInfo = ({ customer }: CustomerInfoProps) => {
  return (
    <section className="flex-1 bg-white rounded-lg shadow-sm border border-brand-100 p-6">
      <h2 className="text-xl font-semibold text-brand-700 mb-6 pb-3 border-b border-brand-100">
        고객 정보
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            이름
          </label>
          <p className="text-lg font-semibold text-gray-900">{customer.name}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            전화번호
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {customer.phone}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            가입일
          </label>
          <p className="text-sm text-gray-700">
            {new Date(customer.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerInfo;
