export class Topic {
  id: number;
  prerequisites?: number;
  roadmap?: number;
  description?: string;
  label?: string;
  type?: string;
  positionX?: number;
  positionY?: number;
  height?: number;
  width?: number;
  zIndex?: number;
  isSkill: boolean;
  isDeleted: boolean;
  isAnalysisNeeded: boolean;
  createdAt: string;
  updatedAt: string;
  constructor(
    id: number,
    isSkill: boolean,
    isDeleted: boolean,
    isAnalysisNeeded: boolean,
    createdAt: string,
    updatedAt: string,
    prerequisites?: number,
    roadmap?: number,
    description?: string,
    label?: string,
    type?: string,
    positionX?: number,
    positionY?: number,
    height?: number,
    width?: number,
    zIndex?: number,
  ) {
    this.id = id;
    this.prerequisites = prerequisites;
    this.roadmap = roadmap;
    this.description = description;
    this.label = label;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.height = height;
    this.width = width;
    this.zIndex = zIndex;
    this.isSkill = isSkill;
    this.isDeleted = isDeleted;
    this.isAnalysisNeeded = isAnalysisNeeded;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
