import axios from '../axios';

const getMovies = (path, pageNumber) =>
  axios.get(path, {
    params: {
      page: pageNumber,
    },
  });

export default getMovies;
