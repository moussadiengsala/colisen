"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationAnnounce({ total, limit = 5 }: { total: number, limit?: number }) {
    if (total < limit)  return;
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (page: number) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('page', page.toString());
        router.replace(`/annonce?${currentParams.toString()}`);
    };
    
    const paginationRange = (start: number, end: number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pagesToShow = paginationRange(
        currentPage,
        Math.min(currentPage + 2, totalPages)
    );

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                                handlePageChange(currentPage - 1);
                            }
                        }}
                    />
                </PaginationItem>

                {pagesToShow.map((page) => (
                    <PaginationItem
                        key={page}
                        className={page === currentPage ? 'active' : ''}
                    >
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {currentPage + 2 < totalPages && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                                handlePageChange(currentPage + 1);
                            }
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
