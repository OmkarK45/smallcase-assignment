import { ReactElement } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi'

export interface Props {
	message?: string
	icon?: ReactElement
}

export const EmptyFallback = ({ icon, message }: Props) => {
	return (
		<div className="flex flex-1 flex-col justify-center items-center space-y-4 my-12">
			{icon ? icon : <HiOutlineSparkles className="h-12 w-12 text-gray-500" />}
			<p className="font-medium text-gray-500">
				{message ? message : 'Something went wrong.'}
			</p>
		</div>
	)
}
