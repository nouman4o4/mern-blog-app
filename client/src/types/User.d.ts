export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profileImage?: string;
  posts?: string[];
  gender: string;
}
