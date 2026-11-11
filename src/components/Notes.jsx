import { Tldraw, getSnapshot, loadSnapshot } from 'tldraw';
import 'tldraw/tldraw.css';
import { useEffect, useState, useRef } from 'react';
import api from '../api/axios.js';

export default function Notes({ activeTrip, isDark, setSnackbar }) {
    const [editor, setEditor] = useState(null);
    const saveTimeoutRef = useRef(null);
    const isLoadingRef = useRef(false);
    useEffect(() => {
        if (editor) {
            editor.user.updateUserPreferences({
                colorScheme: isDark ? 'dark' : 'light',
            });
        }
    }, [isDark, editor]);
    // useEffect(() => {
    //     if (!editor || !activeTrip?.id) return;
    //
    //     async function fetchBoard() {
    //         isLoadingRef.current = true;
    //         try {
    //             const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    //             const resp = await api.get(`/api/trips/${activeTrip.id}/notes`, {
    //                 headers: { 'Authorization': `Bearer ${token}` }
    //             });
    //
    //             const savedData = resp.data?.data;
    //             if (savedData) {
    //                 const parsedSnapshot = typeof savedData === 'string' ? JSON.parse(savedData) : savedData;
    //                 loadSnapshot(editor.store, parsedSnapshot);
    //             } else {
    //                 editor.selectAll().deleteShapes(editor.getSelectedShapeIds());
    //             }
    //         } catch (error) {
    //             console.error('Błąd pobierania notatek:', error);
    //         } finally {
    //             isLoadingRef.current = false;
    //         }
    //     }
    //
    //     fetchBoard();
    // }, [editor, activeTrip?.id]);
    // useEffect(() => {
    //     if (!editor || !activeTrip?.id) return;
    //
    //     const unsubscribe = editor.store.listen(
    //         () => {
    //             if (isLoadingRef.current) return;
    //
    //             if (saveTimeoutRef.current) {
    //                 clearTimeout(saveTimeoutRef.current);
    //             }
    //
    //             saveTimeoutRef.current = setTimeout(async () => {
    //                 try {
    //                     const { document } = getSnapshot(editor.store);
    //                     const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    //
    //                     await api.put(`/api/trips/${activeTrip.id}/notes`,
    //                         { notesData: JSON.stringify(document) },
    //                         { headers: { 'Authorization': `Bearer ${token}` } }
    //                     );
    //                 } catch (error) {
    //                     if (setSnackbar) {
    //                         setSnackbar({
    //                             open: true,
    //                             message: 'Nie udało się zapisać tablicy!',
    //                             severity: 'error'
    //                         });
    //                     }
    //                 }
    //             }, 1500);
    //         },
    //         { scope: 'document', source: 'user' }
    //     );
    //     return () => {
    //         unsubscribe();
    //         if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    //     };
    // }, [editor, activeTrip?.id, setSnackbar]);
    if (!activeTrip) {
        return (
            <div className="w-full h-full flex items-center justify-center text-text-main font-bold">
                Wybierz podróż, aby otworzyć tablicę notatek.
            </div>
        );
    }
    return (
        <div className="w-full h-full relative isolate z-0 overflow-hidden">
            <Tldraw
                licenseKey={import.meta.env.VITE_TLDRAW_LICENSE_KEY}
                onMount={(editorInstance) => {
                    setEditor(editorInstance);
                    editorInstance.user.updateUserPreferences({
                        colorScheme: isDark ? 'dark' : 'light',
                    });
                }}
            />
        </div>
    );
}