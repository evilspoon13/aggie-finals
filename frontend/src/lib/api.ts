export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const tokenResponse = await fetch('/api/auth/token');
  
  if (!tokenResponse.ok) {
    throw new Error("Failed to get authentication token");
  }
  
  const { token } = await tokenResponse.json();
  
  if (!token) {
    throw new Error("No authentication token available");
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };


  return fetch(url, {
    ...finalOptions
  });
}