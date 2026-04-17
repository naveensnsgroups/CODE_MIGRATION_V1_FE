import React from 'react';
import { Map, ArrowRight, Database, Zap, Shield, Server, Cpu, Layers } from 'lucide-react';
import { SectionHeading, StructuredData, SafeText, Tag } from './CommonElements';

export const RoutesHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  // 🧪 Strategic Mapping (v26.8): Direct binding to root-level MongoDB keys
  const apis = data.apis || [];
  const models = data.models || [];
  const externalServices = data.external_services || [];
  const operations = data.operations || [];

  const totalModels = data.total_models || (typeof data.summary === 'object' ? data.summary.total_models : 0) || models.length || 0;
  const totalApis = data.total_apis || (typeof data.summary === 'object' ? data.summary.total_endpoints : 0) || apis.length || 0;
  const dbType = (typeof data.summary === 'object' ? (data.summary.database_type || data.summary.database) : null) || 'N/A';
  const ormType = (typeof data.summary === 'object' ? (data.summary.orm || data.summary.orm_engine) : null) || 'N/A';

  return (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-6 duration-700">

      {/* ── Map Intelligence Snapshot (v26.8) ── */}
      <section className="bg-zinc-950 p-8 rounded-sm border-2 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-amber-500 uppercase tracking-widest">Stack Signature</span>
            <div className="flex items-center gap-2">
              <p className="text-[12px] font-bold text-white uppercase italic tracking-tighter bg-zinc-900 px-2 py-0.5 rounded-sm">{dbType}</p>
              <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-tighter">via</p>
              <p className="text-[12px] font-bold text-white uppercase italic tracking-tighter bg-zinc-900 px-2 py-0.5 rounded-sm">{ormType}</p>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Architectural Depth</span>
            <p className="text-lg font-bold text-white uppercase italic tracking-tighter">{totalModels} Models</p>
          </div>
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">API Surface</span>
            <p className="text-lg font-bold text-white uppercase italic tracking-tighter">{totalApis} Routes</p>
          </div>
          {/* <div className="space-y-1">
               <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Sync Status</span>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[12px] font-bold text-emerald-500 uppercase tracking-widest">Intelligence Locked</p>
               </div>
            </div> */}
        </div>
      </section>

      {/* ── Strategic Interface Registry (v26.0) ── */}
      {apis.length > 0 && (
        <section>
          <SectionHeading icon={<Map size={14} strokeWidth={3} />} title="Strategic Interface Map" />
          <div className="space-y-8">
            {apis.map((api, idx) => (
              <div key={idx} className="bg-white border-2 border-zinc-950 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,1)] overflow-hidden group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                {/* Header: Method + Path */}
                <div className="bg-zinc-950 p-5 flex items-center justify-between border-b-2 border-zinc-950">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-[12px] font-bold uppercase tracking-widest rounded-sm ${api.method === 'POST' ? 'bg-emerald-500 text-white' :
                      api.method === 'GET' ? 'bg-amber-400 text-zinc-950' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                      {api.method}
                    </span>
                    <span className="font-mono text-[14px] font-bold text-white tracking-tight uppercase italic">{api.path}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {api.auth_required && (
                      <span className="px-2 py-0.5 bg-amber-400 text-zinc-950 text-[11px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1.5">
                        <Shield size={10} strokeWidth={3} /> AUTH REQUIRED
                      </span>
                    )}
                    <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest italic">{api.controller}</span>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left: Logic & Files */}
                  <div className="lg:col-span-12 space-y-6">
                    <p className="text-[14px] font-medium text-zinc-800 leading-relaxed italic border-l-4 border-amber-400 pl-6 py-2 bg-zinc-50">
                      &quot;<SafeText text={api.description} />&quot;
                    </p>
                  </div>

                  {/* IO Intelligence */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-950 flex items-center gap-2 border-b border-zinc-100 pb-2">
                        <ArrowRight size={12} className="text-zinc-950" /> Request Payload
                      </h4>
                      <div className="space-y-4">
                        {api.request.body.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase italic">Body Fields</span>
                            <div className="flex flex-wrap gap-1.5">
                              {api.request.body.map((field, i) => (
                                <span key={i} className="px-2 py-1 bg-zinc-100 text-zinc-950 text-[12px] font-medium uppercase tracking-tighter border border-zinc-200">
                                  {field}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {api.request.params.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase italic">Path Parameters</span>
                            <div className="flex flex-wrap gap-1.5">
                              {api.request.params.map((param, i) => (
                                <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-[12px] font-medium uppercase tracking-tighter border border-amber-100">
                                  {param}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-950 flex items-center gap-2 border-b border-zinc-100 pb-2">
                        <Zap size={12} className="text-emerald-500" /> Response Map
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-zinc-400 uppercase italic">Status Codes</span>
                          <div className="flex flex-wrap gap-1.5">
                            {api.response.status_codes.map((code, i) => (
                              <span key={i} className={`px-2 py-1 text-[12px] font-bold rounded-sm border ${code >= 400 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                }`}>
                                {code}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-zinc-400 uppercase italic">Output Fields</span>
                          <div className="flex flex-wrap gap-1.5">
                            {api.response.fields.map((field, i) => (
                              <span key={i} className="text-[12px] font-medium text-zinc-600 uppercase tracking-tight">• {field}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-950 flex items-center gap-2 border-b border-zinc-100 pb-2">
                        <Layers size={12} className="text-zinc-950" /> Logical Units
                      </h4>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {api.database.models.map((model, i) => (
                            <span key={i} className="px-2 py-1 bg-zinc-950 text-white text-[12px] font-bold uppercase tracking-tighter italic">
                              {model}
                            </span>
                          ))}
                        </div>
                        {api.dependencies && api.dependencies.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase italic">Injected Services</span>
                            <div className="flex flex-wrap gap-1.5">
                              {api.dependencies.map((dep, i) => (
                                <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-widest rounded-sm border border-amber-200">
                                  {dep}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {api.database.operations.map((op, i) => (
                            <span key={i} className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[11px] font-bold uppercase tracking-widest rounded-sm border border-zinc-200">
                              {op}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Logic Strip */}
                  <div className="lg:col-span-12 pt-6 border-t-2 border-zinc-100">
                    <div className="bg-zinc-950 p-5 rounded-sm flex items-start gap-5">
                      <div className="p-2 bg-amber-400 rounded-sm flex-shrink-0">
                        <Cpu size={14} className="text-zinc-950" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[12px] font-bold text-amber-500 uppercase tracking-widest">Procedural Business Logic</span>
                        <p className="text-[13px] font-medium text-zinc-300 leading-relaxed italic"><SafeText text={api.business_logic} /></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Trace Footer */}
                <div className="px-8 py-4 bg-zinc-50 flex items-center gap-8 border-t border-zinc-100">
                  <div className="flex items-center gap-2">
                    <Tag>ROUTE</Tag>
                    <span className="text-[12px] font-semibold text-zinc-500 uppercase font-mono">{api.route_file || "DYNAMIC GENERATED"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag>CONTROLLER</Tag>
                    <span className="text-[12px] font-semibold text-zinc-500 uppercase font-mono">{api.controller_file || "INLINE EXEC"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Schema Registry (Models) ── */}
      {models.length > 0 && (
        <section>
          <SectionHeading icon={<Database size={14} strokeWidth={3} />} title="Schema Registry (v26.0)" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {models.map((model, idx) => (
              <div key={idx} className="bg-white border-2 border-zinc-950 p-6 rounded-sm shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] group hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-zinc-950">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-950 rounded-sm">
                      <Database size={14} className="text-amber-400" />
                    </div>
                    <span className="text-[14px] font-bold text-zinc-950 uppercase tracking-widest italic">{model.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase italic leading-none">{model.file.split('/').pop()}</span>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">Attributes</span>
                    <div className="space-y-2">
                      {model.fields.slice(0, 6).map((field, i) => (
                        <div key={i} className="flex items-center justify-between group/field">
                          <span className="text-[12px] font-semibold text-zinc-900 group-hover/field:text-amber-600 transition-colors uppercase tracking-tight">{field.name}</span>
                          <span className="text-[12px] font-bold text-zinc-400 bg-zinc-50 px-1.5 py-0.5 rounded-sm uppercase italic">{field.type}</span>
                        </div>
                      ))}
                      {model.fields.length > 6 && (
                        <p className="text-[11px] text-zinc-300 italic pt-1">+{model.fields.length - 6} more fields...</p>
                      )}
                    </div>
                  </div>

                  {model.relations.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-zinc-100">
                      <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">Relations</span>
                      <div className="space-y-2">
                        {model.relations.map((rel, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <div className="flex-1 flex items-center justify-between gap-4">
                              <span className="text-[11px] font-bold text-zinc-950 uppercase tracking-tighter italic">{rel.ref}</span>
                              <span className="text-[11px] font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded-sm uppercase">{rel.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Operations & Infrastructure Pulse ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Operations Mapping */}
        {operations.length > 0 && (
          <section>
            <SectionHeading icon={<Layers size={14} strokeWidth={3} />} title="Operations Registry" />
            <div className="bg-zinc-950 border-2 border-zinc-950 rounded-sm overflow-hidden shadow-[6px_6px_20px_0px_rgba(0,0,0,0.1)]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-800">
                    <th className="px-5 py-3 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Model Target</th>
                    <th className="px-5 py-3 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Logic Origin</th>
                    <th className="px-5 py-3 text-[12px] font-bold text-zinc-500 uppercase tracking-widest text-right">Methodology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {operations.map((op, i) => (
                    <tr key={i} className="hover:bg-zinc-900 transition-colors group">
                      <td className="px-5 py-4">
                        <span className="text-[12px] font-bold text-amber-400 uppercase tracking-tighter italic">{op.model}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-[12px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase italic">{op.used_in.split('/').pop()}</p>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {op.operations.map((action, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 text-[11px] font-bold uppercase tracking-widest rounded-[1px]">
                              {action}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Infrastructure Pulse */}
        {externalServices.length > 0 && (
          <section>
            <SectionHeading icon={<Server size={14} strokeWidth={3} />} title="Infrastructure Pulse" />
            <div className="grid grid-cols-1 gap-4">
              {externalServices.map((service, i) => (
                <div key={i} className="bg-white border-2 border-zinc-950 p-5 rounded-sm flex items-start justify-between shadow-[4px_4px_0px_0px_rgba(9,9,11,1)]">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-zinc-950 rounded-sm">
                      <Zap size={14} className="text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <h6 className="text-[13px] font-bold text-zinc-950 uppercase tracking-widest italic">{service.name}</h6>
                      <p className="text-[11px] font-medium text-zinc-500 leading-tight uppercase italic">{service.usage}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[12px] font-bold uppercase tracking-widest rounded-sm border border-emerald-100 italic">
                    {service.type}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
};
