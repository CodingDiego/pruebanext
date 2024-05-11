import Link from 'next/link';
import Image from 'next/image';
import { fetchFilms } from '../api';
import { Film } from '../lib/types/film';

export default async function Films() {
    const data = await fetchFilms();

    return (
        <div className="flex flex-row overflow-x-scroll items-center justify-center min-h-screen py-2">
            {data.map((film: Film) => (
                <div key={film.episode_id} className="m-4 transform transition-transform duration-500 hover:scale-110">
                    <h4 className="text-center bg-gray-600 p-2">Episode {film.episode_id}</h4>
                    <Link href={`/films/${film.episode_id}`}>
                        <button>
                            <Image src='/genericSW.jpg'
                                alt='Movie Picture'
                                width={250}
                                height={200} />
                            <div className="h-12">
                                <h1 className="text-xl">{film.title}</h1>
                            </div>
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
