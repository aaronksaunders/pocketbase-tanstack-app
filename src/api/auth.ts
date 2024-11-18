import pb from './client';
import { router } from '../router';

export const login = async (email: string, password: string) => {
    return pb.collection('users').authWithPassword(email, password);
};

export const signup = async (name: string, email: string, password: string, avatar: File) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append("password", password);
        formData.append("avatar", avatar);
        formData.append("name", name);
        formData.append("passwordConfirm", password);


        const newUser = await pb.collection("users").create(formData);
        console.log(newUser);

        // (optional) send an email verification request
        // await pb.collection("users").requestVerification(newUser.email);

        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const logout = async () => {
    pb.authStore.clear();
    // Clear all route caches
    await router.invalidate();
    // Force a router context update
    router.update({
        context: {
            auth: pb.authStore,
            user: null,
        },
    });
};

export const getUser = async () => {
    return pb.authStore.model;
};
