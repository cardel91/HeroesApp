import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { };
        unobserve() { };
        disconnect() { };
    }
    window.ResizeObserver = ResizeObserver;
}

const renderControls = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    )
}

describe('SearchControls', () => {

    test('should render SearchControl with default values', () => {

        const { container } = renderControls();
        // screen.debug();
        expect(container).toMatchSnapshot();
    })

    test('should set input value when search name parameter is set', () => {
        renderControls(['/?name=Manbat']);
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe("Manbat")

    })

    test('should set input value when search name parameter is set', () => {
        renderControls(['/?name=Barman']);
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe("Barman")

        fireEvent.change(input, { target: { value: 'Manbat' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(input.getAttribute('value')).toBe("Manbat")

    })

    test('should change parameter strength when slider changes', () => {
        renderControls(['/?name=Barman&active-accordion=advanced-filters&strength=4']);
        const slider = screen.getByRole('slider');

        expect(slider.getAttribute('aria-valuenow')).toBe('4');

        fireEvent.keyDown(slider, { key: 'ArrowRight' });

        expect(slider.getAttribute('aria-valuenow')).toBe('5');
    })

    test('should be open when active-accordion param is set', () => {
        renderControls(['/?name=Barman&active-accordion=advanced-filters&strength=4']);
        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div')

        expect(accordionItem?.getAttribute('data-state')).toBe('open');

    })

    test('should be closed when active-accordion param is not set', () => {
        renderControls(['/?name=Barman&active-accordion=&strength=4']);
        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div')

        expect(accordionItem?.getAttribute('data-state')).toBe('closed');

    })
})