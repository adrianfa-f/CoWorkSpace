import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithMagicLink } from '../services/auth';
import Header from '../components/landing/Header';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("username: ", username)
        const { error } = await signInWithMagicLink(email, username);
        if (!error) {
            navigate('/check-email')
        } else {
            console.log("Error al enviar el magicLink: ", error)
        };
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Header/>
            <div className="flex justify-center mt-40 items-center">
                <form onSubmit={handleSubmit} className="max-w-md p-6 bg-gray-800 rounded-lg">
                    <div className="flex justify-center">
                        <h2 className="text-2xl text-gray-200 mb-6"><strong>Registro</strong></h2>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mb-4 text-gray-200 bg-gray-700 rounded"
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nombre de usuario"
                        className="w-full p-2 mb-4 text-gray-200 bg-gray-700 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
                    >
                        <strong>Crear cuenta</strong>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;