# 와플톡 공식 홈페이지

강릉 옥천동 와플톡의 메뉴·영업 정보·픽업 전환을 위한 모바일 우선 정적 홈페이지입니다. 자체 결제는 만들지 않고 페이히어 주문, 전화, 지도 길찾기로 연결합니다.

## 기술 구성

- Astro 7 + TypeScript
- Tailwind CSS 4
- Sanity CMS
- Vercel 정적 배포
- Vitest + Playwright

Astro 환경이 React가 아니므로 SEED React 컴포넌트를 직접 설치하지 않았습니다. 대신 SEED Design의 역할 기반 색상, 4px 간격 체계, 44px 이상 터치 영역, 한 화면의 단일 고강도 CTA, reduced motion 원칙을 Astro 컴포넌트와 CSS 토큰으로 옮겼습니다.

## 로컬 실행

Node.js 22.12 또는 24 LTS를 사용합니다.

```bash
npm install
cp .env.example .env
npm run dev
```

Sanity 연결 전에도 확인된 메뉴·주소·전화 기준값으로 사이트가 빌드됩니다. 영업시간처럼 승인되지 않은 값은 `확인 중`으로 표시합니다.

## 환경 변수

```dotenv
PUBLIC_SITE_URL=https://waffletalk.vercel.app
PUBLIC_SANITY_PROJECT_ID=Sanity-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-08-15
SANITY_STUDIO_PROJECT_ID=Sanity-project-id
SANITY_STUDIO_DATASET=production
```

`PUBLIC_SITE_URL`은 canonical, sitemap, JSON-LD의 기준 URL이므로 실제 도메인이 정해진 뒤 반드시 교체합니다.

## 콘텐츠 운영

```bash
npm run sanity:dev
```

스키마는 다음 운영 항목을 제공합니다.

- 매장 기본 정보와 외부 링크
- 요일별 영업시간과 마지막 주문
- 특별 휴무·공휴일·조기 마감
- 메뉴 분류, 가격, 판매 상태, 준비시간, 알레르기, 사진
- 공지·시즌 메뉴와 노출 종료일
- 페이지별 SEO 정보

Sanity에서 게시할 때 Vercel 정적 사이트를 자동 갱신하려면 Vercel 프로젝트의 Deploy Hook을 만든 뒤 Sanity 프로젝트의 Webhook 대상 URL로 등록합니다. `create`, `update`, `delete` 이벤트를 선택하고, 배포 보호가 켜져 있다면 호출 권한을 별도로 구성합니다. 이 연결은 프로젝트와 배포 권한이 필요한 외부 설정입니다.

## 검증 명령

```bash
npm test
npm run check
npm run lint
npm run build
npm run test:e2e
```

## 출시 전 승인 항목

- 토요일·공휴일·임시휴무·마지막 주문 시간
- 현재 제철 메뉴와 전체 메뉴 판매 상태·가격
- 홀케이크 예약 요일, 가격, 최소 예약 시간
- 공영주차장 1시간 무료 조건과 주차권 제공 여부
- 크림·과일청 직접 제조 표현의 정확한 범위
- 메뉴별 알레르기 정보
- 카카오톡·블로그 공식 링크
- 매장 소유 원본 사진, 로고·간판 원본, 실제 도메인

승인 전에는 위 값을 추정하거나 홍보 문구로 단정하지 않습니다.
