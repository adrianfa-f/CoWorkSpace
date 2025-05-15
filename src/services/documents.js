import { supabase } from "../utils/supabaseClient";
import * as Y from 'yjs';

export const createDocument = async (title, userId) => {
    // 1. Crear Y.Doc válido con estructura requerida
    const ydoc = new Y.Doc();
    const fragment = ydoc.getXmlFragment('prosemirror');
    
    ydoc.transact(() => {
        const paragraph = new Y.XmlElement('paragraph');
        const textNode = new Y.XmlText('Empieza a escribir aqui...');
        fragment.push([paragraph]);
        paragraph.push([textNode]);
    });

    // 2. Generar estado inicial binario
    const initialContent = Y.encodeStateAsUpdate(ydoc);

    // 3. Guardar en Supabase en transacción
    const { data: document, error } = await supabase
        .from('documents')
        .insert({ title, created_by: userId })
        .select('id')
        .single();

    if (error) throw error;

    const { error: stateError } = await supabase
        .from('document_states')
        .insert({
            document_id: document.id,
            content: Array.from(initialContent), // Convertir Uint8Array
            last_updated: new Date().toISOString()
        });

    if (stateError) throw stateError;

    ydoc.destroy();
    return document.id;
};

export const getUserDocuments = async (userId) => {
    const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('created_by', userId);

    return { data, error };
};

export const shareDocument = async (documentId, userId, permission) => {
    const { data, error } = await supabase
        .from('document_permissions')
        .insert({ document_id: documentId, user_id: userId, permission_level: permission });

    return { data, error };
};