import { NavLink, Title, Avatar, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaRobot, FaUserGraduate, FaChartBar, FaCalendarAlt, FaBook, FaUniversity, FaInfoCircle, FaUser } from 'react-icons/fa';
import { useUserStore } from '../../store/userStore';

export default function Sidebar() {
  const location = useLocation();
  const { role, user } = useUserStore();

  const getMenuItems = () => {
    const commonItems = [
      { icon: FaHome, label: 'Trang chủ', to: '/' },
    ];

    if (role === 'admin') {
      return [
        ...commonItems,
        { icon: FaRobot, label: 'Chatbot', to: '/chat' },
        { icon: FaChartBar, label: 'Thống kê', to: '/dashboard' },
        { icon: FaUserGraduate, label: 'Quản lý sinh viên', to: '/students' },
        { icon: FaBook, label: 'Quản lý FAQ', to: '/faqs' },
      ];
    }

    if (role === 'student') {
      return [
        ...commonItems,
        { icon: FaRobot, label: 'Chatbot', to: '/chat' },
        { icon: FaCalendarAlt, label: 'Lịch học', to: '/schedule' },
        { icon: FaBook, label: 'Kết quả học tập', to: '/grades' },
        { icon: FaInfoCircle, label: 'Thông tin cá nhân', to: '/profile' },
      ];
    }

    // Guest menu
    return [
      ...commonItems,
      { icon: FaUniversity, label: 'Tuyển sinh', to: '/admission' },
      { icon: FaBook, label: 'Ngành đào tạo', to: '/programs' },
      { icon: FaInfoCircle, label: 'Giới thiệu', to: '/about' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex flex-col h-full">
      {/* User Profile Section */}
      <div className="p-4 border-b bg-primary-50">
        <div className="flex items-center gap-3 mb-2">
          <Avatar color={role === 'student' ? 'blue' : 'gray'} radius="xl">
            {role === 'student' ? <FaUserGraduate size={20} /> : <FaUser size={20} />}
          </Avatar>
          <div>
            <Title order={6} className="text-primary-700">
              {role === 'student'
                ? 'Sinh viên HCMUTE'
                : role === 'admin'
                ? 'Quản trị viên'
                : 'Khách'}
            </Title>
            {user && (
              <Text size="sm" c="dimmed">
                {user.email}
              </Text>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            component={Link}
            to={item.to}
            label={item.label}
            leftSection={<item.icon size={20} />}
            active={location.pathname === item.to}
            variant={location.pathname === item.to ? 'filled' : 'light'}
            className="mb-1 rounded-md transition-colors hover:bg-primary-50"
          />
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Text size="sm" c="dimmed" className="text-center">
          © 2024 HCMUTE Chatbot
        </Text>
      </div>
    </div>
  );
} 