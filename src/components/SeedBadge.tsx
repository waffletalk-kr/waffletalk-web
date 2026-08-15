import { Badge } from '@seed-design/react';
import type { MenuItem } from '@/types/content';

interface Props {
  status: MenuItem['status'];
}

const presentation = {
  available: { label: '판매 중', tone: 'positive' },
  soldOut: { label: '오늘 품절', tone: 'critical' },
  seasonEnded: { label: '판매 종료', tone: 'neutral' },
  unverified: { label: '확인 중', tone: 'warning' },
} as const;

export default function SeedBadge({ status }: Props) {
  const { label, tone } = presentation[status];

  return (
    <Badge tone={tone} variant="weak" size="medium">
      {label}
    </Badge>
  );
}
