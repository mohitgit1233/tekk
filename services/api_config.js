//SOCKET
export const SOCKET_API = 'http://192.168.0.22:5001';
//export const SOCKET_API = 'http://tekk-env.eba-udyk2w25.us-west-2.elasticbeanstalk.com'
export const API_BASE_URL = `${SOCKET_API}/api/v1`;

export const OFFERS_BY_JOBID = (id) => `${API_BASE_URL}/job/${id}/offers`;
// You can define other API URLs here as well

export const ROOMS = `${API_BASE_URL}/rooms`;

export const ACCEPT_OFFER = (id) => `${API_BASE_URL}/offers/${id}/accept`;

export const REJECT_OFFER = (id) => `${API_BASE_URL}/offers/${id}/reject`;

export const JOBS = `${API_BASE_URL}/jobs`;

export const JOBS_BY_EMPLOYER_ID = (id) =>
  `${API_BASE_URL}/employer/${id}/jobs`;
export const JOB_BY_ID = (id) => `${API_BASE_URL}/jobs/${id}`;

// export const MESSAGES = `${API_BASE_URL}/messages`
export const MESSAGES = (id) => `${API_BASE_URL}/rooms/${id}/messages`;

export const NOTIFICATIONS_BY_TECHID = (id) =>
  `${API_BASE_URL}/technicians/${id}/notifications`;
export const NOTIFICATIONS_BY_EMPID = (id) =>
  `${API_BASE_URL}/employers/${id}/notifications`;
export const ALL_OFFERS = `${API_BASE_URL}/offers`;

export const CLOCKIN = (id) => `${API_BASE_URL}/jobs/${id}/clockin`;

export const CLOCKOUT = (id) => `${API_BASE_URL}/jobs/${id}/clockout`;

export const EMPLOYMENT_BY_OFFERID = (id) =>
  `${API_BASE_URL}/offer/${id}/employment`;

export const OFFERS_BY_TECHID = (id) =>
  `${API_BASE_URL}/technician/${id}/offers`;
