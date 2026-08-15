import {
  IconArrowRightLine,
  IconCartFill,
  IconClockFill,
  IconMapLocationpinFill,
  IconPhoneFill,
  IconReceiptFill,
} from '@karrotmarket/react-monochrome-icon';
import { Icon } from '@seed-design/react';

type Name = 'arrow' | 'clock' | 'external' | 'map' | 'menu' | 'order' | 'phone';

const iconMap = {
  arrow: IconArrowRightLine,
  clock: IconClockFill,
  external: IconArrowRightLine,
  map: IconMapLocationpinFill,
  menu: IconReceiptFill,
  order: IconCartFill,
  phone: IconPhoneFill,
} as const;

export default function SeedIcon({ name }: { name: Name }) {
  const IconComponent = iconMap[name];
  return <Icon svg={<IconComponent />} size="24" />;
}
