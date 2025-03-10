import { Title, Text, Button, Container, Paper, Group, Box } from '@mantine/core';
import { FaUserGraduate, FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

export default function Home() {
  const navigate = useNavigate();
  const setRole = useUserStore((state) => state.setRole);

  const handleRoleSelect = (role: 'student' | 'guest') => {
    if (role === 'student') {
      navigate('/login');
    } else {
      setRole('guest');
      navigate('/chat');
    }
  };

  const RoleCard = ({ 
    role, 
    icon: Icon, 
    title, 
    description, 
    buttonText, 
    variant = 'filled' 
  }: { 
    role: 'student' | 'guest';
    icon: any;
    title: string;
    description: string;
    buttonText: string;
    variant?: 'filled' | 'light';
  }) => (
    <Paper
      shadow="sm"
      p="xl"
      className="w-[380px] h-[380px] flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => handleRoleSelect(role)}
    >
      <div className="flex-1 flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center">
          <Icon size={48} className="text-primary-500" />
        </div>
        <div className="text-center px-4">
          <Title order={3} className="mb-4">{title}</Title>
          <Text c="dimmed" size="md" className="leading-relaxed">
            {description}
          </Text>
        </div>
      </div>
      <Button 
        variant={variant}
        size="lg"
        fullWidth
        className={variant === 'filled' ? 
          "bg-primary-500 hover:bg-primary-600" : 
          "bg-primary-50 hover:bg-primary-100 text-primary-500"
        }
      >
        {buttonText}
      </Button>
    </Paper>
  );

  return (
    <Container size="lg" py="xl">
      {/* Header Section */}
      <Box className="flex flex-col items-center justify-center mb-16">
        <Title className="text-primary-500 text-4xl font-bold mb-6 text-center">
          Chào mừng đến với HCMUTE Chatbot
        </Title>
        <Text 
          size="lg" 
          c="dimmed" 
          className="max-w-3xl text-center leading-relaxed"
          px="md"
        >
          Chatbot thông minh hỗ trợ sinh viên và người quan tâm tìm hiểu thông tin về
          <br />
          Trường Đại học Sư phạm Kỹ thuật TP.HCM
        </Text>
      </Box>

      {/* Role Selection Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <Group justify="center" gap={48}>
          <RoleCard
            role="student"
            icon={FaUserGraduate}
            title="Tôi là sinh viên HCMUTE"
            description="Đăng nhập bằng email trường để được hỗ trợ đầy đủ về thông tin học tập, điểm số và các vấn đề liên quan đến sinh viên."
            buttonText="Đăng nhập với gmail"
          />
          <RoleCard
            role="guest"
            icon={FaUserFriends}
            title="Tôi là học sinh/phụ huynh"
            description="Tìm hiểu thông tin tuyển sinh, ngành học, cơ sở vật chất và các hoạt động của trường HCMUTE."
            buttonText="Bắt đầu trò chuyện ngay"
            variant="light"
          />
        </Group>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Paper p="xl" radius="md" className="text-center">
          <Title order={3} className="mb-4 text-primary-500">
            Thông tin tuyển sinh
          </Title>
          <Text c="dimmed">
            Tìm hiểu về các ngành học, điểm chuẩn, và quy trình xét tuyển tại
            HCMUTE.
          </Text>
        </Paper>

        <Paper p="xl" radius="md" className="text-center">
          <Title order={3} className="mb-4 text-primary-500">
            Hỗ trợ sinh viên
          </Title>
          <Text c="dimmed">
            Giải đáp thắc mắc về học tập, đời sống sinh viên và các vấn đề liên
            quan.
          </Text>
        </Paper>

        <Paper p="xl" radius="md" className="text-center">
          <Title order={3} className="mb-4 text-primary-500">
            Hỗ trợ 24/7
          </Title>
          <Text c="dimmed">
            Chatbot luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi với câu trả lời
            nhanh chóng.
          </Text>
        </Paper>
      </div>
    </Container>
  );
} 