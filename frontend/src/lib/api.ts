export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  // Get the raw JWT token from our API route
  const tokenResponse = await fetch('/api/auth/token');
  
  if (!tokenResponse.ok) {
    throw new Error("Failed to get authentication token");
  }
  
  const { token } = await tokenResponse.json();
  
  if (!token) {
    throw new Error("No authentication token available");
  }

  console.log('Making request to:', url);
  console.log('Request method:', options.method);
  console.log('Request body:', options.body);
  console.log('Raw JWT Token:', token.substring(0, 50) + '...');
  
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

  console.log('Final request options:', finalOptions);

  return fetch(url, {
    ...finalOptions
  });
}