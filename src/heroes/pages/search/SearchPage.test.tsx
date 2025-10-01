import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from "@/heroes/types/hero.interface";

const queryClient = new QueryClient();

const renderSearch = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <SearchPage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}

vi.mock('@/heroes/actions/search-heroes.action');

const searchHeroesActionMock = vi.mocked(searchHeroesAction);

vi.mock('@/components/custom/HeadComponent', () => ({
    HeadComponent: () => <div data-testid="custom-head"></div>
}));


vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid="search-controls"></div>
}))


vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => (<div data-testid="custom-hero-grid">
        {
            heroes.map((hero) => (
                <div key={hero.id}>{hero.name}</div>
            ))
        }
    </div>)
}));

describe('SearchPage', () => {


    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render SearchPage with default values', () => {

        const { container } = renderSearch();

        expect(searchHeroesActionMock).toHaveBeenCalledWith({
            name: undefined,
            strength: 0
        });

        expect(container).toMatchSnapshot();

    });

    test('should call search action with name parameter', () => {

        const { container } = renderSearch(['/search?name=superman']);

        expect(searchHeroesActionMock).toHaveBeenCalledWith({
            name: 'superman',
            strength: 0
        });

        expect(container).toMatchSnapshot();

    });

    test('should call search action with strength parameter', () => {

        const { container } = renderSearch(['/search?strength=5']);

        expect(searchHeroesActionMock).toHaveBeenCalledWith({
            name: undefined,
            strength: 5
        });

        expect(container).toMatchSnapshot();

    });

    test('should call search action with name and strength parameters', () => {

        const { container } = renderSearch(['/search?strength=5&name=Joker']);

        expect(searchHeroesActionMock).toHaveBeenCalledWith({
            name: 'Joker',
            strength: 5
        });

        expect(container).toMatchSnapshot();

    });

    test('should render HeroGrid with search results', async () => {
        const mockedHeroes = [
            { id: '1', name: "Clark Kenton" } as unknown as Hero,
            { id: '2', name: "Bruce Waylon" } as unknown as Hero,
        ];

        searchHeroesActionMock.mockResolvedValue(mockedHeroes);
        renderSearch();

        await waitFor(() => {
            expect(screen.getByText('Clark Kenton')).toBeDefined();
            expect(screen.getByText('Bruce Waylon')).toBeDefined();
        });

        screen.debug(screen.getByTestId('custom-hero-grid'));
    });

});