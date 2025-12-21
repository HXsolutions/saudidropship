'use client';

import { getSdks } from '@/firebase';

const { firebaseApp, auth, firestore } = getSdks();

export const app = firebaseApp;
export const db = firestore;
// TODO: Add storage initialization if needed
export const storage = null;
