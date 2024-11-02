import { getAuth } from 'firebase-admin/auth';
import db from '../../db';
import User, { USER_HANDLE_MAX_LENGTH } from './model';

const userRepository = db.getRepository(User);

const isValidHandle = (handle: string): boolean => {
  // Regular expression to match only letters, numbers, underscores, and hyphens

  const validUsernameRegex = new RegExp(`^[a-zA-Z0-9_-]{1,${USER_HANDLE_MAX_LENGTH}}$`);

  return validUsernameRegex.test(handle);
};

const generateHandle = (displayName: string): string => {
  const strippedName = displayName.replace(/\s+/g, '');
  const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
  return `${strippedName}${randomNumbers}`.toLowerCase();
};

export const register = async (idToken: string): Promise<User> => {
  const auth = getAuth();
  const decodedToken = await auth.verifyIdToken(idToken);
  const { uid, email, name, picture } = decodedToken;

  let user = await userRepository.findOne({ where: { firebaseUid: uid } });

  const tmpHandle = generateHandle(name); //TODO: check if handle is already taken

  // Should it be validateHandle() instead that throws the error?
  if (!isValidHandle(tmpHandle))
    throw new Error(`Registration failed. Invalid handle: ${tmpHandle}`);

  if (!user) {
    user = userRepository.create({
      firebaseUid: uid,
      email,
      displayName: name,
      photoURL: picture,
      handle: tmpHandle,
    });
    await userRepository.save(user);
    // TODO: Create Registration Auth event. Or is this not necessary, because it's dateCreated for user.
  }

  return user;
};

// export const attemptLogin = async (idToken: string): Promise<User> => {
//   const auth = getAuth();
//   const decodedToken = await auth.verifyIdToken(idToken);
//   const { uid } = decodedToken;

//   let user = await userRepository.findOne({ where: { firebaseUid: uid } });

//   const authEventRepository = db.getRepository(AuthEvent);

//   if (!user) {
//     user = userRepository.create({
//       firebaseUid: uid,
//       email: decodedToken.email,
//       displayName: decodedToken.name,
//     });
//     await userRepository.save(user);
//   }

//   // const ip = req.socket.remoteAddress;
//   const authEvent = authEventRepository.create({
//     user,
//     action: 'login',
//     timestamp: new Date(),
//     ip: '127.0.0.1',
//     eventType: AuthEventType.LOGIN_ATTEMPT,
//     failedLoginAttempts: user.failedLoginAttempts || 0,
//   });

//   await authEventRepository.save(authEvent);

//   return user;
// };

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

export const getUserFromIdToken = async (idToken: string): Promise<User> => {
  const auth = getAuth();

  const decodedToken = await auth.verifyIdToken(idToken);

  const { uid } = decodedToken;

  const user = await userRepository.findOne({ where: { firebaseUid: uid } });

  if (!user) throw new Error('User not found. Please register.');

  return user;
};
