'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/customers', label: '고객' },
    { href: '/admins', label: '관리자' },
  ];

  return (
    <nav className="flex gap-1">
      {navLinks.map((link) => {
        const isActive = pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isActive
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-pink-700 hover:bg-white/50'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
