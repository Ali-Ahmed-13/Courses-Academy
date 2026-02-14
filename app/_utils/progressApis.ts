import { api } from './axios';

/* Get Progress */

export const getProgress = async (userId: string, courseId: string) => {
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
  certificateIssued,
}: {
  userId: string;
  courseId: string;
  completedLessons: number[];
  progress: number;
  certificateIssued: boolean;
}): Promise<any> => {
  try {
    const res = await api.post(`/lesson-progresses`, {
      data: {
        userId,
        course: courseId,
        completedLessons,
        progress,
        certificateIssued: certificateIssued,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Create Progress API Error:', err);
    return null;
  }
};

/* Update Progress */
export const updateProgress = async (
  id: string,
  data: {
    completedLessons: number[];
    progress: number;
    certificateIssued: boolean;
  }
) => {
  try {
    const res = await api.put(`/lesson-progresses/${id}`, {
      data,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getUserAllProgress = async (userId: any) => {
  const res = await api.get(
    `/lesson-progresses?filters[userId][$eq]=${userId}&populate=course`
  );
  return res.data.data;
};
