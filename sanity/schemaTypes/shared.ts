import { defineField } from 'sanity';

export const timeFields = [
  defineField({
    name: 'closed',
    title: '휴무',
    type: 'boolean',
    initialValue: false,
  }),
  defineField({
    name: 'opens',
    title: '영업 시작',
    description: '24시간제 HH:mm 형식',
    type: 'string',
    validation: (rule) => rule
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:mm' })
      .custom((value, context) => (context.parent as { closed?: boolean } | undefined)?.closed || value ? true : '영업일에는 시작 시간이 필요합니다.'),
    hidden: ({ parent }) => Boolean(parent?.closed),
  }),
  defineField({
    name: 'closes',
    title: '영업 종료',
    description: '24시간제 HH:mm 형식',
    type: 'string',
    validation: (rule) => rule
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:mm' })
      .custom((value, context) => (context.parent as { closed?: boolean } | undefined)?.closed || value ? true : '영업일에는 종료 시간이 필요합니다.'),
    hidden: ({ parent }) => Boolean(parent?.closed),
  }),
  defineField({
    name: 'lastOrder',
    title: '마지막 주문',
    description: '24시간제 HH:mm 형식',
    type: 'string',
    validation: (rule) => rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:mm' }).warning('HH:mm 형식으로 입력해 주세요.'),
    hidden: ({ parent }) => Boolean(parent?.closed),
  }),
];
