## Smallcase Assignment

Task is to implement a debounced search with pagination support.

Live : https://smallcase-assignment.vercel.app

- API Used https://npms.io/
- Stack used - React 18 with Vite, TypeScript, TailwindCSS.
- Additional packages used - Axios, Framer Motion 6

- Implemented Core debounced search logic, Load more functionality, Caching logic, Animations using Framer Motion, Leveraged Typescript for type-safety

- Note : About duplication: The API we use here, sometimes sends the same package multiple times. While this can be solved with lodash.uniqBy, but we did not do that here because of time constraints. eg: https://api.npms.io/v2/search?q=react&from=0&size=10
