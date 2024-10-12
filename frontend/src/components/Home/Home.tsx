import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export const HomePage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Home page</h1>
      <button onClick={() => router.push('/route1')}>Route 1</button>
    </div>
  );
};
