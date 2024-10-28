import { useRouter } from 'next/router';

export const Home = () => {
  const router = useRouter();

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1>Home page</h1>
      <button onClick={() => router.push('/route1')}>Route 1</button>
    </div>
  );
};
