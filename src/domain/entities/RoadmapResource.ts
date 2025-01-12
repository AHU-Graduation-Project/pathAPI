export class RoadmapResource {
  roadmap: number;
  title?: string;
  link?: string;
  type?: string;
  constructor(roadmap: number, title?: string, link?: string, type?: string) {
    this.roadmap = roadmap;
    this.title = title;
    this.link = link;
    this.type = type;
  }
}
