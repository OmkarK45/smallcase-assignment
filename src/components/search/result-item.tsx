import { Package } from '~/types'

interface ResultItemProps {
	href: string
	package: Package
}

export function ResultItem(props: ResultItemProps) {
	return (
		<li
			id={props.package.name}
			className="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
		>
			<div className="flex space-x-2 items-center">
				<h4 className="text-lg font-bold">{props.package.name}</h4>
				<p className="text-gray-500 text-xs">v{props.package.version}</p>
				<a
					className="font-medium dark:text-brand-100 underline focus:outline-none hover:text-opacity-80 focus:ring-2 focus:ring-brand-500"
					href={`https://npmjs.com/package/${props.package.name}`}
					target="_blank"
				>
					npm
				</a>
			</div>
			<p className="mt-1 text-gray-600">{props.package.description}</p>
		</li>
	)
}
