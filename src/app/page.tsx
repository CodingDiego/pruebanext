import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-4 py-8 bg-black text-white min-h-max">
      <h1 className="text-4xl font-bold mb-8">Star Wars Landing Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center w-full lg:w-1/2">
        <Link href="/characters">
          <button className="btn-blue bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded w-full">
            Characters
          </button>
        </Link>
        <Link href="/films">
          <button className="btn-blue bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded w-full">
            Films
          </button>
        </Link>
      </div>
    </main>
  );
}
