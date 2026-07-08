import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

export const claimService = {
  getClaims: () => api.get('/claims/'),
  getClaim: (id: string) => api.get(`/claims/${id}`),
  createClaim: (data: any) => api.post('/claims/', data),
  uploadDocument: (id: string, file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/claims/${id}/upload-document?doc_type=${type}`, formData);
  },
  uploadImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/claims/${id}/upload-image`, formData);
  },
  analyzeClaim: (id: string) => api.post(`/claims/${id}/analyze`),
  getReport: (id: string) => api.get(`/claims/${id}/report`),
  getFullJson: (id: string) => api.get(`/claims/${id}/json`),
};

export default api;
