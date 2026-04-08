import apiClient from './Client';

const N8N_BASE_URL = process.env.NEXT_PUBLIC_N8N_BASE_URL;

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
   * Sends the code context to the n8n LLM Agent for analysis.
   */
  async analyzeWithAgent(
    projectId: string, 
    context: any, 
    action: string = 'general', 
    previousIntelligence?: string,
    stackSettings?: { backend: string; framework: string; frontend?: string }
  ) {
    if (!N8N_BASE_URL) {
      throw new Error('n8n Base Webhook URL is not configured in .env.local');
    }

    const guidanceHints: Record<string, string> = {
      'general': 'Architecture, stack, and file map.',
      'routes': 'API endpoints and logic handlers.',
      'logic': 'Business rules and data flow.',
      'code_layer': 'LAYER ANALYZER v1.0: Analyze architectural tiers (Controllers, Services, Repositories).',
      'migration': 'MASTER ARCHITECT v2.3: Perform a high-depth architectural synthesis.',
      'planner': 'EXECUTION PLANNER v2.4: Tactical roadmap and terminal commands.'
    };

    const baseUrl = N8N_BASE_URL.replace(/\/$/, '');
    let fullUrl = `${baseUrl}/analyse`;
    
    // 🌐 Surgical Webhook Routing (v17.1)
    if (action === 'routes') fullUrl = `${baseUrl}/routes`;
    else if (action === 'logic') fullUrl = `${baseUrl}/logic`;
    else if (action === 'code_layer') fullUrl = `${baseUrl}/code-layer-analyzer`;
    else if (action === 'migration') fullUrl = `${baseUrl}/migration`; // 🚀 Live Production n8n Port
    else if (action === 'planner') fullUrl = `${baseUrl}/planner`;

    // 🧠 Directive Hydration (v21.2)
    // Use bundled skill_content if available, otherwise fetch it
    const skillDirective = (action === 'migration' && typeof context === 'object' && 'skill_content' in context) 
      ? context.skill_content 
      : (action === 'migration' ? await this.getSkillDirective('migration') : '');

    // Extract the raw context if it was bundled
    const rawContext = (typeof context === 'object' && 'context' in context) ? context.context : context;

    const payload = {
      project_id: projectId,
      code_context: rawContext,
      action: action,
      guidance_hint: guidanceHints[action] || '',
      skill_directive: skillDirective, // High-depth rules injection
      stack_settings: stackSettings || null,
      previous_intelligence: previousIntelligence || '',
      timestamp: new Date().toISOString()
    };

    const response = await apiClient.post('analysis/proxy', {
      full_url: fullUrl,
      payload: payload
    });
    const raw = response.data;

    return (
      raw?.result?.response || 
      raw?.[0]?.json?.response || 
      raw?.output || 
      (typeof raw === 'string' ? raw : JSON.stringify(raw))
    ) as string;
  }
};
