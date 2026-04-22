import { CircleDollarSign } from "lucide-react"

export default function RawMaterialCards(){
    return(
        <>
            <RawmaterialCard/>
            <RawmaterialCard/>
            <RawmaterialCard/>
            <RawmaterialCard/>
        </>
    )
}

export function RawmaterialCard(){
    return(
        <div className="bg-surface-container-highest p-5 rounded-DEFAULT shadow-none transition-all active:scale-[0.98]">
            <div className="flex justify-between items-start mb-4">
                <div>
                <h3 className="font-bold text-lg text-primary">
                    Tepung Terigu
                </h3>
                <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase">
                    Ready Stock
                </span>
                </div>
                <div className="text-right">
                <div className="font-bold text-xl text-on-surface">
                    45.5
                    <span className="text-xs font-normal text-on-surface-variant">
                    kg
                    </span>
                </div>
                <p className="text-[10px] text-on-surface-variant uppercase mt-1">
                    Stok Saat Ini 
                </p>
                </div>
            </div>
            <div className="bg-surface-container-low/50 rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-lg">
                    <CircleDollarSign />
                </span>
                <span className="text-sm font-medium text-on-surface-variant">
                    Avg. Cost
                </span>
                </div>
                <div className="font-semibold text-primary">
                Rp 12.400
                <span className="text-xs font-normal">
                    /kg
                </span>
                </div>
            </div>
        </div>
    )
}