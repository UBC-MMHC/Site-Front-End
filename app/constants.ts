export const INSTAGRAM_URL = "https://www.instagram.com/ubcmmhc/";
export const EMAIL = "ubcmmhc@gmail.com";
export const LINK_TREE = "https://linktr.ee/ubcmmhc";
export const MEMBERSHIP_SIGNUP_URL = "https://forms.gle/Nq1NNWKjXafmFCrF7";
export const EXEC_SIGNUP_URL = "https://forms.gle/Ys43WB2vfQc1UP6r7";

export const BASE_URL_API = "http://localhost:8080";
export const API_ROUTES_URL = {
  login_email: `${BASE_URL_API}/api/auth/login-user`,
  login_google: `${BASE_URL_API}/api/auth/google`,
  register_email: `${BASE_URL_API}/api/auth/register-user`,
  forgot_password: `${BASE_URL_API}/api/auth/forgot-password`,
  reset_password: `${BASE_URL_API}/api/auth/reset-password`,
  logout: `${BASE_URL_API}/api/auth/logout`,
  // verify: `${BASE_URL_API}/api/auth/verify-token`,

  csrf_token: `${BASE_URL_API}/api/csrf-token`,

  subscribe_email_to_newsletter: `${BASE_URL_API}/api/newsletter/add-email`,
};
