import axios from 'axios';
import apiClient from './Client';

const SNS_BASE_URL = process.env.NEXT_PUBLIC_SNS_BASE_URL;

export const analysisClient = {
  /**
   * Fetches the code context from our local backend.
   */
  async getLocalContext(projectId: string): Promise<{ context: any; skill_content: string }> {
    const response = await apiClient.get(`analysis/${projectId}/context`);
    return {
      context: response.data.context,
      skill_content: response.data.skill_content || ''
    };
  },

  /**
   * Fetches the expert skill directive for a specific mission.
   */
  async getSkillDirective(action: string): Promise<string> {
    try {
      const response = await apiClient.get(`analysis/skills/${action}`);
      return response.data.content || '';
    } catch (e) {
      console.warn(`[Directive Hub] Failed to fetch skill for ${action}:`, e);
      return '';
    }
  },

  /**
   * Sends the code context to the SNS LLM Agent for analysis.
   * DIRECT CALL (No Proxy)
   */
  async analyzeWithAgent(
    projectId: string,
    context: any,
    action: string = 'general',
    previousIntelligence?: string,
    stackSettings?: { backend: string; framework: string; frontend?: string }
  ): Promise<string> {
    if (!SNS_BASE_URL) {
      throw new Error('SNS Base Webhook URL is not configured in .env.local');
    }

    const guidanceHints: Record<string, string> = {
      'general':    'Architecture, stack, and file map.',
      'routes':     'API endpoints and logic handlers.',
      'logic':      'Business rules and data flow.',
      'code_layer': 'LAYER ANALYZER v1.0: Analyze architectural tiers (Controllers, Services, Repositories).',
      'migration':  'MASTER ARCHITECT v2.3: Perform a high-depth architectural synthesis.',
      'planner':    'EXECUTION PLANNER v2.4: Tactical roadmap and terminal commands.'
    };

    const baseUrl = SNS_BASE_URL.replace(/\/$/, '');
    let fullUrl = `${baseUrl}/analyze`;

    // Routing
    if      (action === 'routes')     fullUrl = `${baseUrl}/routes`;
    else if (action === 'logic')      fullUrl = `${baseUrl}/logic`;
    else if (action === 'code_layer') fullUrl = `${baseUrl}/code-layer-analyzer`;
    else if (action === 'migration')  fullUrl = `${baseUrl}/migration`;
    else if (action === 'planner')    fullUrl = `${baseUrl}/planner`;

    // Directive Hydration
    const skillDirective =
      action === 'migration' && typeof context === 'object' && 'skill_content' in context
        ? context.skill_content
        : action === 'migration'
          ? await this.getSkillDirective('migration')
          : '';

    const rawContext =
      typeof context === 'object' && 'context' in context ? context.context : context;

    const payload = {
      project_id: projectId,
      code_context: rawContext,
      action,
      guidance_hint: guidanceHints[action] || '',
      skill_directive: skillDirective,
      stack_settings: stackSettings || null,
      previous_intelligence: previousIntelligence || '',
      timestamp: new Date().toISOString()
    };

    console.log(`[Analysis] Calling SNS DIRECTLY: ${fullUrl}`);

    // Direct SNS Call
    const response = await axios.post(fullUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 600000 // 10 minutes
    });

    const raw = response.data;

    // Extract result from response shapes
    const extractedOutput = (
      raw?.result?.response ||
      raw?.[0]?.json?.response ||
      raw?.output ||
      (typeof raw === 'string' ? raw : JSON.stringify(raw))
    ) as string;

    return extractedOutput;
  }
};
