import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const categoryTypes = [
  {
    id: '0',
    value: 'material',
    label: 'Material',
  },
  {
    id: '1',
    value: 'produk jadi',
    label: 'Produk Jadi',
  },
  {
    id: '2',
    value: 'servis',
    label: 'Servis',
  },

  {
    id: '3',
    value: 'jasa',
    label: 'Jasa',
  },
];

export const statuses = [
  {
    id: '0',
    value: 'aktif',
    label: 'Aktif',
    icon: CheckCircledIcon,
  },
  {
    id: '1',
    value: 'tidak aktif',
    label: 'Tidak Aktif',
    icon: CrossCircledIcon,
  },
];

export const categories = [
  {
    value: 'bed',
    label: 'Bed',
    icon: ArrowDownIcon,
  },
  {
    value: 'baby',
    label: 'Baby',
    icon: ArrowRightIcon,
  },
  {
    value: 'strecher',
    label: 'Strecher',
    icon: ArrowUpIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
