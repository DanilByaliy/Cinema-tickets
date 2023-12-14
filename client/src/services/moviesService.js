import axios from '../axios';

const PATH = '/movies';

export const getMoviesByPage = (pageNumber) =>
  axios.get(PATH, {
    params: {
      page: pageNumber,
    },
  });

export const getMovieById = (id) =>
  axios.get(`${PATH}/${id}`);
