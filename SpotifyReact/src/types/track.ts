export type Track = {
  id: string;
  name: string;
  duration?: number;
  image?: string;
  path: string;
  artist: string;
  isLiked: boolean;
};