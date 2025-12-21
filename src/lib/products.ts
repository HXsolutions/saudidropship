
import type { Product } from '@/types';
import { collection, doc, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { getSdks } from '@/firebase'; // For client-side operations

// ---- Client-side product management functions for the admin panel ----

const getClientFirestore = () => {
    return getSdks().firestore;
}

export const addProduct = async (productData: Omit<Product, 'id'>) => {
    const firestore = getClientFirestore();
    const productsCollection = collection(firestore, 'products');
    const docRef = await addDoc(productsCollection, productData);
    // Now, update the document to include its own ID
    await setDoc(docRef, { id: docRef.id }, { merge: true });
    return docRef;
};

export const updateProduct = async (productId: string, productData: Partial<Product>) => {
    const firestore = getClientFirestore();
    const productRef = doc(firestore, 'products', productId);
    return await updateDoc(productRef, productData);
};

export const deleteProduct = async (productId: string) => {
    const firestore = getClientFirestore();
    const productRef = doc(firestore, 'products', productId);
    return await deleteDoc(productRef);
};
