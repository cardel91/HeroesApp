import { createContext, useEffect, useState, type PropsWithChildren } from "react"
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    favorites: Hero[];
    favoriteCount: number;

    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;


}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocal = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}


export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(
        getFavoritesFromLocal()
    );

    const toggleFavorite = (hero: Hero) => {
        const heroExists = favorites.find((h) => h.id === hero.id);


        if (heroExists) {
            const newFavorites = favorites.filter((h) => h.id !== hero.id);
            setFavorites(newFavorites);
            return;
        }

        setFavorites([...favorites, hero]);
    }

    const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id)

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])


    return (
        <FavoriteHeroContext
            value={{
                favoriteCount: favorites.length,
                favorites: favorites,
                isFavorite: isFavorite,
                toggleFavorite: toggleFavorite
            }}
        >
            {children}
        </FavoriteHeroContext>
    )
}


