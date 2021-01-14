import axios from 'axios';
import { FETCH_LOCATIONS, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchLocations = () => async dispatch => {
  const res = await axios.get('/api/locations/withDrones', {
      headers: {
          'Content-Type': 'application/json',
           Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjNjU3OWYzY2JkMWUyNzRmMjYyMWNlMCIsImVtYWlsIjoibWVocm5hejM0OEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNTUwNDIxMTg2fQ.adSYr9XCAdSvxlRcexBD77q6P8T5nG5AMcM1Ceii3QE'
      }
  });

  dispatch({ type: FETCH_LOCATIONS, payload: res.data });
};

// export const handleToken = token => async dispatch => {
//   const res = await axios.post('/api/stripe', token);
//
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
