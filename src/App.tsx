import { useEffect, useRef, useState } from 'react'
import { HiOutlineLightningBolt, HiOutlineSearch } from 'react-icons/hi'

import { apiService } from '~/lib/api-service'

import { Hero } from './components/hero'
import { Button } from './components/ui/button'
import { EmptyFallback } from './components/empty'
import { SearchResults } from './components/search/search-results'

import { useDebounce } from '~/hooks/useDebounce'
import { usePagination } from './hooks/usePagination'
import type { ApiResult, Cache, Package } from './types'
import { FetchStatus } from './types'

import { motion } from 'framer-motion'
import { Spinner } from './components/ui/spinner/spinner'

export const PAGE_SIZE = 5

function App() {
	const [data, setData] = useState<Array<Package>>([])
	const [showingCached, setShowingCached] = useState<boolean>(false)

	const [searchQuery, setSearchQuery] = useState<string>('')

	const debouncedValue = useDebounce<string>(searchQuery, 300)

	const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.IDLE)

	const { onNext, page, pageSize } = usePagination()

	const cache = useRef<Cache<Array<Package>>>({})

	useEffect(() => {
		async function callAPI() {
			if (debouncedValue !== '' && debouncedValue.length >= 3) {
				const url = `/search?q=${debouncedValue}&from=${page}&size=${pageSize}`

				setFetchStatus(FetchStatus.FETCHING)

				if (cache.current[url]) {
					setData(cache.current[url])
					setShowingCached(true)
					setFetchStatus(FetchStatus.IDLE)
					return
				}

				const response = await apiService.get<ApiResult>(url)
				setShowingCached(false)

				if (response.status === 200) {
					const packages = response?.data?.results?.map((item) => item.package)

					setFetchStatus(FetchStatus.SUCCESS)

					if (packages.length > 0) {
						cache.current[url] = [...data, ...packages]

						setData((prev) => [...prev, ...packages])

						/**
						 * 	About duplication:
						 * 	The API we use here, sometimes sends the same package multiple times.
						 * 	While this can be solved with lodash.uniqBy, but we did not do that here
						 * 	because of time constraints.
						 * 	eg: https://api.npms.io/v2/search?q=react&from=0&size=5
						 */
					} else {
						setData([])
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

		if (debouncedValue.length === 0) {
			setShowingCached(false)
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
				<motion.div
					// animate the search component
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
					className="relative flex items-center shadow-xl "
				>
					<input
						type="text"
						name="search"
						id="search"
						onChange={handleInputChange}
						value={searchQuery}
						placeholder="Search"
						required
						autoComplete="off"
						className="shadow-sm focus:ring-indigo-500 py-4 px-3 focus:border-indigo-500 block w-full pr-12  border-gray-300 rounded-md "
					/>
					{fetchStatus === FetchStatus.FETCHING && (
						<div className="absolute inset-y-0 right-6">
							<Spinner />
						</div>
					)}
				</motion.div>
			</div>
			<div className="max-w-3xl mx-auto mt-10">
				<div className="flex justify-between items-center mb-10">
					{searchQuery && (
						<p className="italic text-md">
							You searched for{' '}
							<span className="font-bold">"{searchQuery}"</span>
						</p>
					)}
					<div>
						{showingCached && (
							<span className="flex items-center text-gray-500">
								Showing cached results
								<HiOutlineLightningBolt className="ml-2" />
							</span>
						)}
					</div>
				</div>

				{!searchQuery && (
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.4,
							delay: 0.4,
						}}
					>
						<EmptyFallback
							message="Your search results will appear here."
							icon={<HiOutlineSearch className="h-12 w-12 text-gray-500" />}
						/>
					</motion.div>
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
