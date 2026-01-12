import { api } from './axios';

const API = 'http://localhost:1337/api';

/* Get Progress */
export const getProgress = async (userId, courseId) => {
  const res = await api.get(
    `/lesson-progresses?filters[userId][$eq]=${userId}&filters[course][id][$eq]=${courseId}`
  );
  return res.data.data[0];
};

/* Update Progress */
export const updateProgress = async (documentId, data) => {
  return api.put(`/lesson-progresses/${documentId}`, {
    data,
  });
};

/* Create Progress */
export const createProgress = async (data) => {
  return api.post(`/lesson-progresses`, {
    data,
  });
};

export const getUserAllProgress = async (userId) => {
  const res = await api.get(
    `/lesson-progresses?filters[userId][$eq]=${userId}&populate=course`
  );
  return res.data.data;
};

export const updateQuizStatus = async (documentId, score) => {
  return api.put(`/lesson-progresses/${documentId}`, {
    data: {
      quizScore: score,
      isQuizPassed: score >= 70,
    },
  });
};
