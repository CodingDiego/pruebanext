import { fetchFilms } from "@/app/api";
import Image from "next/image";
import Link from 'next/link';

interface FilmPageParams {
    filmId: string;
}

export default async function FilmPage({ params }: Readonly<{ params: FilmPageParams }>) {
    const films = await fetchFilms()
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Pelicula {params.filmId}</h1>
            <div className="flex flex-col items-center">
                <p className="mb-2"><strong>Titulo:</strong> {films[parseInt(params.filmId) - 1].title}</p>
                <Image src='/genericDetail.jpeg' alt='Generic Image for details of a movie' width={250} height={300} />
                <p className="mb-2"><strong>Episodio Numero:</strong> {films[parseInt(params.filmId) - 1].episode_id}</p>
                <p className="mb-2"><strong>Director:</strong> {films[parseInt(params.filmId) - 1].director}</p>
                <p><strong>Personajes:</strong></p>
                {films[parseInt(params.filmId) - 1].characters.map((character: string, index: number) => (
                    <Link key={index} href={character}>
                        <button className="underline text-blue-500">{character}</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}
