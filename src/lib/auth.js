import { apiRequest } from "./api";

export function registerStudent(formData) {
    return apiRequest('/register/student/', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
}

export function registerSupervisor(formData) {
    return apiRequest('/register/supervisor/', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
}

export function registerCompany(formData) {
    return apiRequest('/register/company/', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
}

export function login(email, password) {
    return apiRequest('/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export function forgotPassword(email) {
    return apiRequest('/forgot-password/', {
        method: 'POST',
        body: JSON.stringify({email}),
    });
}

export function resetPassword(email, token, newPassword, confirmPassword) {
    return apiRequest('/reset-password/', {
        method: 'POST',
        body: JSON.stringify({ 
            email: email,
            token: token,
            new_password: newPassword, 
            confirm_password: confirmPassword
        }),
    });
}