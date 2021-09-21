import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PostMetaData = {
  readOnlyFields: 'updatedAt';
}

type CMImageMetaData = {
  readOnlyFields: 'updatedAt';
}

type GalleryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly type: string;
  readonly category?: string;
  readonly content?: string;
  readonly images?: (string | null)[];
  readonly video?: string;
  readonly tags?: (string | null)[];
  readonly createdAt: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class CMImage {
  readonly id: string;
  readonly image: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly credit?: string;
  readonly date?: string;
  readonly index?: number;
  readonly createdAt: string;
  readonly galleryID?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CMImage, CMImageMetaData>);
  static copyOf(source: CMImage, mutator: (draft: MutableModel<CMImage, CMImageMetaData>) => MutableModel<CMImage, CMImageMetaData> | void): CMImage;
}

export declare class Gallery {
  readonly id: string;
  readonly CMImages?: (CMImage | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Gallery, GalleryMetaData>);
  static copyOf(source: Gallery, mutator: (draft: MutableModel<Gallery, GalleryMetaData>) => MutableModel<Gallery, GalleryMetaData> | void): Gallery;
}