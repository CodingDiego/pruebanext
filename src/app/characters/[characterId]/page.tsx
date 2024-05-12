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
            <div className="flex flex-col items-center overflow-auto h-screen p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-4 text-center">Details in depth</h1>
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-2xl font-semibold">Name: {character.name}</h2>
                    <Image src='/individualSW.jpeg' alt='Generic'
                        height={250}
                        width={250}
                        className="rounded-full"
                    />
                    <h2 className="text-lg">Eye color: {character.eye_color}</h2>
                    <h2 className="text-lg">Birth Year: {character.birth_year}</h2>
                    <h2 className="text-lg">Hair color: {character.hair_color}</h2>
                    <h2 className="text-lg">Character Height: {character.height}</h2>
                    <h2 className="text-lg">Skin Color: {character.skin_color}</h2>
                    <h2 className="text-lg">Mass: {character.mass}</h2>
                </div>
            </div>
        </>
    )
}
