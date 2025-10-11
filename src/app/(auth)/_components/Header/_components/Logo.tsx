import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-xl">OSS</span>
      </div>
    </Link>
  );
};

export default Logo;
