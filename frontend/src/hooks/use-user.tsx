import { useEffect, useState } from 'react';
import { useGetUserLazyQuery } from '@/generated/graphql';
import { User } from '@/generated/graphql';
import { auth } from '@/lib/firebase';

// TODO: Profile? Account? User?
export const useUser = () => {
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
        const currentUser = auth.currentUser;
        if (currentUser) {
          const idToken = await currentUser.getIdToken();
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
