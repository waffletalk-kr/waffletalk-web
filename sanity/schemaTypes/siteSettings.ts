import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '매장 기본 정보',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: '상호', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: '매장 한 줄 소개', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'address', title: '전체 주소', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'addressRegion', title: '시·도', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'addressLocality', title: '시·군·구', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'streetAddress', title: '도로명 주소', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'postalCode', title: '우편번호', type: 'string' }),
    defineField({ name: 'telephone', title: '표시 전화번호', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'telephoneHref', title: '전화 링크', type: 'string', description: '예: tel:+82336413738', validation: (rule) => rule.required().regex(/^tel:\+\d+$/) }),
    defineField({ name: 'priceRange', title: '가격대', type: 'string', initialValue: '₩' }),
    defineField({ name: 'takeawayOnly', title: '테이크아웃 중심', type: 'boolean', initialValue: true }),
    defineField({ name: 'hoursVerified', title: '영업시간 운영자 승인 완료', type: 'boolean', initialValue: false }),
    defineField({
      name: 'links',
      title: '외부 링크',
      type: 'object',
      fields: [
        defineField({ name: 'order', title: '페이히어 주문', type: 'url', validation: (rule) => rule.required() }),
        defineField({ name: 'naverPlace', title: '네이버 플레이스', type: 'url', validation: (rule) => rule.required() }),
        defineField({ name: 'naverMap', title: '네이버지도', type: 'url', validation: (rule) => rule.required() }),
        defineField({ name: 'kakaoMap', title: '카카오맵', type: 'url', validation: (rule) => rule.required() }),
        defineField({ name: 'googleMaps', title: 'Google Maps', type: 'url', validation: (rule) => rule.required() }),
        defineField({ name: 'kakaoChat', title: '카카오톡 문의', type: 'url' }),
        defineField({ name: 'blog', title: '네이버 블로그', type: 'url' }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'address' },
  },
});
