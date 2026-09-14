'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProjectSummary {
  id: number;
  slug: string;
  clienteEmpresa: string;
  createdAt: string;
  phasesTotal: number;
  phasesCompleted: number;
}

export default function PortalListPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white/90">Portal de Proyectos</h1>
        <p className="text-[13px] text-white/40 mt-1">Gestiona el progreso de tus proyectos</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/40 text-[15px]">No hay proyectos guardados</p>
          <p className="text-white/25 text-[13px] mt-2">Guarda un contrato para crear un proyecto</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => {
            const pct = p.phasesTotal > 0 ? Math.round((p.phasesCompleted / p.phasesTotal) * 100) : 0;
            return (
              <Link key={p.id} href={`/admin/portal/${p.id}`}
                className="block bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[15px] font-semibold text-white/90">{p.clienteEmpresa}</h3>
                  <span className="text-[12px] text-white/30">
                    {new Date(p.createdAt).toLocaleDateString('es-PE')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[13px] text-white/50 tabular-nums">{pct}%</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
