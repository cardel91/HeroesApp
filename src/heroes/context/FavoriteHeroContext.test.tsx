import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import { use } from "react";
import type { Hero } from "../types/hero.interface";
import { beforeEach } from "vitest";

const mockHero = {
    id: "3",
    name: 'Chanchoman',
    alias: 'chanchoman',
} as Hero;

const TestComponent = () => {

    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    return (
        <>
            <div data-testid="favorite-count">
                {favoriteCount}
            </div>
            <div >
                <ul data-testid="favorite-list">
                    {
                        favorites.map(f => (
                            <li key={f.id} data-testid={`hero-${f.id}`}>{f.alias}</li>
                        ))
                    }
                </ul>
                <button data-testid="toggle-favorite"
                    onClick={() => toggleFavorite(mockHero)}>
                    Toggle
                </button>
                <div data-testid="isFavorite">{isFavorite(mockHero).toString()}</div>
            </div>
        </>
    );
};

const renderContextTest = () => {
    return render(<FavoriteHeroProvider><TestComponent /></FavoriteHeroProvider>)
};


describe('FavoriteHeroContext', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test('should initialize with default value', () => {
        renderContextTest()

        screen.debug()

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorite when toggled favorite', () => {

        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('isFavorite').textContent).toBe('false');
        expect(localStorage.getItem('favorites')).toBe('[]');
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('isFavorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-3').textContent).toBe('chanchoman');
        expect(localStorage.getItem('favorites')).toBe('[{"id":"3","name":"Chanchoman","alias":"chanchoman"}]');

    });

    test('should remove hero to favorite when toggled favorite', () => {

        localStorage.setItem('favorites', JSON.stringify([mockHero]));

        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('isFavorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-3').textContent).toBe('chanchoman');
        expect(localStorage.getItem('favorites')).toBe('[{"id":"3","name":"Chanchoman","alias":"chanchoman"}]');
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('isFavorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-3')).toBeNull();
        expect(localStorage.getItem('favorites')).toBe('[]');

    });
});