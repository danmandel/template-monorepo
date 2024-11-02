import admin, { credential, type ServiceAccount } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../serviceAccountKey.dev.json';

export const initializeApp = async () => {
  const serviceAccount = await import('../serviceAccountKey.dev.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default as ServiceAccount),
  });
};

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth();
