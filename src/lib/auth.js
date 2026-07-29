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

export async function getStudentProfile() {
 const token = localStorage.getItem("accessToken") || localStorage.getItem("access_token");

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  try {
    return await apiRequest('/student/profile/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
  } catch (err) {
    if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw new Error('FAILED_TO_FETCH');
  }
}
  
export async function getSupervisorProfile() {
 const token = localStorage.getItem("accessToken") || localStorage.getItem("access_token");

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  try {
    return await apiRequest('/supervisor/profile/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
  } catch (err) {
    if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw new Error('FAILED_TO_FETCH');
  }
}
  

export async function getCompanyProfile() {
 const token = localStorage.getItem("accessToken") || localStorage.getItem("access_token");

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  try {
    return await apiRequest('/company/profile/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
  } catch (err) {
    if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw new Error('FAILED_TO_FETCH');
  }
}

export async function internshipCreation(data) {
    const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
    if (!token) throw new Error("NO_TOKEN");

    try {
        return await apiRequest('/internships/', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(data),
        })
    } catch (err) {
        if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw err;
    }
}

export async function myInternship(data) {
    const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
    if (!token) throw new Error("NO_TOKEN");

    try {
        return await apiRequest('/internships/', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (err) {
        if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw err;
    }
}
  

export async function internshipBrowse() {
    const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
    if (!token) throw new Error("NO_TOKEN");

    try {
        return await apiRequest('/internships/browse', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (err) {
        if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw new Error('FAILED_TO_FETCH_INTERNSHIP')
    }
} 

export async function applyInternship(internshipId) {
    const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
    if (!token) throw new Error("NO_TOKEN");

    try {
        return await apiRequest('/application/apply/', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`},
            body: JSON.stringify({internship: internshipId}),
        });
    } catch (err) {
        if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw new err;
    }

}

export async function getMyApplications() {
    const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
    if (!token) throw new Error("NO_TOKEN");

    try {
        return await apiRequest('/application/my/', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`},
        });
    } catch (err) {
        if (err.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('accessToken');

        throw new Error('SESSION_EXPIRED');
    }
    throw err;
    }

}