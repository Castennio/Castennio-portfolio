import { notFound } from 'next/navigation';
import { getPortalBySlug } from '@/lib/projects';

export default async function ClientPortalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortalBySlug(slug);

  if (!data) notFound();

  const completedCount = data.phases.filter((p) => p.status === 'completed').length;
  const pct = data.phases.length > 0 ? Math.round((completedCount / data.phases.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/[0.06] px-6 py-6">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm">C</span>
          </div>
          <div>
            <p className="text-white/90 font-semibold text-[15px]">{data.projectName}</p>
            <p className="text-white/30 text-[12px]">Portal del proyecto</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] text-white/50">Progreso general</span>
            <span className="text-[13px] text-cyan-400 font-medium tabular-nums">{pct}%</span>
          </div>
          <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Timeline */}
        <section>
          <h2 className="text-[15px] font-semibold text-white/80 mb-5">Fases</h2>
          <div className="space-y-0">
            {data.phases.map((phase, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    phase.status === 'completed' ? 'bg-emerald-400' :
                    phase.status === 'in_progress' ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'
                  }`}>
                    {phase.status === 'completed' && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {i < data.phases.length - 1 && (
                    <div className={`w-px flex-1 min-h-8 ${
                      phase.status === 'completed' ? 'bg-emerald-400/30' : 'bg-white/[0.08]'
                    }`} />
                  )}
                </div>
                <div className="pb-6">
                  <p className={`text-[14px] font-medium ${
                    phase.status === 'completed' ? 'text-white/70' :
                    phase.status === 'in_progress' ? 'text-white/90' : 'text-white/40'
                  }`}>{phase.name}</p>
                  <p className={`text-[12px] mt-0.5 ${
                    phase.status === 'completed' ? 'text-emerald-400/70' :
                    phase.status === 'in_progress' ? 'text-cyan-400/70' : 'text-white/25'
                  }`}>
                    {phase.status === 'completed' ? 'Completado' :
                     phase.status === 'in_progress' ? 'En progreso' : 'Pendiente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next delivery */}
        {data.nextDeliveryDate && (
          <section className="bg-cyan-500/[0.06] border border-cyan-500/20 rounded-2xl p-5">
            <p className="text-[13px] text-cyan-400/80 mb-1">Próxima entrega</p>
            <p className="text-[16px] text-white/90 font-medium">
              {new Date(data.nextDeliveryDate + 'T00:00:00').toLocaleDateString('es-PE', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </section>
        )}

        {/* Notes */}
        {data.notes.length > 0 && (
          <section>
            <h2 className="text-[15px] font-semibold text-white/80 mb-5">Actualizaciones</h2>
            <div className="space-y-3">
              {data.notes.map((note, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
                  <p className="text-[14px] text-white/70 whitespace-pre-wrap">{note.content}</p>
                  <p className="text-[11px] text-white/30 mt-2">
                    {new Date(note.createdAt).toLocaleDateString('es-PE', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/[0.06] px-6 py-6 mt-8">
        <p className="text-center text-white/25 text-[12px]">
          Creado con{' '}
          <a href="https://castennio.com" className="text-white/40 hover:text-white/60 transition-colors">
            Castennio
          </a>
        </p>
      </footer>
    </div>
  );
}
