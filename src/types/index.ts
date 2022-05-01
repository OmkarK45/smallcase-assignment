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

export enum FetchStatus {
	IDLE,
	FETCHING,
	ERROR,
	SUCCESS,
	NOT_FOUND,
}

export type ApiResult = {
	results: Array<{
		package: Package
	}>
}
export type Cache<T> = { [url: string]: T }
