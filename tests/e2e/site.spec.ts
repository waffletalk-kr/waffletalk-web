import { expect, test } from '@playwright/test';

test('홈에서 핵심 가치와 주문 CTA를 바로 확인할 수 있다', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('와플은 주문받고');
  const orderLink = page.getByRole('link', { name: '메뉴 보고 주문하기' }).first();
  await expect(orderLink).toBeVisible();
  await expect(orderLink).toHaveAttribute('href', 'https://store.payhere.in/waffletalk');
});

test('메뉴 분류와 확인된 가격을 정적 HTML로 제공한다', async ({ page }) => {
  await page.goto('/menu');

  await expect(page.getByRole('heading', { name: '와플', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '생크림 와플' })).toBeVisible();
  await expect(page.getByText('₩2,500')).toBeVisible();
  await expect(page.getByText('신선한 생크림이 들어간 와플이에요.')).toBeVisible();
  await expect(page.getByRole('img', { name: '흰 생크림으로 장식한 원형 생크림 케이크' })).toBeVisible();
  await expect(page.getByRole('img', { name: '초코 생크림으로 장식한 원형 초코 생크림 케이크' })).toBeVisible();
  await expect(page.getByText('확인 중')).toHaveCount(0);
});

test('주문 준비시간과 전화 대체 수단을 안내한다', async ({ page }) => {
  await page.goto('/order');

  await expect(page.getByRole('heading', { name: '메뉴마다 준비시간이 달라요' })).toBeVisible();
  await expect(page.getByText('약 15분')).toBeVisible();
  await expect(page.getByText('최소 1일 전')).toBeVisible();
  await expect(page.getByRole('link', { name: /전화로 확인하기/ })).toHaveAttribute('href', 'tel:+82336413738');
});

test('브랜드 이야기에서 고객에게 필요한 제철 메뉴 정보만 안내한다', async ({ page }) => {
  await page.goto('/story');

  await expect(page.getByText('과일 메뉴는 계절과 재료에 따라 달라질 수 있어요.')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('운영 담당자');
});

test('매장 안내에서 세 지도 서비스와 테이크아웃 정보를 제공한다', async ({ page }) => {
  await page.goto('/store');

  await expect(page.getByText('강원특별자치도 강릉시 옥천로 34, 1층 102호').first()).toBeVisible();
  await expect(page.getByText('테이크아웃 중심 매장').first()).toBeVisible();
  await expect(page.getByText('11:30–19:00').first()).toBeVisible();
  await expect(page.getByRole('link', { name: '네이버지도에서 길찾기' })).toBeVisible();
  await expect(page.getByRole('link', { name: '카카오맵에서 길찾기' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Google Maps에서 길찾기' })).toBeVisible();
});

test('모바일 고정 바에서 주문·전화·길찾기를 한 번에 실행할 수 있다', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.goto('/story');

  const quickActions = page.getByRole('navigation', { name: '빠른 매장 행동' });
  await expect(quickActions).toBeVisible();
  await expect(quickActions.getByRole('link')).toHaveCount(3);
  await expect(quickActions.getByRole('link', { name: '전화' })).toHaveAttribute('href', 'tel:+82336413738');
});

test('주요 화면 너비에서 가로 스크롤이 생기지 않는다', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'));

  for (const width of [360, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, `${width}px 화면의 가로 스크롤`).toBeLessThanOrEqual(dimensions.viewport);
  }
});
