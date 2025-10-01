import {
    Filter,
    Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { HeadComponent } from "@/components/custom/HeadComponent"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
// import { useState } from "react"
import { CustomPagination } from "@/heroes/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/heroes/components/custom/CustomBreadcrumbs"
// import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
// import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
// import { getSummaryAction } from "@/heroes/actions/get-summary.action"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"



export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteCount, favorites } = use(FavoriteHeroContext);

    const activeTab = searchParams.get("tab") ?? "all";
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "6";
    const category = searchParams.get('category') ?? "all";

    const selectedTab = useMemo(() => {
        const validTabs = ["all", "favorites", "heroes", "villains"];
        return validTabs.includes(activeTab) ? activeTab : "all";
    }, [activeTab])

    // const [activeTab, setActiveTab] = useState<"all" |
    //     "favorites" |
    //     "heroes" |
    //     "villains">("all");

    // const { data: heroesResponse } = useQuery({
    //     queryKey: ['heroes', { page, limit }],
    //     queryFn: () => getHeroesByPageAction(+page, +limit),
    //     staleTime: 1000 * 60 * 5
    // });

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

    // const { data: summary } = useQuery({
    //     queryKey: ['summary-info'],
    //     queryFn: getSummaryAction,
    //     staleTime: 1000 * 60 * 5
    // });

    const { data: summary } = useHeroSummary();


    return (
        <>
            <>
                {/* Header */}
                <HeadComponent title="Universo de heroes" description="Descubre, explota y descarta super heroes y villanos" />

                <CustomBreadcrumbs currentPage="Home" />
                {/* Stats Dashboard */}
                <HeroStats />



                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "all");
                                prev.set("category", 'all');
                                prev.set("page", "1");
                                return prev;
                            })}
                            value="all">All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "favorites");
                                prev.set("page", "1");
                                return prev;
                            })}
                            value="favorites" className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "heroes");
                                prev.set("category", 'hero');
                                prev.set("page", "1");
                                return prev;
                            })} value="heroes">Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "villains");
                                prev.set("category", 'villain');
                                prev.set("page", "1");
                                return prev;
                            })}
                            value="villains">Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites">
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value="heroes">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="villains">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>



                {/* Character Grid */}
                {/* <HeroGrid /> */}

                {/* Pagination */}
                {
                    selectedTab !== 'favorites' && (
                        <>
                            {/* Results info */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-600">Showing {heroesResponse?.heroes?.length} of {heroesResponse?.total} characters</p>
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <Filter className="h-3 w-3" />
                                        Filtered
                                    </Badge>
                                </div>
                            </div>
                            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />

                        </>

                    )
                }

            </>
        </>
    )
}
