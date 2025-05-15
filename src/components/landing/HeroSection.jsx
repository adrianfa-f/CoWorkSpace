import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="py-20 text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-bold mb-6">
                    Colabora en tiempo real como un <span className="text-blue-400">pro</span>
                </h1>
                <p className="text-gray-300 text-xl mb-8">
                    Edita documentos con tu equipo, sin límites de distancia.
                </p>
                <Link 
                    to="/signup" 
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Comenzar gratis
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;