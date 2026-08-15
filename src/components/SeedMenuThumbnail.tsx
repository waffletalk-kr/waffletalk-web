import { ContentPlaceholder } from 'seed-design/ui/content-placeholder';

interface Props {
  imageUrl?: string;
  imageAlt: string;
}

export default function SeedMenuThumbnail({ imageUrl, imageAlt }: Props) {
  if (imageUrl) {
    return <img className="menu-thumbnail" src={imageUrl} width={88} height={88} loading="lazy" decoding="async" alt={imageAlt} />;
  }

  return <ContentPlaceholder className="menu-thumbnail" type="food" aria-hidden="true" />;
}
