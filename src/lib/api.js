const BASE_URL= process.env.NEXT_PUBLIC_API_URL

let refreshPromise = null;

async function refreshAccessToken () {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('NO_REFRESH_TOKEN');
    }

    const res = await fetch(`${BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) {
      throw new Error('REFRESH_FAILED');
    }

    const data = await res.json();
    localStorage.setItem('access_token', data.access);
    if (data.refresh) {
      localStorage.setItem('refresh_token', data.refresh);
    }
    return data.access;
  })();

  try {
    const token = await refreshPromise;
    return token;
  } finally {
    refreshPromise = null; 
  }
}

export async function apiRequest(endpoint, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },     
    });

    if (res.status === 401) {
        try {
            const newTokenAcess = await refreshAccessToken();

            const headersRetry = { ...options.headers };
            if (headersRetry.Authorization) {
              headersRetry.Authorization = `Bearer ${newTokenAcess}`;
            }

            const resRetry = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...headersRetry
                },
            });

            const dataRetry = await resRetry.json();

            if (!resRetry.ok) {
                throw { status: resRetry.status, data: dataRetry };
            } 
            return dataRetry;
        } catch (refreshErr) {
            // If refresh fails itself force page to login again after clear everything
            localStorage.removeItem('access_token');
            localStorage.removeItem('acessToken');
            localStorage.removeItem('refresh_token');
            throw { status: 401, data: { detail: 'Session has been expired'} }
        }
    }

    const data = await res.json();

    if (!res.ok) {
        
        throw { status: res.status, data};
    }

    return data;
}