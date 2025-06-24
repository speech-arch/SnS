export interface ParkInfo {
  name: string;
  status?: { text: string; severity: string } | null;
  rating?: number | null;
  description?: string;
  location?: string;
  infoRows?: Array<ParkInfoRow>;
}

export interface ParkInfoRow {
  icon: string;
  label: string;
  value?: string;
  iconColor?: string;
  tag?: { text: string; severity: string };
}

export interface ParkImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt?: string;
}

export interface ParkReview {
  id: number;
  author: string;
  comment: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface ParkRelated {
  image: string;
  name: string;
  location: string;
  rating: number;
  [key: string]: any;
}
