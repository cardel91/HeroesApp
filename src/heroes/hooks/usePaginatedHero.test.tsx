import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import type { PropsWithChildren } from "react";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import { usePaginatedHero } from "./usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach } from "node:test";

vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeroesByPageAction: vi.fn()
}));

const mockedGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const tanStackCustomProvider = () => {
    return ({ children }: PropsWithChildren) => <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
};

describe('usePaginatedHero', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });


    test('should return the initial state (isLoading', () => {
        const { result } = renderHook(() => usePaginatedHero(1, 6), { wrapper: tanStackCustomProvider() });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();

    });

    test('should call get getHeroesByPageAction with params', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };
        mockedGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero(1, 6, 'marvel'), { wrapper: tanStackCustomProvider() });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.status).toBe("success");
        // expect(result.current.isError).toBe(false);
        // expect(mockedGetHeroesAction).toHaveBeenCalled();
        expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "marvel");

    });
});