import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export let api = axios.create({
  baseURL: API_URL,
});

//  Get all courses
export const fetchCourses = async () => {
  try {
    const res = await api.get('/courses?populate=*');
    return res.data.data;
  } catch (err) {
    console.error('Error fetching courses:', err);
    return [];
  }
};

export const fetchCourseById = async (id) => {
  try {
    const res = await api.get('/courses?populate=*');

    let filtered = res.data.data.filter((course) => course.id == id);

    return filtered.length > 0 ? filtered[0] : null;
  } catch (err) {
    console.error('Error fetching course:', err);
    return null;
  }
};

//
