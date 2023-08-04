import axios from '../axios';

const PATH = '/movies';

const getMoviesByPage = (pageNumber) =>
  axios.get(PATH, {
    params: {
      page: pageNumber,
    },
  });

export default getMoviesByPage;
