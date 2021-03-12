import { useEffect, useState, useReducer  } from 'react'
import axios from "axios";


const dataFetchReducer =(state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { 
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return { 
        ...state, 
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return { 
        ...state,
        isLoading: false,
        isError:true
      };
    default:
      throw new Error()
  }
}

const UseHackerNewsApi = (startUrl, startArr) => {
  const [url, setUrl] = useState(startUrl);
  // const [data, setData] = useState(startArr);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // OR
  const [state, dispatch] =useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: startArr,
  })

  useEffect(() => {
    let didCancel = false;
    console.log('start');

    const fetching = async () => {
      dispatch({ type: 'FETCH_INIT'})
      try {
        const result = await axios(url);
        if(!didCancel) dispatch({ type: "FETCH_SUCCESS", payload: result.data.hits });
      } catch (error) {
        if(!didCancel) dispatch({ type: 'FETCH_FAILURE'})
        console.log("error", error);
      }
      };
      fetching();
      return () => {
        didCancel = true
        console.log('return');
      }
    }, [url]);

    return [state, setUrl]
  }
  

export default UseHackerNewsApi;