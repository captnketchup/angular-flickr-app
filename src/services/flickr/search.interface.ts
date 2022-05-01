export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface Photos {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
}

export interface PhotoSearchResponse {
  photos: Photos;
  stat: string;
}

export interface PhotoSearchRequest {
  text?: string;
  user_id?: string;
  tags?: string[] | string;
}

