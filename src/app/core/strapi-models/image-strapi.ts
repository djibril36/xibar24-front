export interface ImageStrapi {
  id: number;
  attributes: {
    name: string;
    url: string;
    mime: string;
    size: number;

    formats?: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
  };
}

export interface ImageFormat {
  url: string;
  width: number;
  height: number;
}
