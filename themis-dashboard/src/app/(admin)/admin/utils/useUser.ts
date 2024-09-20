export async function fetchUserData() {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  }
  export async function updateUserProfile(data:String) {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    return response.json();
  }