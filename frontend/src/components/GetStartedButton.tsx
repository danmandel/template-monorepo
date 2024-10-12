'use client';

export const GetStartedButton = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <button
        className="w-64 rounded-full bg-yellow-500 px-4 py-2 font-bold text-black"
        onClick={() => (window.location.href = '/get-started')}
      >
        Get Started
      </button>
    </div>
  );
};
