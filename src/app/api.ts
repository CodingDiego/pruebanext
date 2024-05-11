import { Character } from "./lib/types/character";
import { Film } from "./lib/types/film";

const baseUrl: string = process.env.BASE_API ?? '';

export const fetchFilms = async () => {
    try {
        const response = await fetch(`${baseUrl}/films`, {
            method: 'GET',
        });
        const data = await response.json();
        data.results.sort((a: { episode_id: number; }, b: { episode_id: number; }) => a.episode_id - b.episode_id);
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
        return data satisfies Character[];
    } catch (error) {
        console.error(`Error fetching characters: ${error}`);
        throw error;
    }
};



/*Página de detalle del film:
El film debe mostrar la siguiente información:
Nombre
Imagen genérica
Número de episodio
Director
Personajes: (deben tener nombre, imagen genérica y url que lleve al detalle de cada personaje)
*/