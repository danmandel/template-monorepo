import admin from 'firebase-admin';
import { getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getApps } from 'firebase-admin/app';
import serviceAccount from '../serviceAccountKey.dev.json';

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const app = getApp();

export const auth = getAuth();
