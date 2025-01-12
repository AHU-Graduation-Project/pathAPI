export class Edge {
  id: number;
  source?: number;
  target?: number;
  roadmap?: number;
  sourceHandle?: string;
  targetHandle?: string;
  style?: string;
  constructor(
    id: number,
    source?: number,
    target?: number,
    roadmap?: number,
    sourceHandle?: string,
    targetHandle?: string,
    style?: string,
  ) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.roadmap = roadmap;
    this.sourceHandle = sourceHandle;
    this.targetHandle = targetHandle;
    this.style = style;
  }
}
