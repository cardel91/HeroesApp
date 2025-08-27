import {
    Filter,
    Heart,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { HeadComponent } from "@/components/custom/HeadComponent"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"




export const HomePage = () => {

    const [activeTab, setActiveTab] = useState<"all" |
        "favorites" |
        "heroes" |
        "villains">("all");

    return (
        <>
            <>
                {/* Header */}
                <HeadComponent title="Universo de heroes" description="Descubre, explota y descarta super heroes y villanos" />

                {/* Stats Dashboard */}
                <HeroStats />



                {/* Tabs */}
                <Tabs value={activeTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger onClick={() => setActiveTab('all')} value="all">All Characters (16)</TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab('favorites')} value="favorites" className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab('heroes')} value="heroes">Heroes (12)</TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab('villains')} value="villains">Villains (2)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <h1>All characters</h1>
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
                <HeroGrid />

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    <Button variant="default" size="sm">
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        2
                    </Button>
                    <Button variant="outline" size="sm">
                        3
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </>
        </>
    )
}
