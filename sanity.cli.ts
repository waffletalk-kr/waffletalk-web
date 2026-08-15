import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID;

if (!projectId) {
  throw new Error('Sanity CLI 실행 전 SANITY_STUDIO_PROJECT_ID를 설정해 주세요.');
}

export default defineCliConfig({
  api: {
    projectId,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
});
