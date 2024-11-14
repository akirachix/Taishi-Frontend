const url = '/api/login'

export const userLogin = async (loginData: { email: string; password: string; }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Full response from server:', text);

            if (response.status >= 500) {
                throw new Error('Network interrupted. Please try again later.');
            } else if (response.status === 400) {
                throw new Error('An account with this email already exists. Please try logging in.');
            } else {
                throw new Error('This user does not have an account. Sign up.');
            }
        }

        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error during login:', error);

        return { error: (error as Error).message || 'An unexpected error occurred. Please try again.' };
    }
};


