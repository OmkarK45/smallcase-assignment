export interface Package {
	name: string
	date: string
	links: {
		npm: string
		homepage: string
		repository: string
	}
	description: string
	version: string
}
