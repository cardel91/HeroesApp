import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: number;
}

export const searchHeroesAction = async ({ name, team, category, universe, status, strength }: Options) => {
    if (!name && !team && !category && !universe && !status && !strength) {
        return [];
    }

    const { data: searchResults } = await heroApi.get<Hero[]>("search", {
        params: {
            name,
            team,
            category,
            universe,
            status,
            strength,
        }
    });

    return searchResults.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));
}
