"use client"
import "../globals.css";
import {useState} from "react";

export default function Login(){
    const [email, setEmail] = useState("");

    const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/api/auth/login-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        // if (res.ok) {
        //     alert("Check your email for a login link!");
        // } else {
        //     alert("Failed to send login link");
        // }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/api/auth/google";
    };

    return (
        <div className="flex h-screen items-center justify-center bg-background text-foreground">
            <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">Sign in</h1>

                {/* Email Login */}
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

                <div className="flex items-center my-8">
                    <div className="flex-grow h-px bg-border" />
                    <span className="mx-3 text-muted-foreground text-sm">or</span>
                    <div className="flex-grow h-px bg-border" />
                </div>

                {/* Google Login */}
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