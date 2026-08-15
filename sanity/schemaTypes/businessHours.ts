import { defineField, defineType } from 'sanity';

import { timeFields } from './shared';

const days = [
  { title: '일요일', value: 0 },
  { title: '월요일', value: 1 },
  { title: '화요일', value: 2 },
  { title: '수요일', value: 3 },
  { title: '목요일', value: 4 },
  { title: '금요일', value: 5 },
  { title: '토요일', value: 6 },
];

export const businessHours = defineType({
  name: 'businessHours',
  title: '요일별 영업시간',
  type: 'document',
  fields: [
    defineField({ name: 'day', title: '요일', type: 'number', options: { list: days }, validation: (rule) => rule.required().integer().min(0).max(6) }),
    defineField({ name: 'label', title: '표시 요일명', type: 'string', validation: (rule) => rule.required() }),
    ...timeFields,
  ],
  preview: {
    select: { title: 'label', closed: 'closed', opens: 'opens', closes: 'closes' },
    prepare: ({ title, closed, opens, closes }) => ({ title, subtitle: closed ? '휴무' : `${opens ?? '확인 중'}–${closes ?? '확인 중'}` }),
  },
});
