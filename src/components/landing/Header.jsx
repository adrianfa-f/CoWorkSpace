import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="border-b border-gray-700">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">CoWorkSpace</Link>
                    <div className="space-x-4">
                        <Link to="/login" className="hover:text-blue-400">Login</Link>
                        <Link to="/signup" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;