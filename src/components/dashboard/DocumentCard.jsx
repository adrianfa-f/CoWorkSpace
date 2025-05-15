// components/DocumentCard.jsx
import { Link } from 'react-router-dom';

const DocumentCard = ({ doc, onDelete }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="font-semibold mb-2 text-gray-100 truncate">{doc.title}</h3>
            <p className="text-sm text-gray-400 mb-4">
                Creado: {new Date(doc.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>
            <div className="flex gap-2">
                <Link
                    to={`/document/${doc.id}`}
                    className="text-blue-400 hover:text-blue-300"
                >
                    Abrir
                </Link>
                <button
                    onClick={onDelete}
                    className="text-red-400 hover:text-red-300"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default DocumentCard