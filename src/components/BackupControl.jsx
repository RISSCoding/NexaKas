import React, { useRef } from "react";
import { Download, Upload } from "lucide-react";

export default function BackupControl({ onExport, onImport }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        alert("Harap pilih file dengan format Excel (.xlsx atau .xls)!");
        return;
      }
      onImport(file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-3 bg-[#171E24] p-4 rounded-2xl border border-[#232D36] w-full md:w-fit mb-6">
      <div className="text-left mr-2">
        <h4 className="text-xs font-semibold text-gray-200">Backup & Restore</h4>
        <p className="text-[10px] text-gray-500">Amankan data via berkas Excel (.xlsx)</p>
      </div>

      <button
        onClick={onExport}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-gray-200 text-xs font-medium rounded-xl transition-all"
        title="Download Backup Excel"
      >
        <Download size={13} /> Ekspor
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-gray-200 text-xs font-medium rounded-xl transition-all"
        title="Upload Backup Excel"
      >
        <Upload size={13} /> Impor
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx, .xls"
        className="hidden"
      />
    </div>
  );
}
