import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuthStore, useUIStore } from '../../store';

export default function Layout() {
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen } = useUIStore();
  const location = useLocation();

  const isPublicPage = ['/', '/login', '/register', '/pricing'].includes(location.pathname);
  const showSidebar = isAuthenticated && !isPublicPage;

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      {showSidebar && <Sidebar />}
      <main
        className={`transition-all duration-300 ${
          showSidebar ? 'lg:ml-[260px]' : ''
        } pt-16 lg:pt-18`}
      >
        <Outlet />
      </main>
      {isPublicPage && <Footer />}
    </div>
  );
}
