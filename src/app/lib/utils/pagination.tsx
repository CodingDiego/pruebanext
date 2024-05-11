'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface PaginationControlsProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export const PaginationControls: FC<PaginationControlsProps> = ({
    hasNextPage,
    hasPreviousPage,
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? '1';
    const perPage = searchParams.get('perPage') ?? '10'
    const handlePageChange = (newPage: number) => {
        router.push(`/characters/?page=${newPage}&perPage=${perPage}`)
        window.scrollTo({ top: 0, behavior: 'smooth' }) // Add this line
    }
    return (
        <div className="flex gap-2 justify-center items-center">
            <button
                disabled={!hasPreviousPage}
                onClick={() => handlePageChange(Number(page) - 1)}
                className="bg-yellow-500 text-black p-1">
                prev page
            </button>
            <div>
                {page} /  {Math.ceil(82 / Number(perPage))}
            </div>
            <button
                disabled={!hasNextPage}
                onClick={() => handlePageChange(Number(page) + 1)}
                className="bg-yellow-500 text-black p-1">
                next page
            </button>
        </div>
    )
}