import { HeadComponent } from "@/components/custom/HeadComponent";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";


const SearchPage = () => {
    return (
        <>
            <HeadComponent title="Universo de heroes" description="Descubre, explota y descarta super heroes y villanos" />
            <HeroStats />

            <SearchControls />
        </>
    )
}

export default SearchPage;
