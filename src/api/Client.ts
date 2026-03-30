import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
