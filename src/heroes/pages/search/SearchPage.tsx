import { HeadComponent } from "@/components/custom/HeadComponent";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/heroes/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";


const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") ?? undefined;
    const { data: heroes = [] } = useQuery({
        queryKey: ["search", { name }],
        queryFn: () => searchHeroesAction({ name }),
        staleTime: 1000 + 60 + 5
    });

    return (
        <>
            <HeadComponent title="Universo de heroes" description="Descubre, explota y descarta super heroes y villanos" />

            <CustomBreadcrumbs
                crumbs={
                    [
                        {
                            label: "Home",
                            to: "/"
                        },
                        {
                            label: "Search",
                            to: "/search"
                        },
                        {
                            label: "Hero",
                            to: "/heroes/1"
                        },
                    ]
                }
                currentPage="Search" />
            <HeroStats />

            <SearchControls />

            <HeroGrid heroes={heroes} />
        </>
    )
}

export default SearchPage;
