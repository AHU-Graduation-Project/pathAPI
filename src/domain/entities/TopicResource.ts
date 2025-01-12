export class TopicResource {
  topic: number;
  title?: string;
  link?: string;
  type?: string;
  constructor(topic: number, title?: string, link?: string, type?: string) {
    this.topic = topic;
    this.title = title;
    this.link = link;
    this.type = type;
  }
}
