import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-star-wars bg-main">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative z-[-1] flex place-items-center">
      </div>

      <div className="flex justify-between items-center w-full lg:w-1/2">
        <Link href="/characters">
          <button className="btn-blue">
            Characters
          </button>
        </Link>

        <Link href="/films">
          <button className="btn-blue">
            Films
          </button>
        </Link>
      </div>
    </main>
  );
}
