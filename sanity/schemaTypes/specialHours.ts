import { defineField, defineType } from 'sanity';

import { timeFields } from './shared';

export const specialHours = defineType({
  name: 'specialHours',
  title: '특별 휴무·조기 마감',
  type: 'document',
  fields: [
    defineField({ name: 'date', title: '적용 날짜', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'label', title: '안내 문구', type: 'string', description: '예: 추석 휴무, 재료 소진 조기 마감' }),
    ...timeFields,
  ],
  preview: {
    select: { title: 'date', subtitle: 'label' },
  },
});
