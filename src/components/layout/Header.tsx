import { Burger, Group, Title } from '@mantine/core';
import { FaGraduationCap } from 'react-icons/fa';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group>
          <FaGraduationCap size={24} className="text-primary-500" />
          <Title order={3} className="text-primary-500">HCMUTE Chatbot</Title>
        </Group>
      </Group>
    </Group>
  );
} 