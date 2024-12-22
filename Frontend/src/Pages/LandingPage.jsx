import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full flex justify-center items-center p-4">
            <div className="h-full w-full sm:h-5/6 sm:w-2/3 bg-gray-900 rounded-lg shadow-2xl p-8 sm:p-16 gap-6 sm:gap-10 flex flex-col justify-center items-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center">
                    Task Management System
                </h1>
                <div className="flex flex-col gap-4 w-full sm:w-2/6">
                    <button
                        className="bg-purple-600 text-white py-2 px-4 rounded-md font-semibold text-lg shadow-md hover:bg-purple-500 hover:shadow-lg transition-all"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold text-lg shadow-md hover:bg-indigo-500 hover:shadow-lg transition-all"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div >
    )
}

export default LandingPage