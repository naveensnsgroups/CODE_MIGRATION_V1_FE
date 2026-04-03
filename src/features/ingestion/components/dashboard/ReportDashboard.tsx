import React from 'react';
import { SummaryBox, StructuredData } from './CommonElements';
import { RoutesHero } from './RoutesHero';
import { LogicHero } from './LogicHero';
import { ArchitectureHero } from './ArchitectureHero';
import { MigrationHero } from './MigrationHero';

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
      {activeAction === 'routes' ? (
        <RoutesHero routes={data.routes} />
      ) : activeAction === 'logic' ? (
        <LogicHero rules={data.business_rules} units={data.logic_units} />
      ) : activeAction === 'migration' ? (
        <MigrationHero data={data} />
      ) : activeAction === 'general' ? (
        <ArchitectureHero data={data} />
      ) : (
        /* Default / Migration: Show Everything */
        <>
          <ArchitectureHero data={data} />
          <RoutesHero routes={data.routes} />
          <LogicHero rules={data.business_rules} />
        </>
      )}
    </div>
  );
};
