import { Character } from "./lib/types/character";

const baseUrl: string = process.env.BASE_API ?? '';

export const fetchFilms = async () => {
    try {
        const response = await fetch(`${baseUrl}/films`, {
            method: 'GET',
        });
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error fetching films: ${error}`);
    }
};

export const fetchCharacters = async (): Promise<Character[]> => {
    try {
        const response = await fetch(`${baseUrl}/people`, {
            method: 'GET',
        });
        let data = await response.json();
        data = data.results.map((character: any) => {
            Object.keys(character).forEach(key => {
                if (typeof character[key] === 'string' && (character[key] === 'n/a' || character[key] === null || character[key].toLowerCase() === 'unknown')) {
                    delete character[key];
                }
            });
            return character;
        });
        return data as Character[];
    } catch (error) {
        console.error(`Error fetching characters: ${error}`);
        throw error;
    }
};



