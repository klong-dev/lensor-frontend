const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || ''

export const createEndpoints = (resource: string) => {
     return {
          all: `${API_PREFIX}/${resource}`,
          byId: (id: string | number) => `${API_PREFIX}/${resource}/${id}`
     }
}

export const endpoints = {
     post: createEndpoints('posts')
}