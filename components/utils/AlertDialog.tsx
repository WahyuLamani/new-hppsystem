interface confirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function AlertDialog({
    open,
    title = "Simpan Perubahan?",
    message,
    onConfirm,
    onCancel,}: confirmDialogProps){
        if (!open) return null;
        return(
            <>
            <div className="absolute top-24 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-48 -left-12 w-48 h-48 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="relative bg-surface w-full max-w-[320px] rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-extrabold text-primary">
                            {title}
                        </h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-3 mt-8">
                        <button className="flex-1 py-3 rounded-full text-sm font-bold text-on-surface-variant bg-surface-container-high active:scale-95 transition-transform" onClick={onCancel}>
                            Kembali
                        </button>
                        <button className="flex-1 py-3 rounded-full text-sm font-bold text-on-primary bg-primary shadow-md active:scale-95 transition-transform" onClick={onConfirm}>
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
}