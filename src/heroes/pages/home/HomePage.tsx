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
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { useMemo } from "react"



export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get("tab") ?? "all";

    const selectedTab = useMemo(() => {
        const validTabs = ["all", "favorites", "heroes", "villains"];
        return validTabs.includes(activeTab) ? activeTab : "all";
    }, [activeTab])

    // const [activeTab, setActiveTab] = useState<"all" |
    //     "favorites" |
    //     "heroes" |
    //     "villains">("all");

    const { data: heroesResponse } = useQuery({
        queryKey: ['heroes'],
        queryFn: () => getHeroesByPageAction(),
        staleTime: 1000 * 60 * 5
    });




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
                                return prev;
                            })}
                            value="all">All Characters (16)</TabsTrigger>
                        <TabsTrigger
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "favorites");
                                return prev;
                            })}
                            value="favorites" className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "heroes");
                                return prev;
                            })} value="heroes">Heroes (12)</TabsTrigger>
                        <TabsTrigger
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "villains");
                                return prev;
                            })}
                            value="villains">Villains (2)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites">
                        <h1>Favorites</h1>
                    </TabsContent>
                    <TabsContent value="heroes">
                        <h1>Heroes</h1>
                    </TabsContent>
                    <TabsContent value="villains">
                        <h1>Villains</h1>
                    </TabsContent>
                </Tabs>

                {/* Results info */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <p className="text-gray-600">Showing 6 of 16 characters</p>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Filter className="h-3 w-3" />
                            Filtered
                        </Badge>
                    </div>
                </div>

                {/* Character Grid */}
                {/* <HeroGrid /> */}

                {/* Pagination */}
                <CustomPagination totalPages={6} />
            </>
        </>
    )
}
