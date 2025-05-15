import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import DocumentCard from '../components/dashboard/DocumentCard';
import CreateDocumentModal from '../components/CreateDocumentModal';
import { FiFileText } from 'react-icons/fi';
import { createDocument } from '../services/documents';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [selectedTab, setSelectedTab] = useState("mine");
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Cargar documentos con memoización
    const loadDocuments = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // 1. Obtener todos los document_ids a los que el usuario tiene acceso
            const { data: permissions, error: permissionsError } = await supabase
                .from('document_permissions')
                .select('document_id')
                .eq('user_id', user.id);

            if (permissionsError) throw permissionsError;
            
            const documentIds = permissions.map((perm) => perm.document_id);

            if (documentIds.length === 0) {
                setDocuments([]);
                setLoading(false);
                return;
            }

            // 2. Con esos IDs, obtener los documentos completos
            let query = supabase
                .from('documents')
                .select('id, title, created_at, created_by')
                .in('id', documentIds)
                .ilike('title', `%${searchQuery}%`)
                .order('created_at', { ascending: false });

            const { data: docs, error: docsError } = await query;
            if (docsError) throw docsError;

            // 3. Filtrar en el cliente según la pestaña elegida:
            let filteredDocs = docs;
            if (selectedTab === 'mine') {
                filteredDocs = docs.filter(doc => doc.created_by === user.id);
            } else if (selectedTab === 'shared') {
                filteredDocs = docs.filter(doc => doc.created_by !== user.id);
            }

            setDocuments(filteredDocs);
        } catch (error) {
            console.error('Error cargando documentos:', error);
        } finally {
            setLoading(false);
        }
    }, [user, searchQuery, selectedTab]);


    const handleCreateDocument = async (title) => {
        const userId = user.id;
        const documentId = await createDocument(title, userId);
        const { data: newDocument, error } = await supabase
            .from('documents')
            .select('id, title, created_at')
            .eq('id', documentId)
            .single();

        if (error) {
            console.error("Error al recuperar el documento recién creado:", error.message);
            return;
        }
        setDocuments(prev => [newDocument, ...prev])
    };

    // Eliminar documento
    const deleteDocument = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar este documento?')) return;
        
        try {
            await supabase.from('documents').delete().eq('id', id);
            setDocuments(prev => prev.filter(doc => doc.id !== id));
        } catch (error) {
            console.error('Error eliminando documento:', error);
            loadDocuments();
        }
    };

    // Cerrar sesión
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);

    return (
        <div className="min-h-screen bg-gray-900">
            <Sidebar 
                selectedTab={selectedTab}
                onChangeTab={setSelectedTab}
                onCreateDocument={() => setShowModal(true)}
                onLogout={handleLogout}
            />

            <div className="ml-16 p-8 transition-all duration-300">
                <Header onSearch={setSearchQuery} />

                {loading ? (
                    <div className="text-center py-20 text-gray-400">
                        Cargando documentos...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <FiFileText className="text-6xl text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">
                                    {searchQuery 
                                        ? `No hay resultados para "${searchQuery}"`
                                        : 'Empieza creando tu primer documento'
                                    }
                                </p>
                            </div>
                        ) : (
                            documents.map((doc) => (
                                <DocumentCard
                                    key={doc.id}
                                    doc={doc}
                                    onDelete={() => deleteDocument(doc.id)}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>

            {showModal && (
                <CreateDocumentModal
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreateDocument}
                />
            )}
        </div>
    );
};

export default Dashboard;