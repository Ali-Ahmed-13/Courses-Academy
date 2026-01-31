import { api } from './axios';

/* Get Progress */

export const getProgress = async (userId, courseId) => {
  try {
    const res = await api.get(
      `/lesson-progresses?filters[userId][$eq]=${userId}&filters[course][id][$eq]=${courseId}`
    );
    return res.data.data[0] || null;
  } catch (err) {
    return null;
  }
};

/* Create Progress */

export const createProgress = async ({
  userId,
  courseId,
  completedLessons,
  progress,
}) => {
  try {
    const res = await api.post(`/lesson-progresses`, {
      data: {
        userId,
        course: courseId,
        completedLessons,
        progress,
        certificateIssued: false,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

/* Update Progress */
export const updateProgress = async (id, data) => {
  try {
    const res = await api.put(`/lesson-progresses/${id}`, {
      data,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getUserAllProgress = async (userId) => {
  const res = await api.get(
    `/lesson-progresses?filters[userId][$eq]=${userId}&populate=course`
  );
  return res.data.data;
};
