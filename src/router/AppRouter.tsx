import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage.tsx"));

// export const router = createBrowserRouter([
export const router = createHashRouter([
    {
        path: "/",
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "heroes/:idslug",
                element: <HeroPage />
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }

        ]
    },
    {
        path: "/admin/",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    },

])