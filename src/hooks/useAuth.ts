import { Amplify } from 'aws-amplify';
import { signUp as amplifySignUp, signIn as amplifySignIn, getCurrentUser } from 'aws-amplify/auth';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

// Регистрация пользователя
const signUp = async (username: string, password: string, email: string) => {
    try {
        const output = await amplifySignUp({
            username,
            password,
            options: {
                userAttributes: {
                    email
                }
            }
        });
        return output;
    } catch (error) {
        console.error('Error signing up:', error);
    }
};

// Авторизация
const signIn = async (username: string, password: string) => {
    try {
        const output = await amplifySignIn({ username, password });
        return output;
    } catch (error) {
        console.error('Error signing in:', error);
    }
};


// Получение текущего пользователя
const getCurrentAuthUser = async () => {
    try {
        const output = await getCurrentUser();
        return output;
    } catch (error) {
        console.error('Error getting current user:', error);
    }
};

export { signUp, signIn, getCurrentAuthUser };