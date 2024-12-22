import { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from "lucide-react";
import PasswordStrengthMeter from '../components/PasswordStrngthMeter';
import { z } from 'zod';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const passwordSchema = z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

    const signupSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: passwordSchema,
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
        name: z.string().min(3, "Name must be at least 3 characters"),
        role: z.enum(["user", "admin"]),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password and Confirm Password should be the same",
        path: ["confirmPassword"],
    });

    function createHandler(e) {
        e.preventDefault();

        const validationResult = signupSchema.safeParse({ email, password, confirmPassword, name, role });
        if (!validationResult.success) {
            alert(validationResult.error.errors.map(err => err.message).join(", "));
            return;
        }

        const user = { name, email, password, role };

        fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("An error occurred during signup.");
            });
    }

    return (
        <div className="w-full h-full flex justify-center items-center p-4">
            <form className="bg-[#1e1e1e] flex flex-col p-6 sm:p-8 w-full max-w-md rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-500 mb-6 sm:mb-8 text-center">
                    Sign Up
                </h2>


                <Input icon={Mail} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input icon={Lock} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="p-2 mb-2 bg-blue-500 text-white border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Choose Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <PasswordStrengthMeter password={password} />
                <div className="w-full flex justify-center mt-4 sm:mt-6">
                    <button
                        className="py-2 px-4 sm:py-2 sm:px-6 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-200"
                        onClick={createHandler}
                    >
                        Create Account
                    </button>
                </div>
                <div className="w-full flex justify-center mt-2">
                    <button
                        className="py-2 px-4 sm:py-2 sm:px-6 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </button>
                </div>




            </form>
        </div>
    );
};

export default Signup;