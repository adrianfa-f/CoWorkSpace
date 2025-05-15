import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateYjsDocument } from '../utils/yjsHelpers';
import EditorSetup from '../utils/editorSetup';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import ShareDocumentModal from '../components/ShareDocumentModal';

const DocumentPage = () => {
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [ydoc, setYdoc] = useState(null); // 🔹 Estado para almacenar Y.Doc

  useEffect(() => {
    let isMounted = true;

    const initializeDocument = async () => {
      try {
        setLoading(true);

        // 1. Cargar datos del documento
        const documentObj = await supabase
          .from('documents')
          .select(`
            *,
            document_states(
              content,
              last_updated
            ),
            document_permissions!inner(*)
          `)
          .eq('id', documentId)
          .single();
        
        const { data } = await documentObj;
        
        if (!data?.document_states) throw new Error('Documento no encontrado');

        // 2. Verificar permisos
        if (!data.document_permissions.some(p => p.user_id === user?.id)) {
          console.log("No estamos autorizados");
          navigate('/dashboard');
          return;
        }

        // 3. Validar Yjs y almacenar el `ydoc` en estado
        const validatedYDoc = await validateYjsDocument(data.document_states?.content);
        if (isMounted) {
          setYdoc(validatedYDoc);
          setDocumentData(data);
          setLastUpdated(new Date(data.document_states.last_updated).toLocaleString());
        }

      } catch (error) {
        console.error('Error crítico:', error);
        if (isMounted) {
          setError(error.message || 'Error al cargar el documento');
          navigate('/dashboard');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeDocument();

    return () => {
      isMounted = false;
    };
  }, [documentId, user, navigate]);

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando documento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h2 className="text-xl text-red-500 mb-4">Error</h2>
          <p className="text-white mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const myPermission =
  documentData?.document_permissions.find(p => p.user_id === user?.id)?.permission_level || 'view';

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div>
          <button onClick={() => navigate('/dashboard')} className="mr-4 text-blue-300">
            Atrás
          </button>
          <h1 className="text-2xl font-bold truncate max-w-2xl">
            {documentData?.title || 'Documento sin título'}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-gray-400 mt-1">
              Última actualización: {lastUpdated}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowShareModal(true)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Compartir
        </button>
      </header>

      {showShareModal && (
        <ShareDocumentModal
          documentId={documentId}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {ydoc && <EditorSetup ydoc={ydoc} documentId={documentId} user={user} permission={myPermission}/>}
    </div>
  );
};

export default DocumentPage;
