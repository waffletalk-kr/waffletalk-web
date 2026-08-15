import { defineField, defineType } from 'sanity';

export const menuItem = defineType({
  name: 'menuItem',
  title: '메뉴',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: '메뉴명', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: '식별자', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: '분류', type: 'reference', to: [{ type: 'menuCategory' }], validation: (rule) => rule.required() }),
    defineField({ name: 'price', title: '가격(원)', type: 'number', validation: (rule) => rule.required().integer().min(0) }),
    defineField({ name: 'description', title: '설명', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: 'status',
      title: '판매 상태',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: '판매 중', value: 'available' },
          { title: '오늘 품절', value: 'soldOut' },
          { title: '현재 판매 종료', value: 'seasonEnded' },
          { title: '확인 필요', value: 'unverified' },
        ],
      },
      initialValue: 'unverified',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'seasonal', title: '제철 메뉴', type: 'boolean', initialValue: false }),
    defineField({ name: 'featured', title: '대표 메뉴', type: 'boolean', initialValue: false }),
    defineField({ name: 'preparationMinutes', title: '예상 준비시간(분)', type: 'number', validation: (rule) => rule.integer().positive() }),
    defineField({ name: 'allergens', title: '알레르기 정보', type: 'array', of: [{ type: 'string' }], validation: (rule) => rule.required().min(1).warning('출시 전 알레르기 정보를 확인해 주세요.') }),
    defineField({
      name: 'image',
      title: '메뉴 사진',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: '대체 텍스트', type: 'string', validation: (rule) => rule.required().warning('사진 내용을 설명하는 대체 텍스트가 필요합니다.') })],
    }),
    defineField({ name: 'imageAlt', title: '사진 대체 텍스트', type: 'string', description: 'Astro 출력용 대체 텍스트' }),
    defineField({ name: 'updatedAt', title: '가격 확인일', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: '정렬 순서', type: 'number', validation: (rule) => rule.required().integer().min(0) }),
  ],
  orderings: [{ title: '분류·표시 순서', name: 'categoryOrder', by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'status', media: 'image' },
  },
});
