export class Admin {
  id: number;
  firstName: string;
  midInit?: string;
  lastName: string;
  email: string;
  password: string;
  isEmailConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isSuspended: boolean;
  isHost: boolean;
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
    isHost: boolean,
    midInit?: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.midInit = midInit;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isEmailConfirmed = isEmailConfirmed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isVerified = isVerified;
    this.isSuspended = isSuspended;
    this.isHost = isHost;
  }
}
