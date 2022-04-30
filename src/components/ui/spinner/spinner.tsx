import LoadingIcon from './loading-icon'
import clsx from 'clsx'
import VisuallyHidden from './visually-hidden'

interface Props {
	className?: string
	label?: string
}

const Spinner = ({ className = 'w-4 h-4', label = 'Loading...' }: Props) => {
	return (
		<div className="flex items-center justify-center h-full" role="status">
			<LoadingIcon className={clsx('animate-spin', className)} />
			<VisuallyHidden>{label}</VisuallyHidden>
		</div>
	)
}

export { Spinner }
