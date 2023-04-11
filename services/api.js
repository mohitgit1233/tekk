import {
  OFFERS_BY_JOBID,
  ROOMS,
  ACCEPT_OFFER,
  REJECT_OFFER,
  JOBS,
  JOBS_BY_EMPLOYER_ID,
  JOB_BY_ID,
  MESSAGES,
  NOTIFICATIONS_BY_TECHID,
  ALL_OFFERS,
  CLOCKIN,
  CLOCKOUT,
  EMPLOYMENT_BY_OFFERID,
  OFFERS_BY_TECHID,
  NOTIFICATIONS_BY_EMPID,
  API_BASE_URL,
  // OPENAI_API_KEY
} from './api_config';

import { UserAuth } from '../src/context/AuthContext';

// export const getOffersByJobId = (id) => {
//     const url = OFFERS_BY_JOBID(id);

//     return fetch(url)
//       .then((resp) => resp.json())
//       .catch((error) => console.error(error));
//   };

const { token } = UserAuth;

export const generic = async (url, id = null) => {
  try {
    let response = null;
    if (id) {
      response = await fetch(url(id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOffersByJobId = async (id = null) => {
  return await generic(OFFERS_BY_JOBID, id);
};
export const getOffersById = async (id = null) => {
  return await generic(`${API_BASE_URL}/offers/${id}`);
};
export const getRooms = async (id = null) => {
  return await generic(ROOMS);
};
export const acceptOffer = async (id = null, body = null) => {
  try {
    const response = await fetch(ACCEPT_OFFER(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRoom = async (id = null, body = null) => {
  try {
    const response = await fetch(ROOMS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const rejectOffer = async (id = null) => {
  try {
    const response = await fetch(REJECT_OFFER(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getJobs = async (id = null) => {
  return await generic(JOBS, id);
};
export const postJobs = async (id = null, body = null) => {
  try {
    const response = await fetch(JOBS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getJobsByEmployerId = async (id = null) => {
  return await generic(JOBS_BY_EMPLOYER_ID, id);
};
export const getJobById = async (id = null) => {
  return await generic(JOB_BY_ID, id);
};
export const getMessages = async (id = null) => {
  return await generic(MESSAGES, id);
};
export const getNotificationsByTechId = async (id = null) => {
  return await generic(NOTIFICATIONS_BY_TECHID, id);
};
export const getNotificationsByEmpId = async (id = null) => {
  return await generic(NOTIFICATIONS_BY_EMPID, id);
};
export const getOffers = async (id = null) => {
  return await generic(ALL_OFFERS, id);
};
export const postOffer = async (id = null, body = null) => {
  try {
    const response = await fetch(ALL_OFFERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const clockIn = async (id = null, body = null) => {
  try {
    const response = await fetch(CLOCKIN(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const clockOut = async (id = null, body = null) => {
  try {
    const response = await fetch(CLOCKOUT(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getEmploymentByOfferId = async (id = null) => {
  return await generic(EMPLOYMENT_BY_OFFERID, id);
};
export const getOffersByTechId = async (id = null) => {
  return await generic(OFFERS_BY_TECHID, id);
};

export const getUserById = async (id = null) => {
  return await generic(`${API_BASE_URL}/users/${id}`);
};

export const getIncomeHours = async (id = null) => {
  return await generic(`${API_BASE_URL}/technicians/${id}/income_hours`);
};

export const updateTechnicianImage = async (id = null, body = null) => {
  const response = await fetch(`${API_BASE_URL}/technicians/${id}`, {
    method: 'PATCH',
    body: body,
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};
export const patchJobImages = async (id = null, body = null) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}/images`, {
    method: 'PATCH',
    body: body,
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

export const login = async (id = null, body = null) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};
export const pushToTechnicians = async (id = null, body = null) => {
  const response = await fetch(`${API_BASE_URL}/technicians/notifications`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};
export const pushToEmployerById = async (id = null, body = null) => {
  const response = await fetch(
    `${API_BASE_URL}/employers/${id}/notifications`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data;
};
//new
export const pushToTechnicianById = async (id = null, body = null) => {
  const response = await fetch(
    `${API_BASE_URL}/technicians/${id}/notifications`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data;
};
export const deleteNotificationById = async (id = null, body = null) => {
  const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
    method: 'DELETE',
    // body: JSON.stringify(body),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });

  const data = await response.json();
  return data;
};

export const getCompletionsOpenAI = async (id = null, body = null) => {
  // const response = await fetch('https://api.openai.com/v1/completions', {
  const response = await fetch(`${API_BASE_URL}/openai/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log('ddddddddd');
  console.log(data);

  return data;
};
//usage in components
// import { getAllOffers } from './api';

// const AllOffers = () => {
//   const { params } = useRoute();
//   const { id } = params;
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getAllOffers(id)
//       .then((json) => setData(json))
//       .catch((error) => console.error(error));
//   }, []);

//   // Render your component here
// };
// OR

//   useEffect(() => {
// const fetchData = async () => {
// const offersData = await getAllOffers(id);
// setData(offersData);
// };
// fetchData();
//   }, []);
