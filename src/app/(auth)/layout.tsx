import { Toaster } from 'react-hot-toast';
import Header from './_components/Header';
import { UserProvider } from '@/app/contexts/UserContext';

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider requireAuth>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #fdd0dc',
          },
          success: {
            iconTheme: {
              primary: '#f64b7f',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Header />
      {children}
    </UserProvider>
  );
}
