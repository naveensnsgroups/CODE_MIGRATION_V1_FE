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

    // Standardize the URL by ensuring it ends with /analyse
    const fullUrl = `${N8N_BASE_URL.replace(/\/$/, '')}/analyse`;

    const payload = {
      project_id: projectId,
      code_context: context,
      action: action, // Tells the n8n agent what to focus on
      timestamp: new Date().toISOString()
    };

    console.log(`Sending ${action} analysis request to n8n Agent at ${fullUrl}...`, payload);
    const response = await axios.post(fullUrl, payload);
    return response.data;
  }
};
