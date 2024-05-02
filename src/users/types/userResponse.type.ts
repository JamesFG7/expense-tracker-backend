import { User } from '../../schemas/User.schema';

export type UserResponseType = Omit<User, 'password'>;
