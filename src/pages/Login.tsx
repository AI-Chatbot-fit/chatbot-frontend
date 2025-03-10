import { useState } from 'react';
import { TextInput, Button, Paper, Title, Text, Container, PasswordInput, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, setRole } = useUserStore();

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
    setError('');
  };

  const validateEmail = (email: string) => {
    return email.endsWith('@hcmute.edu.vn');
  };

  const handleLogin = () => {
    if (!validateEmail(formData.username)) {
      setError('Vui lòng sử dụng email @hcmute.edu.vn');
      return;
    }

    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    // TODO: Integrate with real authentication API
    setUser({
      id: '1',
      name: formData.username.split('@')[0],
      email: formData.username,
      role: 'student',
      studentId: '20110123', // Mẫu MSSV
    });
    setRole('student');
    navigate('/chat');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login clicked');
  };

  return (
    <Container size="xs" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} className="text-center mb-6 text-primary-500">
          Đăng nhập HCMUTE Chatbot
        </Title>

        <TextInput
          label="Email trường"
          placeholder="your.name@hcmute.edu.vn"
          value={formData.username}
          onChange={handleInputChange('username')}
          error={error}
          className="mb-4"
        />

        <PasswordInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          value={formData.password}
          onChange={handleInputChange('password')}
          className="mb-4"
        />

        <Button
          fullWidth
          onClick={handleLogin}
          disabled={!formData.username || !formData.password}
          className="bg-primary-500 hover:bg-primary-600"
        >
          Đăng nhập
        </Button>

        <Divider label="hoặc" labelPosition="center" my="lg" />

        <Button
          fullWidth
          variant="outline"
          leftSection={<FaGoogle />}
          onClick={handleGoogleLogin}
          className="border-gray-300"
        >
          Đăng nhập bằng Google
        </Button>

        <Text c="dimmed" size="sm" className="mt-4 text-center">
          Chỉ dành cho sinh viên và cán bộ HCMUTE
        </Text>
      </Paper>
    </Container>
  );
} 