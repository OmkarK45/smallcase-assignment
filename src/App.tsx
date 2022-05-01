import { useEffect, useMemo, useState } from 'react'
import { Hero } from './components/hero'
import { useDebounce } from '~/hooks/useDebounce'
import { apiService } from '~/lib/api-service'
import { SearchResults } from './components/search/search-results'
import { usePagination } from './hooks/usePagination'
import { debounce } from 'lodash'
import { FetchStatus } from './types/types'
import { EmptyFallback } from './components/empty'
import { HiOutlineSearch } from 'react-icons/hi'
import { Button } from './components/ui/button'

export const PAGE_SIZE = 5

function App() {
	const [data, setData] = useState([])
	const [searchQuery, setSearchQuery] = useState<string>('')
	const debouncedValue = useDebounce<string>(searchQuery, 300)

	const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.IDLE)

	const { onNext, onPrevious, page, pageSize } = usePagination()

	// Consider using useFetch hook abstraction over this .
	useEffect(() => {
		async function callAPI() {
			if (debouncedValue !== '' && debouncedValue.length >= 3) {
				setFetchStatus(FetchStatus.FETCHING)

				const response = await apiService.get(
					`/search?q=${debouncedValue}&from=${page}&size=${pageSize}`
				)

				if (response.status === 200) {
					// @ts-ignore
					const packages = response?.data?.results?.map((item) => item.package)

					setFetchStatus(FetchStatus.SUCCESS)

					if (packages.length > 0) {
						// @ts-ignore
						setData((prev) => [...prev, ...packages])
						/**
						 * 	About duplication:
						 * 	The API we use here, sometimes sends the same package multiple times.
						 * 	While this can be solved with lodash.uniqBy, but we did not do that here
						 * 	because of time constraints.
						 * 	eg: https://api.npms.io/v2/search?q=react&from=0&size=5
						 */
					} else {
						setFetchStatus(FetchStatus.NOT_FOUND)
					}
				}

				if (response.status === 404) {
					setFetchStatus(FetchStatus.NOT_FOUND)
				}

				if (!response) {
					setFetchStatus(FetchStatus.ERROR)
				}
			}
		}
		callAPI()

		if (searchQuery.length === 0) {
			setData([])
		}
	}, [debouncedValue, page, pageSize])

	async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		setSearchQuery(value)
	}

	return (
		<div className="min-h-screen max-w-7xl mx-auto bg-gray-100 dark:bg-gray-900 px-10 md:px-0">
			<Hero />

			<div className="max-w-3xl mx-auto ">
				<div className="relative flex items-center shadow-xl">
					<input
						type="text"
						name="search"
						id="search"
						onChange={handleInputChange}
						value={searchQuery}
						placeholder="Search"
						required
						autoComplete="off"
						className="shadow-sm focus:ring-indigo-500 py-3 px-3 focus:border-indigo-500 block w-full pr-12  border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div className="max-w-3xl mx-auto mt-10">
				{searchQuery && (
					<p className="italic text-md mb-10">
						You searched for <span className="font-bold">"{searchQuery}"</span>
					</p>
				)}

				{!searchQuery && (
					<EmptyFallback
						message="Your search results will appear here."
						icon={<HiOutlineSearch className="h-12 w-12 text-gray-500" />}
					/>
				)}

				<div className="pb-3">
					<SearchResults packages={data ?? []} />
				</div>
			</div>

			{/* Pagination Container */}
			{data.length > 0 && (
				<div className="flex justify-center py-10">
					<Button
						onClick={onNext}
						loading={fetchStatus === FetchStatus.FETCHING}
						loadingText="Loading..."
						className="mx-auto"
					>
						Load More
					</Button>
				</div>
			)}
		</div>
	)
}

export default App
