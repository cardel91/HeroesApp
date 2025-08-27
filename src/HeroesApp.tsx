import { RouterProvider } from "react-router"
import { router } from "./router/AppRouter"


export const HeroesApp = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
