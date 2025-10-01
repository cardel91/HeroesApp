import { fireEvent, render, screen } from "@testing-library/react";
import { CustomPagination } from "./CustomPagination";
import { describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock('@/components/ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>{children}</button>
    )
}));

const renderRouter = (component: React.ReactElement, initialEntries?: string[]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
    )
}
describe('CustomPagination', () => {

    test('should render component with default values', () => {
        renderRouter(<CustomPagination totalPages={5} />);

        screen.debug();

        expect(screen.getByText('Previous')).toBeDefined();
        expect(screen.getByText('Next')).toBeDefined();
        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
    });

    test('should disable previous button when page is 1', () => {

        renderRouter(<CustomPagination totalPages={5} />);

        const prevButton = screen.getByText('Previous');
        expect(prevButton.getAttributeNames()).toContain('disabled');

    });

    test('should disable next button when page is last', () => {

        renderRouter(<CustomPagination totalPages={5} />, ['/?page=5']);

        const nextButton = screen.getByText('Next');
        expect(nextButton.getAttributeNames()).toContain('disabled');

    });

    test('should check button 3 when page is 3', () => {

        renderRouter(<CustomPagination totalPages={5} />, ['/?page=3']);

        const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');
        expect(button2.getAttribute('variant')).toContain('outline');
        expect(button3.getAttribute('variant')).toContain('default');

    });

    test('should change page when click on number button', () => {
        renderRouter(<CustomPagination totalPages={5} />, ['/?page=3']);

        const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');

        fireEvent.click(button2);

        expect(button2.getAttribute('variant')).toContain('default');
        expect(button3.getAttribute('variant')).toContain('outline');


    });

});