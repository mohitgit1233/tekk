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
    OFFERS_BY_TECHID
} from './api_config';



// export const getOffersByJobId = (id) => {
//     const url = OFFERS_BY_JOBID(id);
  
//     return fetch(url)
//       .then((resp) => resp.json())
//       .catch((error) => console.error(error));
//   };

export const generic = async (url, id=null ) => {
try {
    if (id)
    {
        const response = await fetch(url(id));
    }
    else
    {
        const response = await fetch(url);
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
export const getRooms = async (id=null) => {
    return await generic(ROOM)
}
export const acceptOffer = async (id=null) => {
    return await generic(ACCEPT_OFFER,id)
}
export const rejectOffer = async (id=null) => {
    return await generic(REJECT_OFFER,id)
}
export const getJobs = async (id=null) => {
    return await generic(JOBS,id)
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
    return await generic(MESSAGES,id)
}
export const getOffers = async (id=null) => {
    return await generic(ALL_OFFERS,id)
}
export const clockIn = async (id=null) => {
    return await generic(CLOCKIN,id)
}
export const clockOut = async (id=null) => {
    return await generic(CLOCKOUT,id)
}
export const getEmploymentByOfferId = async (id=null) => {
    return await generic(EMPLOYMENT_BY_OFFERID,id)
}
export const getOffersByTechId = async (id=null) => {
    return await generic(OFFERS_BY_TECHID,id)
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