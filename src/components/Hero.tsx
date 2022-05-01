import { motion } from 'framer-motion'

export function Hero() {
	return (
		<div>
			<div className="max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8">
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.4,
						delay: 0.4,
					}}
					exit={{ y: -50, opacity: 0 }}
					className="text-center"
				>
					<p className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
						Smallcase Assignment
					</p>
					<h2 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
						Search for packages...
					</h2>
					<p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
						Type atleast 3 characters to start searching.
					</p>
				</motion.div>
			</div>
		</div>
	)
}
