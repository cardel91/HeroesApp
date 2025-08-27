import { HeadComponent } from "@/components/custom/HeadComponent";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/heroes/components/custom/CustomBreadCrumbs";


const SearchPage = () => {
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
        </>
    )
}

export default SearchPage;
