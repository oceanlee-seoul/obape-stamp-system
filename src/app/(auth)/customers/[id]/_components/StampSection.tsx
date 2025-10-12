import StampCards from './StampCards';

interface StampSectionProps {
  stampCount: number;
}

const StampSection = ({ stampCount }: StampSectionProps) => {
  return (
    <section className="flex-1 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-sm border border-pink-200 p-6">
      <h2 className="text-xl font-semibold text-pink-700 mb-6 pb-3 border-b border-pink-200">
        스탬프 현황
      </h2>

      <StampCards count={stampCount} />

      <div className="mt-6 pt-6 border-t border-pink-200">
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm">
            스탬프 추가
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-50 transition-all">
            스탬프 제거
          </button>
        </div>
      </div>
    </section>
  );
};

export default StampSection;
