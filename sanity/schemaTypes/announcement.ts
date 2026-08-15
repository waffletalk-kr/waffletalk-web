import { defineField, defineType } from 'sanity';

export const announcement = defineType({
  name: 'announcement',
  title: '공지·시즌 메뉴',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '제목', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: '주소 식별자', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'summary', title: '요약', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: '게시 시작', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'expiresAt', title: '홈 노출 종료', type: 'datetime', description: '종료 후 URL은 유지하고 홈에서만 숨깁니다.' }),
    defineField({ name: 'importance', title: '중요도', type: 'string', options: { list: [{ title: '일반', value: 'normal' }, { title: '중요', value: 'important' }], layout: 'radio' }, initialValue: 'normal', validation: (rule) => rule.required() }),
    defineField({ name: 'relatedMenus', title: '관련 메뉴', type: 'array', of: [{ type: 'reference', to: [{ type: 'menuItem' }] }] }),
    defineField({ name: 'href', title: 'CTA 링크', type: 'url' }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt' } },
});
