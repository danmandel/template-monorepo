import admin, { type ServiceAccount } from 'firebase-admin';

export const initializeApp = async () => {
  const serviceAccount = await import('../serviceAccountKey.dev.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default as ServiceAccount),
  });
};
