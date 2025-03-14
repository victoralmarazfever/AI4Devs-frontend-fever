import axios from 'axios';

const API_BASE_URL = 'http://localhost:3010';

export const getPositionInterviewFlow = async (positionId: number) => {
  const response = await axios.get(`${API_BASE_URL}/positions/${positionId}/interviewFlow`);
  return response.data;
};

export const getPositionCandidates = async (positionId: number) => {
  const response = await axios.get(`${API_BASE_URL}/positions/${positionId}/candidates`);
  return response.data;
};

export const updateCandidateStage = async (candidateId: number, applicationId: number, currentInterviewStep: number) => {
  const response = await axios.put(`${API_BASE_URL}/candidates/${candidateId}/stage`, {
    applicationId,
    currentInterviewStep
  });
  return response.data;
}; 