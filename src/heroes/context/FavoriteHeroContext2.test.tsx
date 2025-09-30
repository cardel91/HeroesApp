import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
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

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});


describe('FavoriteHeroContext2', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should initialize with default value', () => {
        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorite when toggled favorite', () => {
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('isFavorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-3').textContent).toBe('chanchoman');
        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'favorites',
            '[{"id":"3","name":"Chanchoman","alias":"chanchoman"}]'
        );

    });

    test('should remove hero to favorite when toggled favorite', () => {

        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('isFavorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-3').textContent).toBe('chanchoman');
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('isFavorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-3')).toBeNull();

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'favorites',
            '[]'
        );


    });
});