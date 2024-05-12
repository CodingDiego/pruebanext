import { Character } from "./lib/types/character";

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
        let characters: Character[] = [];
        let page = 1;
        while (true) {
            const response = await fetch(`${baseUrl}/people?page=${page}`, {
                method: 'GET',
            });
            const data = await response.json();
            const cleanedData = data.results.map((character: any) => {
                Object.keys(character).forEach(key => {
                    if (typeof character[key] === 'string' && (character[key] === 'n/a' || character[key] === null || character[key].toLowerCase() === 'unknown')) {
                        delete character[key];
                    }
                });
                return character;
            });
            characters = [...characters, ...cleanedData];
            if (data.next === null) {
                break;
            } else {
                page++;
            }
        }
        return characters;
    } catch (error) {
        console.error(`Error fetching characters: ${error}`);
        throw error;
    }
};

export const characterDetails = async (id: number): Promise<Character> => {
    const response = await fetch(`${baseUrl}/people/${id}`, {
        method: 'GET'
    })
    const data = await response.json()
    return data
}



/*Página de detalle del film:
El film debe mostrar la siguiente información:
Nombre
Imagen genérica
Número de episodio
Director
Personajes: (deben tener nombre, imagen genérica y url que lleve al detalle de cada personaje)
*/