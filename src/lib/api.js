const BASE_URL= process.env.NEXT_PUBLIC_API_URL

export async function apiRequest(endpoint, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },

        ...options
    })

    const data = await res.json();

    if (!res.ok) {
        
        throw { status: res.status, data};
    }

    return data;
}