export class RoadmapFeedback {
  roadmap: number;
  userId: number;
  feedback: string;
  rating?: number;
  constructor(
    roadmap: number,
    userId: number,
    feedback: string,
    rating?: number,
  ) {
    this.roadmap = roadmap;
    this.userId = userId;
    this.feedback = feedback;
    this.rating = rating;
  }
}
