import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { SummaryInfoResponse } from "../types/summary-info.response";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";


vi.mock('../hooks/useHeroSummary');

const useHeroSummaryMock = vi.mocked(useHeroSummary);

const mockSummaryData = {
    "totalHeroes": 25,
    "strongestHero": {
        "id": "1",
        "name": "Clark Kent",
        "slug": "clark-kent",
        "alias": "Superman",
        "powers": [
            "Súper fuerza",
            "Vuelo",
            "Visión de calor",
            "Visión de rayos X",
            "Invulnerabilidad",
            "Súper velocidad"
        ],
        "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
        "strength": 10,
        "intelligence": 8,
        "speed": 9,
        "durability": 10,
        "team": "Liga de la Justicia",
        "image": "1.jpeg",
        "firstAppearance": "1938",
        "status": "Active",
        "category": "Hero",
        "universe": "DC"
    },
    "smartestHero": {
        "id": "2",
        "name": "Bruce Wayne",
        "slug": "bruce-wayne",
        "alias": "Batman",
        "powers": [
            "Artes marciales",
            "Habilidades de detective",
            "Tecnología avanzada",
            "Sigilo",
            "Genio táctico"
        ],
        "description": "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
        "strength": 6,
        "intelligence": 10,
        "speed": 6,
        "durability": 7,
        "team": "Liga de la Justicia",
        "image": "2.jpeg",
        "firstAppearance": "1939",
        "status": "Active",
        "category": "Hero",
        "universe": "DC"
    },
    "heroCount": 20,
    "villainCount": 7
};

const heroMock = {
    "id": "1",
    "name": "Clark Kent",
    "slug": "clark-kent",
    "alias": "Superman",
    "powers": [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad"
    ],
    "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    "strength": 10,
    "intelligence": 8,
    "speed": 9,
    "durability": 10,
    "team": "Liga de la Justicia",
    "image": "1.jpeg",
    "firstAppearance": "1938",
    "status": "Active",
    "category": "Hero",
    "universe": "DC"
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const renderHeroStats = (mockData?: Partial<SummaryInfoResponse>) => {

    if (mockData) {
        useHeroSummaryMock.mockReturnValue({
            data: mockData
        } as unknown as ReturnType<typeof useHeroSummary>)

    } else
        useHeroSummaryMock.mockReturnValue({
            data: undefined
        } as unknown as ReturnType<typeof useHeroSummary>)

    return render(
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                <HeroStats />
            </FavoriteHeroProvider>
        </QueryClientProvider>
    )
}

describe('HeroStats', () => {
    test('should render component with default values', () => {
        const { container } = renderHeroStats();
        // screen.debug();
        expect(container).toMatchSnapshot();
    });

    test('should render HeroStatus with mocked data', () => {
        const { container } = renderHeroStats(mockSummaryData);
        screen.debug();
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Total Characters')).toBeDefined();
        expect(screen.getByText('Favorites')).toBeDefined();
        expect(screen.getByText('Strongest')).toBeDefined();
        expect(screen.getByText('Smartest')).toBeDefined();
    });

    test('should change the percentage of favorites when a hero is added to favorites', () => {
        localStorage.setItem('favorites',
            JSON.stringify([heroMock])
        );

        renderHeroStats(mockSummaryData);

        // screen.debug();

        const favoritePercentageElement = screen.getByTestId('favorite-percent');
        expect(favoritePercentageElement.innerHTML).toContain('4%');
        const favoriteCountElement = screen.getByTestId('favorite-count');
        expect(favoriteCountElement.innerHTML).toContain('1');


    });
});