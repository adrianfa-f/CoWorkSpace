// components/ShareDocumentModal.jsx
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const ShareDocumentModal = ({ documentId, onClose }) => {
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('view');
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        setLoading(true);
        
        // Buscar usuario por email
        const { data: user, error } = await supabase
        .rpc('get_user_by_email', { email_param: email }) // 🔹 Usa una función RPC para obtener el usuario
        .single();

        if (error) {
            console.error("error al obtener usuario por email: ", error.message);
        }

        if (!user) {
        setLoading(false);
        alert("El usuario no está registrado. Verifica el email.");
        return;

        } else {

            const { error: insertError } = await supabase
                .from('document_permissions')
                .insert({
                    document_id: documentId,
                    user_id: user.id,
                    permission_level: permission
                });
            
            if (insertError) {
                console.error("Error al agregar permiso:", insertError.message);
            }
        }
        
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl mb-4">Compartir Documento</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email del usuario"
                        className="w-full p-2 bg-gray-700 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <select
                        className="w-full p-2 bg-gray-700 rounded"
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                    >
                        <option value="view">Solo lectura</option>
                        <option value="edit">Edición</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleShare}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                        >
                            {loading ? 'Compartiendo...' : 'Compartir'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareDocumentModal;