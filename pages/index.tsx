import Tabs, { Tab } from '../components/Tabs';

const initialTabs: Tab[] = [
  { id: '1', label: 'Dashboa', url: '/', isPinned: true },
  { id: '2', label: 'Banking', url: `/banking`, isPinned: false },
  { id: '3', label: 'Telefonie', url: '/telefonie', isPinned: false },
  { id: '4', label: 'Accounting', url: '/accounting', isPinned: false },
  { id: '5', label: 'Verkauf', url: '/verkauf', isPinned: false },
  { id: '6', label: 'Statistik', url: '/statistik', isPinned: false },
  { id: '7', label: 'Post Office', url: '/post-office', isPinned: false },
  { id: '8', label: 'Administration', url: '/administration', isPinned: false },
  { id: '9', label: 'Help', url: '/help', isPinned: false },
  { id: '10', label: 'Warenbestand', url: '/warenbestand', isPinned: false },
  { id: '11', label: 'Auswahllisten', url: '/auswahllisten', isPinned: false },
  { id: '12', label: 'Einkauf', url: '/einkauf', isPinned: false },
  { id: '13', label: 'Lagerverwaltung', url: '/lagerverwaltung', isPinned: false },
  { id: '14', label: 'Verkauf', url: '/post-office', isPinned: false },
  { id: '15', label: 'Telefonie', url: '/Telefonie', isPinned: false }

];

export default function HomePage() {
  return <Tabs initialTabs={initialTabs} />;
}