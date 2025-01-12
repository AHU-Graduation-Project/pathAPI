export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position?: string;
  level?: string;
  country?: string;
  isEmailConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileImage?: { data: string };
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isEmailConfirmed: boolean,
    createdAt: Date,
    updatedAt: Date,
    profileImage?: { data: string },
    position?: string,
    level?: string,
    country?: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.position = position;
    this.level = level;
    this.country = country;
    this.isEmailConfirmed = isEmailConfirmed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.profileImage = profileImage;
  }
}
