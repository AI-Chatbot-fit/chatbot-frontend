import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import { useUserStore } from './store/userStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const role = useUserStore((state) => state.role);
  const user = useUserStore((state) => state.user);

  // Nếu chưa chọn vai trò, chuyển về trang chủ
  if (role === 'guest' && !allowedRoles.includes('guest')) {
    return <Navigate to="/" replace />;
  }

  // Nếu là sinh viên nhưng chưa đăng nhập
  if (role === 'student' && !user) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra quyền truy cập
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          
          {/* Common Routes - Yêu cầu đã chọn vai trò */}
          <Route
            path="chat"
            element={
              <ProtectedRoute allowedRoles={['student', 'guest']}>
                <Chat />
              </ProtectedRoute>
            }
          />
          
          {/* Student Routes */}
          <Route
            path="schedule"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <div>Lịch học (Coming soon)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="grades"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <div>Kết quả học tập (Coming soon)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <div>Thông tin cá nhân (Coming soon)</div>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div>Thống kê (Coming soon)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="students"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div>Quản lý sinh viên (Coming soon)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="faqs"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div>Quản lý FAQ (Coming soon)</div>
              </ProtectedRoute>
            }
          />

          {/* Guest Routes */}
          <Route path="admission" element={<div>Tuyển sinh (Coming soon)</div>} />
          <Route path="programs" element={<div>Ngành đào tạo (Coming soon)</div>} />
          <Route path="about" element={<div>Giới thiệu (Coming soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
