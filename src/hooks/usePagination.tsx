import { useState } from 'react'
import { PAGE_SIZE } from '~/App'

export function usePagination() {
	// from = page
	const [page, setPage] = useState<number>(0)
	// size = pageSize
	const [pageSize, setPageSize] = useState<number>(PAGE_SIZE)

	function onNext() {
		setPage(page + 1)
	}

	function onPrevious() {
		if (page === 1) {
			return
		}
		setPage(page - 1)
	}

	return {
		onNext,
		onPrevious,
		page,
		pageSize,
	}
}
