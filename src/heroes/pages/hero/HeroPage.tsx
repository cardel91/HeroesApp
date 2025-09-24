import { useParams } from "react-router"


export const HeroPage = () => {

    const { idslug = "" } = useParams();

    console.log({ idslug })
    return (
        <div>HeroPage</div>
    )
}
