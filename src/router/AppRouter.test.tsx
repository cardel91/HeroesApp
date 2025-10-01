import { describe, expect, test, vi } from "vitest";
import { router } from "./AppRouter";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";
import { render, screen } from "@testing-library/react";

vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid="home-page"></div>
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {

        const { idslug = '' } = useParams();
        return <div data-testid="hero-page">HeroPage-{idslug}</div>

    }
}));

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    HeroesLayout: () => <div data-testid="heroes-layout"><Outlet /></div>
}));


vi.mock('@/heroes/pages/search/SearchPage', () => ({
    // para que funcione el lazy
    default: () => <div data-testid="search"></div>
}));




describe('AppRouter', () => {
    test('should be configured as expected', () => {
        expect(router.routes).toMatchSnapshot();
    });

    test('should render home page at root path', () => {

        const memoryRouter = createMemoryRouter(router.routes, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={memoryRouter} />);

        // screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render hero page at /heroes/:idslug path', () => {

        const memoryRouter = createMemoryRouter(router.routes, {
            initialEntries: ['/heroes/superman']
        });

        render(<RouterProvider router={memoryRouter} />);

        // screen.debug();
        expect(screen.getByTestId('hero-page')).toBeDefined();
        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');
    });

    test('should render search page at /search path', async () => {
        const memoryRouter = createMemoryRouter(router.routes, {
            initialEntries: ['/search']
        });

        render(<RouterProvider router={memoryRouter} />);

        expect(await screen.findByTestId('search')).toBeDefined();
        // expect(await screen.findByText('Universo de heroes')).toBeDefined();
        // screen.debug();

    });

    test('should redirect to home page for unknown routes', () => {
        const memoryRouter = createMemoryRouter(router.routes, {
            initialEntries: ['/algo']
        });

        render(<RouterProvider router={memoryRouter} />);
        expect(screen.getByTestId('home-page')).toBeDefined();

    });
});