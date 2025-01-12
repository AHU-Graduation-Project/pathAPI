export class Roadmap {
  id: number;
  title: string;
  description?: string;
  slug: string;
  creator?: number;
  isDeleted: boolean;
  isOfficial: boolean;
  createdAt: Date;
  updatedAt: Date;
  icon?: string;
  creatorVisibility?: string;
  adminVisibility?: string;
  constructor(
    id: number,
    title: string,
    slug: string,
    isDeleted: boolean,
    isOfficial: boolean,
    createdAt: Date,
    updatedAt: Date,
    description?: string,
    creator?: number,
    icon?: string,
    creatorVisibility?: string,
    adminVisibility?: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.creator = creator;
    this.isDeleted = isDeleted;
    this.isOfficial = isOfficial;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.icon = icon;
    this.creatorVisibility = creatorVisibility;
    this.adminVisibility = adminVisibility;
  }
}
