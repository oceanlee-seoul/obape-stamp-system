import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-md overflow-hidden">
        <Image
          src="/logo.PNG"
          alt="OSS Logo"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
