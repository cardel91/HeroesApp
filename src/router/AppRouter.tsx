import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage.tsx"));

export const router = createBrowserRouter([
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
                path: "heroes/1",
                element: <HeroPage />
            },

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