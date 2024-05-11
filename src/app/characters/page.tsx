import Link from 'next/link';
import Image from 'next/image';
import { fetchCharacters } from '../api';
import { Character } from '../lib/types/character';
import { PaginationControls } from '../lib/utils/pagination';
import { URLSearchParams } from 'url';

export default async function Characters({ searchParams }) {
    const data = await fetchCharacters();

    const page = searchParams['page'] ?? '1';
    const perPage = searchParams['perPage'] ?? '10';
    const start = (Number(page) - 1) * Number(perPage);
    const end = start + Number(perPage);

    const entries = data.slice(start, end)

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center justify-center min-h-screen py-2">
                {entries.map((character: Character) => (
                    <div key={character.name} className="m-4 transform transition-transform duration-500 hover:scale-110">
                        <Link href={`/characters/${character.name}`}>
                            <button>
                                <Image
                                    src='/Chewbacca.jpg'
                                    alt='Character Picture'
                                    width={200}
                                    height={300} />
                                <div className="h-12">
                                    <h1 className="text-xl">{character.name}</h1>
                                </div>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-center items-center mt-4 justify-self-center'>
                <PaginationControls
                    hasNextPage={end < data.length}
                    hasPreviousPage={start > 0}
                />
            </div>
        </>
    );
}
