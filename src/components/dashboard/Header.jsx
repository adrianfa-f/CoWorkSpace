import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onSearch }) => {
    const { user } = useAuth();
    const username = user?.user_metadata?.username || 'U';

    return (
        <header className="bg-gray-800 p-4 mb-6 flex items-center justify-between border-b border-gray-700">
          {/* Logo */}
            <div className="text-xl font-bold hidden md:block">CollabEdit</div>

            {/* Barra de búsqueda */}
            <input
                type="text"
                placeholder="Buscar documentos..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-96 px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Perfil del usuario */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    {username.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
};

export default Header;