export class TopicKeywords {
  topic: number;
  keyword?: string;
  constructor(topic: number, keyword?: string) {
    this.topic = topic;
    this.keyword = keyword;
  }
}
