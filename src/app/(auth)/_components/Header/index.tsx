import Logo from './_components/Logo';
import Nav from './_components/Nav';
import UserInfo from './_components/UserInfo';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100 border-b border-pink-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* 로고 & 네비게이션 */}
          <div className="flex items-center gap-8">
            <Logo />
            <Nav />
          </div>

          {/* 유저 정보 */}
          <UserInfo />
        </div>
      </div>
    </header>
  );
};

export default Header;
