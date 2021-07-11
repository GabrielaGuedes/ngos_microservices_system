export interface IPost extends IBasePost {
  id: number;
  files: IFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INewPost extends IBasePost {}

export interface IPostFilters {
  posted?: boolean;
  minPostedAt?: Date;
  maxPostedAt?: Date;
  orderByPeopleReached?: boolean;
}

export interface IFilesAdded {
  images: IFileAdded[];
}

export interface IRemoveFiles {
  paths: string[];
}

export interface IFile {
  id: number;
  path: string;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
  filePaths: string[];
}

interface IFileAdded {
  fieldname: "multiple_files";
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface IBasePost {
  title: string;
  text?: string;
  postedAt?: Date;
  peopleReached?: number;
}
