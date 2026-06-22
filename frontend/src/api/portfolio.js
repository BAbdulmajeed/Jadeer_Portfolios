import API from "./client";

// Get my portfolio api call
// Retrieve current user's portfolio through the backend portfolio endpoint
export const get_my_portfolio = async () => {
    const response = await API.get("/portfolios/me");
    return response.data;
};

// Get portfolio api call
// Retrieve user portfolio by portfolio id
export const get_user_portfolio_by_id = async (id) => {
    const response = await API.get(`/portfolios/${id}`);
    return response.data;
};

// Update portfolio api call
// Update current user's portfolio through the backend portfolio endpoint
export const update_portfolio = async (portfolioData) => {
    const response = await API.put("/portfolios/me", portfolioData);
    return response.data;
};


