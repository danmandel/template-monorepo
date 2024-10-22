import { getAuth } from 'firebase-admin/auth';
import db from '../../db';
import User from './model';

const userRepository = db.getRepository(User);

export const register = async (idToken: string): Promise<User> => {
  const auth = getAuth();
  const decodedToken = await auth.verifyIdToken(idToken);
  const { uid, email, name } = decodedToken;

  let user = await userRepository.findOne({ where: { firebaseUid: uid } });

  if (!user) {
    user = userRepository.create({ firebaseUid: uid, email, displayName: name });
    await userRepository.save(user);
  }

  return user;
};

export const login = async (idToken: string): Promise<User> => {
  const auth = getAuth();

  const decodedToken = await auth.verifyIdToken(idToken);

  const { uid } = decodedToken;

  const user = await userRepository.findOne({ where: { firebaseUid: uid } });

  if (!user) {
    throw new Error('User not found. Please register.');
  }

  return user;
};
