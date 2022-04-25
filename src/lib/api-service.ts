import axios from 'axios'

/**
 * @description - Base Axios instancce configured with base API URL and basic headers
 */
export const apiService = axios.create({
	baseURL: import.meta.env.VITE_API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
})
