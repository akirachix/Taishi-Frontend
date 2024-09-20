interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

const url = 'api/signup';

export const userSignup = async (userData: UserData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: userData.firstname,
                last_name: userData.lastname,
                email: userData.email,
                password: userData.password,
                role: userData.role,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Full response from server:', text);

            if (response.status >= 500) {
                throw new Error('We are experiencing technical difficulties. Please try again later.');
            } else if (response.status === 400) {
                throw new Error('An account with this email already exists. Please try logging in.');
            } else {
                throw new Error('Something went wrong. Please try again.');
            }
        }

        
        const data = await response.json();
        return data;

    } catch (error) {
        
        console.error('Error during signup:', error);

      
        throw new Error((error as Error).message || 'An unexpected error occurred. Please try again.');
    }
};
