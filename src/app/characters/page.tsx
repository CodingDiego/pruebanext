import Link from 'next/link';
import Image from 'next/image';
import { fetchCharacters } from '../api';
import { Character } from '../lib/types/character';

export default async function Characters() {
    const data = await fetchCharacters();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center justify-center min-h-screen py-2">
            {data.map((character: Character) => (
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
    );
}
