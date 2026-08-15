import { defineField, defineType } from 'sanity';

export const pageSeo = defineType({
  name: 'pageSeo',
  title: '페이지 SEO',
  type: 'document',
  fields: [
    defineField({ name: 'path', title: '페이지 경로', type: 'string', description: '예: /menu', validation: (rule) => rule.required().regex(/^\//) }),
    defineField({ name: 'title', title: '검색 제목', type: 'string', validation: (rule) => rule.required().max(60) }),
    defineField({ name: 'description', title: '검색 설명', type: 'text', rows: 3, validation: (rule) => rule.required().max(160) }),
    defineField({ name: 'canonical', title: 'Canonical URL', type: 'url' }),
    defineField({ name: 'shareImage', title: '공유 이미지', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'title', subtitle: 'path', media: 'shareImage' } },
});
