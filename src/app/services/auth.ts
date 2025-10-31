import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  currentUser = signal<(User & { id?: string }) | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
  );


  isAdmin = signal<boolean>(false);
  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      this.currentUser.set(user);
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            id: user.uid,
            email: user.email,
            createdAt: new Date(),
            displayName: user.displayName || 'New User',
            photoURL: user.photoURL || null,
            isAdmin: false,
          });
          this.isAdmin.set(false);
        } else {
          const userData = userDocSnap.data();
          this.isAdmin.set(userData['isAdmin'] || false);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    });
  }

  async register(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(userCredential.user, { displayName: displayName });
      const userDeocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(userDeocRef, {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: new Date(),
        displayName,
        photoURL: null,
        isAdmin: false,
      });
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }
  async logout() {
    await signOut(this.auth);
    localStorage.removeItem('user');
    this.isAdmin.set(false);
  }
}
