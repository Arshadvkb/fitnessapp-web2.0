export interface User {
    id: string;
    email: string;
    role: 'admin' | 'user' | 'trainer';
    // Add other user properties here
}