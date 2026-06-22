import API from "./client";

// Register api call
// Sends user registration data to the backend authentication endpoint
export const register = async (name, email, password) => {
    const response = await API.post("/auth/register", { name, email, password, });
    return response.data;
};


// Login api call
// Sends user login data to the backend authentication endpoint
export const login = async (email, password) => {

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await API.post("/auth/login", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const { access_token, refresh_token } = response.data;

    //store tokens
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    return response.data;
};

