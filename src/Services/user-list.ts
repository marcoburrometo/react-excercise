import { UserToSend } from '../Interfaces/user-list';
import { httppost } from './remote';

export async function createUser(user: UserToSend) {
  return httppost('users', user);
}

export async function updateUser(userId: number, user: UserToSend) {
  return httppost(`users/${userId}`, user, false, true);
}
