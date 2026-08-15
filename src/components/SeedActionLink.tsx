import {
  IconArrowRightLine,
  IconCartFill,
  IconClockFill,
  IconMapFill,
  IconPhoneFill,
  IconReceiptFill,
} from '@karrotmarket/react-monochrome-icon';
import { PrefixIcon, SuffixIcon } from '@seed-design/react';
import { ActionButton } from 'seed-design/ui/action-button';

type Variant = 'brand' | 'weak' | 'outline';
type IconName = 'arrow' | 'clock' | 'external' | 'map' | 'menu' | 'order' | 'phone' | 'waffle';

interface Props {
  href: string;
  label: string;
  variant?: Variant;
  icon?: IconName;
  event?: string;
  location?: string;
  service?: string;
  className?: string;
}

const variantMap = {
  brand: 'brandSolid',
  weak: 'neutralWeak',
  outline: 'neutralOutline',
} as const;

const iconMap = {
  clock: IconClockFill,
  external: IconArrowRightLine,
  map: IconMapFill,
  menu: IconReceiptFill,
  order: IconCartFill,
  phone: IconPhoneFill,
  waffle: IconReceiptFill,
} as const;

export default function SeedActionLink({
  href,
  label,
  variant = 'brand',
  icon,
  event,
  location,
  service,
  className = '',
}: Props) {
  const IconComponent = icon && icon !== 'arrow' ? iconMap[icon] : null;

  return (
    <ActionButton asChild size="large" variant={variantMap[variant]} className={`seed-action-link ${className}`.trim()}>
      <a
        href={href}
        data-analytics-event={event}
        data-analytics-location={location}
        data-analytics-service={service}
      >
        {IconComponent && <PrefixIcon svg={<IconComponent />} />}
        <span>{label}</span>
        {icon === 'arrow' && <SuffixIcon svg={<IconArrowRightLine />} />}
      </a>
    </ActionButton>
  );
}
