import { useEffect, useState } from 'react'
import { Hero } from './components/Hero'
import { useDebounce } from './hooks/useDebounce'
import { apiService } from './lib/api-service'

function App() {
	const [data, setData] = useState()
	const [searchQuery, setSearchQuery] = useState<string>('')
	const debouncedValue = useDebounce<string>(searchQuery, 300)

	useEffect(() => {
		async function callAPI() {
			if (debouncedValue !== '' && debouncedValue.length >= 3) {
				const response = await apiService.get(
					`/search?q=${debouncedValue}&from=0&size=10`
				)
				if (response.status === 200) {
					setData(response.data)
				}
			}
		}
		callAPI()
	}, [debouncedValue])

	async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		setSearchQuery(value)
	}

	return (
		<div className="min-h-screen max-w-7xl mx-auto bg-gray-100 dark:bg-gray-900">
			<Hero />

			<div className="max-w-lg mx-auto">
				<div className="relative flex items-center shadow-xl">
					<input
						type="text"
						name="search"
						id="search"
						onChange={handleInputChange}
						value={searchQuery}
						placeholder="Search"
						required
						className="shadow-sm focus:ring-indigo-500 py-3 px-3 focus:border-indigo-500 block w-full pr-12  border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<pre>
				<code>{JSON.stringify((data as any)?.results?.length, null, 2)}</code>
			</pre>
		</div>
	)
}

export default App
