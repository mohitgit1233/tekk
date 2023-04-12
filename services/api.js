import { OFFERS_BY_JOBID,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const addJwtToHeaders = async (headers) => {
    const key = 'jwtoken';
    try {
        const jwt = await retrieveData(key); // Call retrieveData to get the JWT value
        if (jwt) {
            headers.Authorization = `Bearer ${jwt}`; // Add JWT to headers
            console.log('JWT added to headers:', headers);
        }
        return headers;
    } catch (error) {
        console.error('Error adding JWT to headers:', error);
        return headers;
    }
};

const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Data found
            console.log('Data retrieved successfully:', value);
            return value;
        } else {
            // Data not found
            console.log('No data found for key:', key);
            return null;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

export const generic = async (url, id = null) => {
    try {
        let response = null;
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        if (id) {
            response = await fetch(url(id), {
                headers
            });
        } else {
            response = await fetch(url, {
                headers
            });
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getOffersByJobId = async (id=null) => {
    return await generic(OFFERS_BY_JOBID,id)
}
export const getOffersById = async (id=null) => {
    return await generic(`${API_BASE_URL}/offers/${id}`)
}
export const getRooms = async (id=null) => {
    return await generic(ROOMS)
}
export const acceptOffer = async (id=null,body=null) => {
    try {
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        const response = await fetch(ACCEPT_OFFER(id),{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createRoom = async (id=null,body=null) => {
    try {
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        const response = await fetch(ROOMS,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const rejectOffer = async (id=null) => {
    try {
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        const response = await fetch(REJECT_OFFER(id),{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getJobs = async (id=null) => {
    return await generic(JOBS,id)
}
export const postJobs = async (id=null,body=null) => {
    try {
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        
        const response = await fetch(JOBS,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
        const data = await response.json();
        console.log("fass gya",data)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getJobsByEmployerId = async (id=null) => {
    return await generic(JOBS_BY_EMPLOYER_ID,id)
}
export const getJobById = async (id=null) => {
    return await generic(JOB_BY_ID,id)
}
export const getMessages = async (id=null) => {
    return await generic(MESSAGES,id)
}
export const getNotificationsByTechId = async (id=null) => {
    return await generic(NOTIFICATIONS_BY_TECHID,id)
}
export const getNotificationsByEmpId = async (id=null) => {
    return await generic(NOTIFICATIONS_BY_EMPID,id)
}
export const getOffers = async (id=null) => {
    return await generic(ALL_OFFERS,id)
}
export const postOffer = async (id=null,body=null) => {
    try {
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        const response = await fetch(ALL_OFFERS,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const clockIn = async (id=null,body=null) => {
    try {
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        const response = await fetch(CLOCKIN(id),{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const clockOut = async (id=null,body=null) => {
    try {
        const headers = await addJwtToHeaders({
            'Content-Type': 'application/json'
        }); 
        const response = await fetch(CLOCKOUT(id),{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getEmploymentByOfferId = async (id=null) => {
    return await generic(EMPLOYMENT_BY_OFFERID,id)
}
export const getOffersByTechId = async (id=null) => {
    return await generic(OFFERS_BY_TECHID,id)
}

export const getUserById = async (id=null) => {
    return await generic(`${API_BASE_URL}/users/${id}`)
}

export const getIncomeHours = async (id=null) => {
    return await generic(`${API_BASE_URL}/technicians/${id}/income_hours`)
}

export const updateTechnicianImage = async (id=null,body=null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    const response = await fetch(`${API_BASE_URL}/technicians/${id}`, {
        method: 'PATCH',
        body: body,
        headers: headers,
      });
  
      const data = await response.json();
      return data
}
export const patchJobImages = async (id=null,body=null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    const response = await fetch(`${API_BASE_URL}/jobs/${id}/images`, {
        method: 'PATCH',
        body: body,
        headers: headers,
      });
  
      const data = await response.json();
      return data
}


export const login = async (id=null,body=null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      });
  
      const data = await response.json();
      return data
}
export const pushToTechnicians = async (id=null,body=null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    const response = await fetch(`${API_BASE_URL}/technicians/notifications`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      });
  
      const data = await response.json();
      return data
}
export const pushToEmployerById = async (id=null,body=null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    const response = await fetch(`${API_BASE_URL}/employers/${id}/notifications`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      });
  
      const data = await response.json();
      return data
}
//new
export const pushToTechnicianById = async (id=null,body=null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    const response = await fetch(`${API_BASE_URL}/technicians/${id}/notifications`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      });
  
      const data = await response.json();
      return data
}
export const deleteNotificationById = async (id=null,body=null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: 'DELETE',
        // body: JSON.stringify(body),
        headers: headers
        //   'Content-Type': 'application/json',
        // },
      });
  
      const data = await response.json();
      return data
}

export const getCompletionsOpenAI = async (id = null, body = null) => {
    const headers = await addJwtToHeaders({
        'Content-Type': 'application/json'
    }); 
    // const response = await fetch('https://api.openai.com/v1/completions', {
    const response = await fetch(`${API_BASE_URL}/openai/completions`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("ddddddddd");
    console.log(data);

    return data
}
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
