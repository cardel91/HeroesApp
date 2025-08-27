import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
    limit?: number;
    totalPages: number;
}
export const CustomPagination = ({ totalPages }: Props) => {

    const page: number = 6;

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" disabled={page === 1}>
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {
                Array.from({ length: totalPages }).map((_a, index) => (
                    <Button key={index}
                        variant={page === index + 1 ? "default" : "outline"} size="sm">
                        {index + 1}
                    </Button>
                ))
            }
            {/* 
            <Button variant="outline" size="sm">
                2
            </Button>
            <Button variant="outline" size="sm">
                3
            </Button>
            <Button variant="ghost" size="sm" disabled>
                <MoreHorizontal className="h-4 w-4" />
            </Button> 
            */}

            <Button disabled={page === totalPages} variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
