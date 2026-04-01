import axios from 'axios';
import apiClient from './Client';

const N8N_BASE_URL = process.env.NEXT_PUBLIC_N8N_BASE_URL;

export const analysisClient = {
  /**
   * Fetches the code context from our local backend.
   */
  async getLocalContext(projectId: string) {
    const response = await apiClient.get(`/analysis/${projectId}/context`);
    return response.data.context;
  },

  /**
   * Sends the code context to the n8n LLM Agent for analysis.
   * @param action The type of analysis to perform: 'general' | 'routes' | 'logic' | 'migration'
   */
  async analyzeWithAgent(projectId: string, context: string, action: string = 'general') {
    if (!N8N_BASE_URL) {
      throw new Error('n8n Base Webhook URL is not configured in .env.local');
    }

    const fullUrl = `${N8N_BASE_URL.replace(/\/$/, '')}/analyse`;
    const payload = {
      project_id: projectId,
      code_context: context,
      action,
      timestamp: new Date().toISOString()
    };

    console.log(`[n8n] Sending ${action} → ${fullUrl}`);
    const response = await axios.post(fullUrl, payload);
    const raw = response.data;

    console.log('[n8n] Raw response:', JSON.stringify(raw).slice(0, 300));

    // Extract text from every known n8n response shape
    const text =
      raw?.result?.response ||            // {success, result:{response:"..."}}
      raw?.result?.[0]?.response ||       // {success, result:[{response:"..."}]}
      raw?.[0]?.json?.response ||          // [{json:{response:"..."}}]
      raw?.[0]?.response ||               // [{response:"..."}]
      raw?.output ||
      raw?.response ||
      (typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2));

    return text as string;
  }
};
