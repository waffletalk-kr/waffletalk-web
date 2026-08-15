import type { BusinessHoursEntry, DayOfWeek, SpecialHoursEntry } from '@/types/content';

const TIME_ZONE = 'Asia/Seoul';

export interface BusinessStatusResult {
  state: 'open' | 'closed' | 'holiday' | 'unknown';
  label: string;
  detail: string;
  closesAt?: string;
  lastOrderAt?: string;
}

interface SeoulDateTime {
  date: string;
  day: DayOfWeek;
  minutes: number;
}

function toMinutes(value?: string): number | undefined {
  if (!value || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return undefined;
  const [hour, minute] = value.split(':').map(Number);
  return hour * 60 + minute;
}

function getSeoulDateTime(now: Date): SeoulDateTime {
  const dateParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    weekday: 'short',
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    dateParts.find((part) => part.type === type)?.value ?? '';
  const weekdayMap: Record<string, DayOfWeek> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    date: `${value('year')}-${value('month')}-${value('day')}`,
    day: weekdayMap[value('weekday')] ?? 0,
    minutes: Number(value('hour')) * 60 + Number(value('minute')),
  };
}

function previousDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const previous = new Date(Date.UTC(year, month - 1, day - 1));
  return previous.toISOString().slice(0, 10);
}

function scheduleFor(
  date: string,
  day: DayOfWeek,
  weekly: BusinessHoursEntry[],
  special: SpecialHoursEntry[],
): BusinessHoursEntry | SpecialHoursEntry | undefined {
  return special.find((entry) => entry.date === date) ?? weekly.find((entry) => entry.day === day);
}

function isWithinSchedule(minutes: number, opens?: string, closes?: string): boolean {
  const opensMinutes = toMinutes(opens);
  const closesMinutes = toMinutes(closes);
  if (opensMinutes === undefined || closesMinutes === undefined) return false;
  if (opensMinutes < closesMinutes) return minutes >= opensMinutes && minutes < closesMinutes;
  return minutes >= opensMinutes || minutes < closesMinutes;
}

export function getBusinessStatus(
  weekly: BusinessHoursEntry[],
  special: SpecialHoursEntry[],
  now = new Date(),
): BusinessStatusResult {
  if (weekly.length === 0) {
    return {
      state: 'unknown',
      label: '영업시간 확인 중',
      detail: '운영자 확인 후 정확한 시간을 안내할게요.',
    };
  }

  const seoul = getSeoulDateTime(now);
  const todaySpecial = special.find((entry) => entry.date === seoul.date);
  if (todaySpecial?.closed) {
    return {
      state: 'holiday',
      label: '오늘은 휴무',
      detail: todaySpecial.label ?? '특별 휴무로 등록된 날이에요.',
    };
  }

  const today = scheduleFor(seoul.date, seoul.day, weekly, special);
  if (today && !today.closed && isWithinSchedule(seoul.minutes, today.opens, today.closes)) {
    return {
      state: 'open',
      label: '영업 중',
      detail: `영업시간 기준 · ${today.closes}에 영업 종료`,
      closesAt: today.closes,
      lastOrderAt: today.lastOrder,
    };
  }

  const previousDay = ((seoul.day + 6) % 7) as DayOfWeek;
  const previous = scheduleFor(previousDate(seoul.date), previousDay, weekly, special);
  const previousOpens = toMinutes(previous?.opens);
  const previousCloses = toMinutes(previous?.closes);
  if (
    previous &&
    !previous.closed &&
    previousOpens !== undefined &&
    previousCloses !== undefined &&
    previousOpens >= previousCloses &&
    seoul.minutes < previousCloses
  ) {
    return {
      state: 'open',
      label: '영업 중',
      detail: `영업시간 기준 · ${previous.closes}에 영업 종료`,
      closesAt: previous.closes,
      lastOrderAt: previous.lastOrder,
    };
  }

  return {
    state: 'closed',
    label: '영업 종료',
    detail: '영업시간 기준 상태예요. 주문 가능 여부는 주문 페이지에서 확인해 주세요.',
  };
}

export function formatHours(entry: BusinessHoursEntry): string {
  if (entry.closed) return '휴무';
  if (!entry.opens || !entry.closes) return '확인 중';
  return `${entry.opens}–${entry.closes}${entry.lastOrder ? ` · 마지막 주문 ${entry.lastOrder}` : ''}`;
}
