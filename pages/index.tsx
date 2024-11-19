import Tabs, { Tab } from '../components/Tabs';

const initialTabs: Tab[] = [
  { id: '1', label: 'Home', url: '/', isPinned: true },
  { id: '2', label: 'Profile', url: '/profile', isPinned: false },
  { id: '3', label: 'Settings', url: '/settings', isPinned: false },
];

export default function HomePage() {
  return <Tabs initialTabs={initialTabs} />;
}