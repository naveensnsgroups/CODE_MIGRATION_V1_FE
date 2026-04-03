import axios from 'axios';
import apiClient from './Client';

const N8N_BASE_URL = process.env.NEXT_PUBLIC_N8N_BASE_URL;

export const analysisClient = {
  /**
   * Fetches the code context from our local backend.
   */
  async getLocalContext(projectId: string) {
    const response = await apiClient.get(`analysis/${projectId}/context`);
    return response.data.context;
  },

  /**
   * Sends the code context to the n8n LLM Agent for analysis.
   */
  async analyzeWithAgent(
    projectId: string, 
    context: string, 
    action: string = 'general', 
    previousIntelligence?: string,
    stackSettings?: { backend: string; framework: string; frontend?: string }
  ) {
    if (!N8N_BASE_URL) {
      throw new Error('n8n Base Webhook URL is not configured in .env.local');
    }

    const guidanceHints: Record<string, string> = {
      'general': 'Provide a high-level summary, tech stack, and overall architecture.',
      'routes': 'SURGICAL ANALYSIS: Extract API endpoints and service imports.',
      'logic': 'SURGICAL ANALYSIS: Extract core business logic functions.',
      'migration': 'MASTER ARCHITECT v2.2: Perform a high-depth architectural synthesis. Map legacy logic to target idioms.'
    };

    const baseUrl = N8N_BASE_URL.replace(/\/$/, '');
    let fullUrl = `${baseUrl}/analyse`;
    
    if (action === 'routes') fullUrl = `${baseUrl}/routes`;
    else if (action === 'logic') fullUrl = `${baseUrl}/logic`;
    else if (action === 'migration') fullUrl = `${baseUrl}/migration`;

    let guidance = guidanceHints[action] || '';
    if (action === 'migration' && stackSettings) {
      guidance += `\nTARGET SUPREMACY: Use ${stackSettings.backend} and ${stackSettings.framework} ONLY. 
      Do NOT mention Spring Boot or Java. Focus 100% on the backend transition. Frontend: ${stackSettings.frontend || 'Disabled'}.`;
    }

    const payload = {
      project_id: projectId,
      code_context: context,
      action: action,
      guidance_hint: guidance,
      stack_settings: stackSettings || null,
      previous_intelligence: previousIntelligence || '',
      timestamp: new Date().toISOString()
    };

    const response = await axios.post(fullUrl, payload);
    const raw = response.data;

    return (
      raw?.result?.response || 
      raw?.[0]?.json?.response || 
      raw?.output || 
      (typeof raw === 'string' ? raw : JSON.stringify(raw))
    ) as string;
  }
};
