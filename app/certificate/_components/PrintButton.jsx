'use client';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print-button mt-10 flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
    >
      <Printer className="w-5 h-5" />
      Print Certificate
    </button>
  );
}
