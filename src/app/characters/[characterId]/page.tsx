import { characterDetails } from "@/app/api";
import Image from "next/image";
import Link from 'next/link';

interface CharacterDetailsPageParams {
    characterId: string;
}

export default async function CharacterDetailsPage({ params }: Readonly<{ params: CharacterDetailsPageParams }>): Promise<JSX.Element> {

    const character = await characterDetails(Number(params.characterId))
    return (
        <>
            <h1>Details of the Character {params.characterId}</h1>
            <div className="flex flex-col items-center">
                <h2>Name:{character.name}</h2>
                <Image src='/individualSW.jpeg' alt='Generic'
                    height={250}
                    width={250}
                />
                <h2>Eye color: {character.eye_color}</h2>
                <h2>Birth Year: {character.birth_year}</h2>
                <h2>Hair color: {character.hair_color}</h2>
                <h2>Character Height: {character.height}</h2>
                <h2>Skin Color: {character.skin_color}</h2>
                <h2>Mass: {character.mass}</h2>

            </div>
        </>
    )
}
