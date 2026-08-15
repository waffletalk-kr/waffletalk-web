import { defineField, defineType } from 'sanity';

export const menuCategory = defineType({
  name: 'menuCategory',
  title: '메뉴 분류',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '분류명', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: '식별자', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: '설명', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: '정렬 순서', type: 'number', validation: (rule) => rule.required().integer().min(0) }),
  ],
  orderings: [{ title: '표시 순서', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
