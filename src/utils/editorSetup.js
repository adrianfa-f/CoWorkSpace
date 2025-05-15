import React, { useState, useEffect } from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from "y-websocket";
import { supabase } from './supabaseClient';

const EditorSetup = ({ydoc, documentId, user, permission }) => {
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        const provider = new WebsocketProvider(
            'wss://demos.yjs.dev/ws', 
            documentId, 
            ydoc
        );
        console.log("se ejecuto")
        const tiptapEditor = new Editor({
            extensions: [
                StarterKit.configure({
                    history: false,
                    paragraph: { HTMLAttributes: { class: 'paragraph' } }
                }),
                Collaboration.configure({ document: ydoc, field: 'prosemirror' }),
                CollaborationCursor.configure({
                    provider,
                    user: {
                        name: user?.email,
                        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    }
                })
            ],
            onBeforeCreate({ editor }) {
                editor.storage.collaborationCursor = { provider };
            },
            editable: permission === 'edit',
            editorProps: {
                attributes: {
                    class: 'prose max-w-none focus:outline-none min-h-screen p-4'
                }
            }
        });

        setEditor(tiptapEditor);

        const saveInterval = setInterval(async () => {
            if (!ydoc) return; // Evita errores si `ydoc` no está listo aún
            console.log("Guardando estado en Supabase...");
            
            const update = Y.encodeStateAsUpdate(ydoc);
            await supabase
                    .from('document_states')
                    .upsert({
                        document_id: documentId,
                        content: Array.from(update),
                        last_updated: new Date().toISOString()
                    }, { onConflict: 'document_id' });
                
            console.log("Estado guardado correctamente.");
        }, 15000);

        return () => {
            console.log("esta saltando el return")
            tiptapEditor.destroy();
            provider.destroy();
            clearInterval(saveInterval);
        };
    }, [ydoc, documentId, user, permission]);

    if (!editor) return <div>Loading editor...</div>;
    return <EditorContent editor={editor} />;
};

export default EditorSetup;
