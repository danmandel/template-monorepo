import { auth } from 'firebase-admin'; // Initialize Firebase Admin SDK

import db from '../../algorithms/initializeDb';
import User from './model';

const userRepository = db.getRepository(User);

export const register = async (idToken: string) => {
  const decodedToken = await auth().verifyIdToken(idToken);
  const { uid, email, name } = decodedToken;

  let user = await userRepository.findOne({ where: { firebaseUid: uid } });
  if (!user) {
    user = userRepository.create({ firebaseUid: uid, email, displayName: name });
    await userRepository.save(user);
  }
  return user;
};

export const login = async (idToken: string) => {
  try {
    // Verify the Firebase ID token
    const decodedToken = await auth().verifyIdToken(idToken);
    const { uid } = decodedToken;

    // Look up the user in Postgres
    const user = await userRepository.findOne({ where: { firebaseUid: uid } });
    if (!user) {
      throw new Error('User not found. Please register.');
    }

    // Return the user data to the client (don't return sensitive data)
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    // Handle any errors (e.g., invalid token or user not found)
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
