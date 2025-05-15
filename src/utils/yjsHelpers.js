import * as Y from 'yjs';

export const validateYjsDocument = (buffer) => {
  const ydoc = new Y.Doc();
  
  /* // Asegurar que 'prosemirror' está registrado antes de leerlo
  const fragment = ydoc.get('prosemirror', Y.XmlFragment);
  if (fragment.length === 0) {
    ydoc.transact(() => {
      const paragraph = new Y.XmlElement('paragraph');
      const textNode = new Y.XmlText('');
      fragment.push([paragraph]);
      paragraph.push([textNode]);
    });
  } */
  
  try {
    if (buffer?.byteLength > 0) {
      Y.applyUpdate(ydoc, new Uint8Array(buffer));
    }
    return ydoc;
  } catch (error) {
    console.error('Error crítico:', error);
    return ydoc;
  }
};