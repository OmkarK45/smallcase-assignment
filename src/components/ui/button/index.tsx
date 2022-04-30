import clsx from 'clsx'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
	leftIcon?: React.ReactElement
	rightIcon?: React.ReactElement
	children: React.ReactNode
	type?: 'button' | 'submit' | 'reset'
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg' | 'xl'
	fullWidth?: boolean
	rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
	disabled?: boolean
	loadingText?: string
}

const BUTTON_VARIANTS = {
	primary:
		'text-white border-brand-700 bg-brand-600 hover:bg-brand-700 hover:border-brand-800 focus:ring focus:ring-brand-500 focus:ring-opacity-50 active:bg-brand-700 active:border-brand-700',
	secondary:
		'border-brand-200 bg-brand-50 text-brand-700 hover:text-brand-700 hover:bg-brand-200 hover:border-brand-300 focus:ring focus:ring-brand-500 focus:ring-opacity-50 active:bg-brand-200 active:border-brand-200',
	outline:
		'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
	ghost:
		'dark:text-gray-100 underline focus:outline-none hover:text-opacity-80 focus:ring-2 focus:ring-gray-500',
}

const BUTTON_SIZES = {
	sm: 'px-2 py-2 leading-5 text-sm',
	md: ' px-3 py-2 leading-5 text-sm',
	lg: 'px-4 py-2 text-base',
	xl: 'px-6 py-3 text-base',
}

const SPINNER_SIZES = {
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
	xl: 'w-8 h-8',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function (
		{
			children,
			variant = 'primary',
			loading = 'false',
			size = 'md',
			fullWidth,
			className,
			rounded = 'md',
			disabled,
			leftIcon,
			rightIcon,
			...props
		},
		ref
	) {
		const sizeStyles = BUTTON_SIZES[size] || BUTTON_SIZES.sm
		const variantStyles = BUTTON_VARIANTS[variant] || 'solid'
		const spinnerStyles = SPINNER_SIZES[size] || SPINNER_SIZES.sm
		return (
			<button
				className={clsx(
					'inline-flex justify-center items-center font-medium shadow-sm focus:outline-none relative',
					rounded !== 'full' ? sizeStyles : '',
					variantStyles,
					rounded === 'full' ? 'rounded-full px-4 py-3' : `rounded-${rounded}`,
					!rounded && 'rounded-md',
					fullWidth && 'w-full',
					disabled && 'cursor-not-allowed',
					className
				)}
				{...props}
			>
				{leftIcon && !loading ? leftIcon : null}
				{loading && (
					<CgSpinner
						className={clsx(
							props.loadingText ? 'relative' : 'absolute',
							props.loadingText ? `mr-2` : 'mr-0',
							'animate-spin',
							spinnerStyles
						)}
					/>
				)}
				{loading
					? props.loadingText || <span className="opacity-0">{children}</span>
					: children}

				{rightIcon && !loading ? rightIcon : null}
			</button>
		)
	}
)
