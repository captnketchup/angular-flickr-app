export interface Owner {
  nsid: string;
  username: string;
  realname: string;
  location: string;
  iconserver: string;
  iconfarm: number;
  path_alias: string;
}

export interface Title {
  _content: string;
}

export interface Description {
  _content: string;
}

export interface Visibility {
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface Dates {
  posted: string;
  taken: string;
  takengranularity: number;
  takenunknown: number;
  lastupdate: string;
}

export interface Editability {
  cancomment: number;
  canaddmeta: number;
}

export interface Publiceditability {
  cancomment: number;
  canaddmeta: number;
}

export interface Usage {
  candownload: number;
  canblog: number;
  canprint: number;
  canshare: number;
}

export interface Comments {
  _content: number;
}

export interface Notes {
  note: any[];
}

export interface People {
  haspeople: number;
}

export interface Tag {
  id: string;
  author: string;
  authorname: string;
  raw: string;
  _content: string;
  machine_tag: string;
}

export interface Tags {
  tag: Tag[];
}

export interface Url {
  type: string;
  _content: string;
}

export interface Urls {
  url: Url[];
}

export interface Photo {
  id: string;
  secret: string;
  server: string;
  farm: number;
  dateuploaded: string;
  isfavorite: number;
  license: number;
  safety_level: number;
  rotation: number;
  originalsecret: string;
  originalformat: string;
  owner: Owner;
  title: Title;
  description: Description;
  visibility: Visibility;
  dates: Dates;
  views: number;
  editability: Editability;
  publiceditability: Publiceditability;
  usage: Usage;
  comments: Comments;
  notes: Notes;
  people: People;
  tags: Tags;
  urls: Urls;
  media: string;
}

export interface PhotoMeta {
  photo: Photo;
  stat: string;
}