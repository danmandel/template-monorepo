import firebase from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useGetUserLazyQuery } from '@/generated/graphql';
import { User } from '@/generated/graphql';
import { auth } from '@/lib/firebase';

const guestFirebaseUser = {
  handle: 'Guest314159',
  email: 'guest@gmail.com',
  displayName: 'Guest',
  photoURL: '/avatars/guest.jpg',
};

export const useFbUserOrGuest = () => {
  const [user, setUser] = useState<firebase.User | typeof guestFirebaseUser>(guestFirebaseUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ?? guestFirebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return { user };
};

// TODO: Profile? Account? User?
export const useDbUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [getUser] = useGetUserLazyQuery();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      let newUser: User | null = null;
      let error: Error | null = null;

      try {
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          const { data } = await getUser({
            variables: { idToken },
          });
          newUser = data?.user ?? null;
        }
      } catch (err) {
        error = err as Error;
      }

      if (isMounted) {
        setUser(newUser);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [getUser]);

  return { user, loading, error };
};
