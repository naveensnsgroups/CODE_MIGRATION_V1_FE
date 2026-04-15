import React from 'react';
import { SummaryBox, StructuredData } from './CommonElements';
import { RoutesHero } from './RoutesHero';
import { LogicHero } from './LogicHero';
import { ArchitectureHero } from './ArchitectureHero';
import { StrategyHero } from './StrategyHero';
import { CodeLayerHero } from './CodeLayerHero';

interface ReportDashboardProps {
  data: StructuredData;
  activeAction?: string;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ data, activeAction }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* ── Global Summary (Always Show) ── */}
      <SummaryBox summary={data.summary} activeAction={activeAction} />

      {/* ── Surgical Filtering Logic ── */}
      {activeAction === 'routes' || activeAction === 'map' ? (
        <RoutesHero data={data} />
      ) : activeAction === 'logic' ? (
        <LogicHero data={data} />
      ) : activeAction === 'code_layer' ? (
        <CodeLayerHero data={data} />
      ) : activeAction === 'migration' ? (
        <StrategyHero data={data} />
      ) : (
        /* 🚢 Comprehensive Intelligence Hub (General & Default) */
        <ArchitectureHero data={data} />
      )}
    </div>
  );
};
