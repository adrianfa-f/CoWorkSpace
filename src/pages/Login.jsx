import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithMagicLink } from '../services/auth';
import Header from '../components/landing/Header';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (email, event) => {
        event.preventDefault();
        try {
            await loginWithMagicLink(email);
            navigate('/check-email');
        } catch (error) {
            console.log("Hubo problemas en el inicio: ", error)
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Header/>
            <div className="flex justify-center mt-40 items-center">
                <form onSubmit={(e) => handleSubmit(email, e)} className="max-w-md p-6 bg-gray-800 rounded-lg">
                    <div className="flex justify-center">
                        <h2 className="text-2xl text-gray-200 mb-6"><strong>Inicio de sesión</strong></h2>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mb-4 text-gray-200 bg-gray-700 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
                    >
                        <strong>Comenzar</strong>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;