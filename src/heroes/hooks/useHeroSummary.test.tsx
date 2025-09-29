import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHeroSummary } from "./useHeroSummary";
import type { PropsWithChildren } from "react";
import { getSummaryAction } from "../actions/get-summary.action";
import type { SummaryInfoResponse } from "../types/summary-info.response";

vi.mock('../actions/get-summary.action', () => ({
    getSummaryAction: vi.fn()
}));

const mockedGetSummaryAction = vi.mocked(getSummaryAction);

const tanStackCustomProvider = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })
    return ({ children }: PropsWithChildren) =>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

}

describe("useHeroSummary", () => {
    test('should return the initial state (isLoading', () => {
        const { result } = renderHook(() => useHeroSummary(), { wrapper: tanStackCustomProvider() });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();

    });

    test('should return success state when API call succeeds', async () => {

        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: "Superman"
            },
            smartestHero: {
                id: '2',
                name: "Batman"
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryInfoResponse;

        mockedGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderHook(() => useHeroSummary(), { wrapper: tanStackCustomProvider() });


        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(mockedGetSummaryAction).toHaveBeenCalled();

    });

    test('should return error state when API call fails', async () => {

        const mockError = new Error("Failed to fetch summary");
        mockedGetSummaryAction.mockRejectedValue(mockError);
        const { result } = renderHook(() => useHeroSummary(), { wrapper: tanStackCustomProvider() });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.isError).toBeDefined();
        expect(result.current.isLoading).toBe(false);
        // expect(mockedGetSummaryAction).toHaveBeenCalled();
        expect(mockedGetSummaryAction).toHaveBeenCalled();
        expect(result.current.error?.message).toBe("Failed to fetch summary");



    });
});