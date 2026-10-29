import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ConfirmModal({open, onClose, onConfirm, title, text, confirmLabel = "Potwierdź", cancelLabel = "Anuluj"}) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'var(--bg-input)',
                borderRadius: 2,
                boxShadow: 24,
                p: {xs: 2, sm: 4},
                width: {xs: '90%', sm: 450},
                maxWidth: '100%',
                outline: 'none'
            }}>
                <div className={"flex flex-col gap-4 p-2"}>
                    <Typography variant="h6" component="h2" sx={{fontWeight: 'bold', color: 'var(--text-main)'}}>
                        {title}
                    </Typography>
                    {text && <p className={"text-text-main text-sm lg:text-base"}>{text}</p>}
                    <div className={"flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-2"}>
                        <button onClick={onClose}
                                className={"bg-gray-500 border border-border-col w-full sm:w-28 h-10 rounded-xl " +
                                    "hover:bg-gray-600 hover:text-white transition duration-150 ease-out hover:ease-in"}>
                            {cancelLabel}
                        </button>
                        <button onClick={onConfirm}
                                className={"bg-red-700 text-white rounded-2xl h-10 w-full sm:w-28 " +
                                    "hover:bg-red-900 transition duration-150 ease-out hover:ease-in"}>
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}