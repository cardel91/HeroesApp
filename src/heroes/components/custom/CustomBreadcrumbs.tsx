import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Link } from "react-router";

interface Props {
    currentPage: string;
    crumbs?: Crumb[];
}

interface Crumb {
    label: string;
    to: string;
}


export const CustomBreadcrumbs = ({ currentPage, crumbs }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                {
                    crumbs?.map(crumb => (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={crumb.to}>{crumb.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    ))
                }
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {currentPage}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
