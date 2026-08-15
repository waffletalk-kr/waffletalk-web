import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './sanity/schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID;

if (!projectId) {
  throw new Error('Sanity Studio 실행 전 SANITY_STUDIO_PROJECT_ID를 설정해 주세요.');
}

export default defineConfig({
  name: 'waffletalk',
  title: '와플톡 콘텐츠 관리',
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
