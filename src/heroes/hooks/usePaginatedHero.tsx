import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHero = (page: number, limit: number, category: string = "all", staleTime: number = 1000 * 60 * 5) => {
    return useQuery({
        queryKey: ['heroes', { page, limit, category }],
        queryFn: () => getHeroesByPageAction(+page, +limit, category),
        staleTime
    });
}
