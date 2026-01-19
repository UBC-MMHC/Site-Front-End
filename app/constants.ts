export const INSTAGRAM_URL = "https://www.instagram.com/ubcmmhc/";
export const EMAIL = "ubcmmhc@gmail.com";
export const LINK_TREE = "https://linktr.ee/ubcmmhc";
export const MEMBERSHIP_SIGNUP_URL = "https://forms.gle/Nq1NNWKjXafmFCrF7";
export const EXEC_SIGNUP_URL = "https://forms.gle/Ys43WB2vfQc1UP6r7";
export const LINKEDIN_URL = "https://www.linkedin.com/company/ubcmmhc/posts";
export const DISCORD_URL = "https://discord.gg/zzD5Gha4dA";

const backendUrl = process.env.NEXT_PUBLIC_BASE_URL_API || "http://localhost:8080";

// API routes go through Next.js proxy (defined in next.config.ts)
export const API_ROUTES_URL = {
  login_email: "/api/auth/login-user",
  login_google: `${backendUrl}/oauth2/authorization/google`,
  register_email: "/api/auth/register-user",
  forgot_password: "/api/auth/forgot-password",
  reset_password: "/api/auth/reset-password",
  logout: "/api/auth/logout",
  set_token: "/api/auth/set-token",
  verify_session: "/api/auth/verify-session",

  csrf_token: "/api/csrf-token",

  subscribe_email_to_newsletter: "/api/newsletter/add-email",
};
