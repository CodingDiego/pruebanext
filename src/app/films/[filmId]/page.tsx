import { fetchCharacters, fetchFilms } from "@/app/lib/utils";
import { Character } from "@/app/lib/types/character";
import Image from "next/image";
import Link from 'next/link';

interface FilmPageParams {
    filmId: string;
}

export default async function FilmPage({ params }: Readonly<{ params: FilmPageParams }>) {
    const films = await fetchFilms();
    const characters = await fetchCharacters();
    const film = films[parseInt(params.filmId) - 1];

    // Create an object that maps character IDs to names
    const characterNames: { [id: string]: string } = {};
    characters.forEach((character, index) => {
        let id = index + 1; // Add 1 because API IDs start at 1
        if (id >= 17) id += 1; // Adjust for missing ID at 17
        characterNames[id] = character.name;
    });

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Pelicula {params.filmId}</h1>
            <div className="flex flex-col items-center">
                <p className="mb-2"><strong>Titulo:</strong> {film.title}</p>
                <Image src='/genericDetail.jpeg' alt='Generic Image for details of a movie' width={250} height={300} />
                <p className="mb-2"><strong>Episodio Numero:</strong> {film.episode_id}</p>
                <p className="mb-2"><strong>Director:</strong> {film.director}</p>
                <p><strong>Personajes:</strong></p>
                {film.characters.map((character: string, index: number) => {
                    const id = character.split('/').filter(Boolean).pop();
                    if (id !== undefined) {
                        return (
                            <div key={index} className="flex flex-col items-center text-center my-2">
                                <Image src='/genericSW.jpg' alt="Generic Image" width={100} height={100} />
                                <Link href={`/characters/${id}`}>
                                    <button className="underline text-blue-500">{characterNames[id]}</button>
                                </Link>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
