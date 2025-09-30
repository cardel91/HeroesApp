import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import { HeroStatsCard } from "./HeroStatsCard"
// import { useQuery } from "@tanstack/react-query"
// import { getSummaryAction } from "../actions/get-summary.action"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { use } from "react"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"

export const HeroStats = () => {

    const { favoriteCount } = use(FavoriteHeroContext);


    // const { data: summary } = useQuery({ 
    //     queryKey: ['summary-info'],
    //     queryFn: getSummaryAction,
    //     staleTime: 1000 * 60 * 5
    // });

    const { data: summary } = useHeroSummary();

    if (!summary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <HeroStatsCard
                title="Total Characters"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summary?.heroCount} Heroes
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summary?.villainCount} Villains
                    </Badge>
                </div>
            </HeroStatsCard>
            <HeroStatsCard
                title="Favorites"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            >
                <div data-testid="favorite-count" className="text-2xl font-bold text-red-600">{favoriteCount}</div>
                <p data-testid="favorite-percent" className="text-xs text-muted-foreground">{(favoriteCount / 25) * 100}% of total</p>
            </HeroStatsCard>

            <HeroStatsCard
                title="Strongest"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}/10</p>
            </HeroStatsCard>

            <HeroStatsCard
                title="Smartest"
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}/10</p>
            </HeroStatsCard>

        </div>
    )
}
