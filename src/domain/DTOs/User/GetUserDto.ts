export interface GetUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  level?: string;
  country?: string;
  isEmailConfirmed: boolean;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
