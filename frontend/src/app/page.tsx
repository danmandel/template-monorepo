import { project } from '@/project';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='flex flex-col items-center gap-8'>
        <div className='flex items-center justify-center'>
          <h1 className='text-6xl text-white'>{project.title}</h1>
        </div>

        <div className='flex items-center justify-center'>
          <h1 className='text-3xl text-white'>{project.description}</h1>
        </div>

        {/* <GetStartedButton /> */}
      </main>
      <footer className='flex flex-wrap items-center justify-center gap-6'></footer>
    </div>
  );
}
