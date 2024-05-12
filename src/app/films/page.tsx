import Link from 'next/link';
import Image from 'next/image';
import { fetchFilms } from '../lib/utils/api';
import { Film } from '../lib/types/film';

export default async function Films() {
    const data = await fetchFilms();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center min-h-screen py-2 overflow-hidden">
            {data.map((film: Film) => (
                <div key={film.episode_id} className="m-4 transform transition-transform duration-500 hover:scale-110 text-center">
                    <h4 className="text-center bg-gray-600 p-2 w-full sm:w-auto mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">Episode {film.episode_id}</h4>
                    <Link href={`/films/${film.episode_id}`}>
                        <button>
                            <Image src='/StarWarsPortrait.jpeg'
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
