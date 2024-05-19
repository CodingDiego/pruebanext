import Link from 'next/link';
import Image from 'next/image';
import { fetchCharacters } from '../lib/utils/api';
import { Character } from '../lib/types/character';
import { PaginationControls } from '../lib/utils/pagination';

export default async function Characters({ searchParams }: Readonly<{ searchParams: any }>) {
    const data = await fetchCharacters();

    const dataWithId = data.map((character, index) => ({
        ...character,
        id: index + 1
    }));

    const eyeColor = searchParams['eyeColor'];
    const gender = searchParams['gender'];

    let filteredData = dataWithId;
    if (eyeColor) {
        filteredData = filteredData.filter(character => character.eye_color === eyeColor);
    }
    if (gender) {
        filteredData = filteredData.filter(character => character.gender === gender);
    }

    const page = searchParams['page'] ?? '1';
    const perPage = searchParams['perPage'] ?? '10';
    const start = (Number(page) - 1) * Number(perPage);
    const end = start + Number(perPage);

    const entries = filteredData.slice(start, end)

    const eyeColors = new Set(dataWithId.map(character => {
        if (character.eye_color && character.eye_color !== 'n/a' && character.eye_color !== 'unknown') {
            return character.eye_color;
        }
    }));
    
    return (
        <>
            <form className="flex justify-center items-center mb-4">
                <label htmlFor="eyeColor">Eye Color:</label>
                <select id="eyeColor" name="eyeColor" className='text-gray-950'>
                    <option value="">All</option>
                    {Array.from(eyeColors).filter(Boolean).map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" className='text-black'>
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button type="submit">Filter</button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start justify-center min-h-3/4 py-4">
                {entries.map((character: Character, index: number) => (
                    <div key={index} className="m-4 transform transition-transform duration-500 hover:scale-110">
                        <Link href={`/characters/${character.id !== undefined ? character.id : ''}`}>
                            <button>
                                <Image
                                    src='/Chewbacca.jpg'
                                    alt='Character Picture'
                                    width={200}
                                    height={300} />
                                <div className="h-12">
                                    <h1 className="text-md sm:text-md text-center">Name: {character.name}</h1>
                                    <h2 className="text-sm sm:text-lg text-center">Eye color: {character.eye_color}</h2>
                                    {character.gender ? <h3 className="text-sm sm:text-lg text-center">Gender: {character.gender}</h3> : <></>}
                                </div>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-center items-center mt-4 justify-self-center'>
                <PaginationControls
                    hasNextPage={end < filteredData.length}
                    hasPreviousPage={start > 0}
                />
            </div>
        </>
    );
}
