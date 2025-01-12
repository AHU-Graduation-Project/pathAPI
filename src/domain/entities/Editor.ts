export class Editor {
  id: number;
  firstName: string;
  midInit?: string;
  lastName: string;
  email: string;
  password: string;
  position?: string;
  level?: string;
  isEmailConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  nationality?: string;
  citizenship?: string;
  isVerified: boolean;
  isSuspended: boolean;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isEmailConfirmed: boolean,
    createdAt: string,
    updatedAt: string,
    isVerified: boolean,
    isSuspended: boolean,
    midInit?: string,
    position?: string,
    level?: string,
    nationality?: string,
    citizenship?: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.midInit = midInit;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.position = position;
    this.level = level;
    this.isEmailConfirmed = isEmailConfirmed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.nationality = nationality;
    this.citizenship = citizenship;
    this.isVerified = isVerified;
    this.isSuspended = isSuspended;
  }
}
