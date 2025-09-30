import { describe, expect, test, vi } from "vitest";
import { router } from "./AppRouter";
import { Outlet, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";

vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid="home-page"></div>
}));

vi.mock('@/heroes/pages/hero/Hero', () => ({
    HeroPage: () => <div data-testid="hero-page"></div>
}));

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    HeroesLayout: () => <div data-testid="heroes-layout"><Outlet /></div>
}));




describe('AppRouter', () => {
    test('should be configured as expected', () => {
        expect(router.routes).toMatchSnapshot();
    });

    test('should render home page at root path', () => {
        render(<RouterProvider router={router} />);

        screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });
});