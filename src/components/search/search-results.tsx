import { Package } from '~/types'
import { ResultItem } from './result-item'

interface Props {
	packages: Package[]
}

export function SearchResults({ packages }: Props) {
	return (
		<ul role="list" className="space-y-3 ">
			{packages.length > 0 &&
				packages.map((item, index) => {
					return <ResultItem package={item} key={index} href={'/something'} />
				})}
		</ul>
	)
}
