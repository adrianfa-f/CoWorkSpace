import { Link } from 'react-router-dom';

const CheckEmail = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="max-w-md p-8 bg-gray-800 rounded-lg text-center">
                <h1 className="text-2xl font-bold mb-4">¡Revisa tu correo!</h1>
                <p className="mb-6">
                    Hemos enviado un enlace mágico a tu email. Haz clic en él para acceder.
                </p>
                <Link 
                    to="/" 
                    className="text-blue-400 hover:text-blue-300 underline"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default CheckEmail;