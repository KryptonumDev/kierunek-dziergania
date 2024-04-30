import type { ProductCard } from '@/global/types';

export type Props = {
  data: ProductCard;
  inCart?: boolean;
  horizontal?: boolean;
  tabletHorizontal?: boolean;  
  basis?: string;
  onClick?: () => void;
};
