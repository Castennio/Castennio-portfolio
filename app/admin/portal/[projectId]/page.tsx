'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Phase {
  id: number;
  name: string;
  status: string;
  orderNum: number;
}

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

interface ProjectDetail {
  id: number;
  slug: string;
  clienteEmpresa: string;
  nextDeliveryDate: string | null;
  phases: Phase[];
  notes: Note[];
}

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteInput, setNoteInput] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((r) => r.json())
      .then(setProject)
      .finally(() => setLoading(false));
  }, [projectId]);

  const handlePhaseChange = async (phaseId: number, status: string) => {
    await fetch(`/api/projects/${projectId}/phases`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phases: [{ id: phaseId, status }] }),
    });
    setProject((prev) =>
      prev ? { ...prev, phases: prev.phases.map((p) => p.id === phaseId ? { ...p, status } : p) } : prev
    );
  };

  const handleDeliveryDate = async (date: string) => {
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nextDeliveryDate: date || null }),
    });
    setProject((prev) => prev ? { ...prev, nextDeliveryDate: date || null } : prev);
  };

  const handleAddNote = async () => {
    if (!noteInput.trim()) return;
    setAddingNote(true);
    const res = await fetch(`/api/projects/${projectId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: noteInput.trim() }),
    });
    if (res.ok) {
      const note = await res.json();
      setProject((prev) =>
        prev ? { ...prev, notes: [{ id: note.id, content: noteInput.trim(), createdAt: note.createdAt }, ...prev.notes] } : prev
      );
      setNoteInput('');
    }
    setAddingNote(false);
  };

  const copyLink = () => {
    if (!project) return;
    navigator.clipboard.writeText(`${window.location.origin}/portal/${project.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-20 text-white/40">Proyecto no encontrado</div>;
  }

  const inputClass = 'w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-white/90 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all';

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white/90">{project.clienteEmpresa}</h1>
          <p className="text-[13px] text-white/40 mt-1">Portal del proyecto</p>
        </div>
        <button onClick={copyLink}
          className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors cursor-pointer text-[13px]">
          {copied ? '✓ Copiado' : 'Copiar link del portal'}
        </button>
      </div>

      {/* Phases */}
      <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-white/80 mb-5">Fases del proyecto</h2>
        <div className="space-y-3">
          {project.phases.map((phase) => (
            <div key={phase.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  phase.status === 'completed' ? 'bg-emerald-400' :
                  phase.status === 'in_progress' ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'
                }`} />
                <span className="text-[14px] text-white/70">{phase.name}</span>
              </div>
              <select value={phase.status} onChange={(e) => handlePhaseChange(phase.id, e.target.value)}
                className="bg-white/[0.04] border border-white/[0.10] rounded-lg px-3 py-1.5 text-[13px] text-white/70 focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                <option value="pending">Pendiente</option>
                <option value="in_progress">En progreso</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Next delivery date */}
      <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-white/80 mb-3">Próxima entrega</h2>
        <input type="date" className={inputClass}
          value={project.nextDeliveryDate ?? ''}
          onChange={(e) => handleDeliveryDate(e.target.value)} />
      </section>

      {/* Notes */}
      <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
        <h2 className="text-[15px] font-semibold text-white/80 mb-5">Notas</h2>
        <div className="flex gap-2 mb-5">
          <textarea className={`${inputClass} min-h-[60px] resize-y`}
            placeholder="Escribe una actualización para el cliente..."
            value={noteInput} onChange={(e) => setNoteInput(e.target.value)} />
          <button onClick={handleAddNote} disabled={!noteInput.trim() || addingNote}
            className={`px-4 self-end rounded-lg text-[13px] font-medium py-2.5 transition-all cursor-pointer ${
              noteInput.trim() && !addingNote
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
            }`}>
            {addingNote ? '...' : 'Agregar'}
          </button>
        </div>
        {project.notes.length === 0 ? (
          <p className="text-white/30 text-[13px]">Sin notas aún</p>
        ) : (
          <div className="space-y-3">
            {project.notes.map((note) => (
              <div key={note.id} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
                <p className="text-[14px] text-white/70 whitespace-pre-wrap">{note.content}</p>
                <p className="text-[11px] text-white/30 mt-2">
                  {new Date(note.createdAt).toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
