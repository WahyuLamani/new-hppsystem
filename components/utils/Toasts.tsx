"use client"
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";

type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastItemProps {
  variant: ToastVariant;
  title: string;
  description?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

const config: Record<ToastVariant, {
  icon: React.ReactNode;
  barColor: string;
  bg: string;
  border: string;
  iconBorder: string;
  titleColor: string;
}> = {
  success: {
    icon: <CheckCircle2 className="w-[15px] h-[15px] text-tertiary" />,
    barColor: "border-l-tertiary",
    bg: "bg-tertiary-container/60",
    border: "border-tertiary/20",
    iconBorder: "border-tertiary/30",
    titleColor: "text-on-tertiary-container",
  },
  info: {
    icon: <Info className="w-[15px] h-[15px] text-primary" />,
    barColor: "border-l-primary",
    bg: "bg-surface-container-high",
    border: "border-outline-variant/50",
    iconBorder: "border-outline-variant",
    titleColor: "text-primary",
  },
  warning: {
    icon: <AlertTriangle className="w-[15px] h-[15px] text-primary-container" />,
    barColor: "border-l-primary-fixed-dim",
    bg: "bg-primary-fixed/40",
    border: "border-primary-fixed-dim/50",
    iconBorder: "border-primary-fixed-dim/60",
    titleColor: "text-primary-container",
  },
  error: {
    icon: <XCircle className="w-[15px] h-[15px] text-error" />,
    barColor: "border-l-error",
    bg: "bg-error-container/60",
    border: "border-error/20",
    iconBorder: "border-error/30",
    titleColor: "text-on-error-container",
  },
};

function ToastItem({ variant, title, description, onRetry, onClose }: ToastItemProps) {
  const c = config[variant];
  return (
    <div
      className={`
        flex items-center gap-2.5 px-3.5 py-2.5 rounded-full
        border-l-[3px] border
        ${c.barColor} ${c.bg} ${c.border}
        pointer-events-auto
      `}
    >
      <div className="shrink-0">{c.icon}</div>

      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold leading-tight ${c.titleColor}`}>
          {title}
        </p>
        {description && (
          <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5">
            {description}
          </p>
        )}
      </div>

      {onRetry ? (
        <button
          onClick={onRetry}
          className={`
            text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0
            ${c.titleColor} ${c.iconBorder}
            hover:bg-surface-container-lowest/50 transition-colors
          `}
        >
          Retry
        </button>
      ) : (
        <button
          onClick={onClose}
          className="text-on-surface-variant/40 hover:text-on-surface-variant transition-colors shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export default function Toasts() {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col px-6 pt-24 gap-2">
      <ToastItem
        variant="success"
        title="Resep berhasil disimpan"
        description="Manual COGS diperbarui otomatis."
        onClose={() => {}}
      />
      <ToastItem
        variant="info"
        title="Stok mentega menipis"
        description="Sisa 2.5 kg di gudang utama."
        onClose={() => {}}
      />
      <ToastItem
        variant="warning"
        title="Gagal terhubung ke database"
        description="Periksa koneksi internet Anda."
        onRetry={() => {}}
      />
      <ToastItem
        variant="error"
        title="Aksi tidak dapat diproses"
        description="Terjadi kesalahan pada server."
        onClose={() => {}}
      />
    </div>
  );
}