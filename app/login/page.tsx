"use client"
import "../globals.css";
import {useState} from "react";
import { useRouter } from "next/navigation";
import {API_ROUTES_URL} from "@/app/constants";

export default function Login(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [sent, setSent] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        setError(false);
        setSent(false);

        try {
            const res = await fetch(API_ROUTES_URL.login_email, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });

            const text = await res.text();

            if (res.ok) {
                setMessage(text);
                setError(false);
                setSent(true);
            } else {
                setMessage(text);
                setError(true);
            }
        }catch(err){
            setMessage("Server error");
            setError(true);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = API_ROUTES_URL.login_google;
    };

    if (sent) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg text-center">
                    <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
                    <p>We sent a login link to <strong>{email}</strong>. you can close this tab.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen items-center justify-center text-foreground">
            <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font text-center mb-8">Login</h1>

                {/* Email */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition"
                    >
                        Continue with Email
                    </button>
                </form>


                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-grow h-px bg-border" />
                    <span className="mx-3 text-muted-foreground text-sm">or</span>
                    <div className="flex-grow h-px bg-border" />
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full py-3 border border-border rounded-md hover:bg-accent transition"
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        className="w-6 h-6 mr-3"
                    />
                    <span className="text-foreground font-medium">
            Continue with Google
          </span>
                </button>
            </div>
        </div>
    );
}