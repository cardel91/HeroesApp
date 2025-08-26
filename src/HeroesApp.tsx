import { RouterProvider } from "react-router"
import { Button } from "./components/ui/button"
import { router } from "./router/AppRouter"


export const HeroesApp = () => {
    return (
        <>
            <RouterProvider router={router} />
            <h1>Ola k ase</h1>
            <Button>Ola k ase</Button>
        </>
    )
}
