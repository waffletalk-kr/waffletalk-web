import { announcement } from './announcement';
import { businessHours } from './businessHours';
import { menuCategory } from './menuCategory';
import { menuItem } from './menuItem';
import { pageSeo } from './pageSeo';
import { siteSettings } from './siteSettings';
import { specialHours } from './specialHours';

export const schemaTypes = [
  siteSettings,
  businessHours,
  specialHours,
  menuCategory,
  menuItem,
  announcement,
  pageSeo,
];
