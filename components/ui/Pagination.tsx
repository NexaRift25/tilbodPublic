'use client'

import React from 'react'
import FadeUpSection from './FadeUpSection'
import { MoveLeft, MoveRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showEllipsis?: boolean
  maxVisiblePages?: number
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showEllipsis = true,
  maxVisiblePages = 5,
}) => {
  // Generate page numbers to display
  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
          pages.push(i)
        }
        if (totalPages > 4) {
          pages.push('...')
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        if (totalPages > 4) {
          pages.push('...')
        }
        for (let i = Math.max(2, totalPages - 3); i <= totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        // Show current page and surrounding pages
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  return (
    <FadeUpSection>
      <div
        className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}
      >
        {/* Previous Arrow */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors text-primary ${
            currentPage === 1
              ? 'cursor-not-allowed opacity-50'
              : 'hover:opacity-80'
          }`}
          aria-label="Previous page"
        >
          <MoveLeft size={32}/>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-2">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm font-medium text-primary"
                >
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-dark hover:opacity-90' 
                    : 'border border-primary text-smoky-white hover:opacity-80'
                }`}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            )
          })}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors text-primary ${
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:opacity-80'
          }`}
          aria-label="Next page"
        >
          <MoveRight size={32}/>
        </button>
      </div>
    </FadeUpSection>
  )
}

export default Pagination
