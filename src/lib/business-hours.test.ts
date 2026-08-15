import { describe, expect, it } from 'vitest';

import { getBusinessStatus } from './business-hours';
import type { BusinessHoursEntry, SpecialHoursEntry } from '@/types/content';

const weekly: BusinessHoursEntry[] = [
  { day: 0, label: '일요일', closed: true },
  { day: 1, label: '월요일', closed: false, opens: '10:00', closes: '19:00', lastOrder: '18:30' },
  { day: 2, label: '화요일', closed: false, opens: '10:00', closes: '19:00' },
  { day: 3, label: '수요일', closed: false, opens: '10:00', closes: '19:00' },
  { day: 4, label: '목요일', closed: false, opens: '10:00', closes: '19:00' },
  { day: 5, label: '금요일', closed: false, opens: '10:00', closes: '19:00' },
  { day: 6, label: '토요일', closed: false, opens: '11:00', closes: '17:00' },
];

const atSeoul = (isoWithOffset: string) => new Date(isoWithOffset);

describe('getBusinessStatus', () => {
  it('평일 영업시간 안에는 영업 중이다', () => {
    const result = getBusinessStatus(weekly, [], atSeoul('2026-08-17T14:00:00+09:00'));
    expect(result.state).toBe('open');
    expect(result.lastOrderAt).toBe('18:30');
  });

  it('토요일은 별도 영업시간을 적용한다', () => {
    expect(getBusinessStatus(weekly, [], atSeoul('2026-08-22T10:59:00+09:00')).state).toBe('closed');
    expect(getBusinessStatus(weekly, [], atSeoul('2026-08-22T11:00:00+09:00')).state).toBe('open');
  });

  it('영업 종료 경계 시각부터 종료 상태다', () => {
    expect(getBusinessStatus(weekly, [], atSeoul('2026-08-17T18:59:00+09:00')).state).toBe('open');
    expect(getBusinessStatus(weekly, [], atSeoul('2026-08-17T19:00:00+09:00')).state).toBe('closed');
  });

  it('특별 휴무가 주간 영업시간보다 우선한다', () => {
    const special: SpecialHoursEntry[] = [
      { date: '2026-08-17', label: '임시 휴무', closed: true },
    ];
    const result = getBusinessStatus(weekly, special, atSeoul('2026-08-17T14:00:00+09:00'));
    expect(result.state).toBe('holiday');
    expect(result.detail).toBe('임시 휴무');
  });

  it('특별 조기 마감 시간을 적용한다', () => {
    const special: SpecialHoursEntry[] = [
      { date: '2026-08-17', label: '조기 마감', closed: false, opens: '10:00', closes: '15:00' },
    ];
    expect(getBusinessStatus(weekly, special, atSeoul('2026-08-17T14:59:00+09:00')).state).toBe('open');
    expect(getBusinessStatus(weekly, special, atSeoul('2026-08-17T15:00:00+09:00')).state).toBe('closed');
  });

  it('자정을 넘는 영업시간을 이전 요일에서 이어서 계산한다', () => {
    const overnight: BusinessHoursEntry[] = [
      ...weekly.filter((entry) => entry.day !== 5),
      { day: 5, label: '금요일', closed: false, opens: '18:00', closes: '01:00' },
    ];
    expect(getBusinessStatus(overnight, [], atSeoul('2026-08-22T00:30:00+09:00')).state).toBe('open');
    expect(getBusinessStatus(overnight, [], atSeoul('2026-08-22T01:00:00+09:00')).state).toBe('closed');
  });

  it('영업시간이 승인되지 않았으면 확인 중 상태다', () => {
    expect(getBusinessStatus([], [], atSeoul('2026-08-17T14:00:00+09:00')).state).toBe('unknown');
  });
});
