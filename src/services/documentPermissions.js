import { supabase } from "../utils/supabaseClient";

export const verifyDocumentAccess = async (documentId, userId) => {
    const { data, error } = await supabase
        .rpc('check_document_access', {
            p_document_id: documentId,
            p_user_id: userId
        });

    if (error || !data) throw new Error('Acceso denegado');
    return data;
};