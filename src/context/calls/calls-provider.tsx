import React, { useEffect, useState } from "react";
import { Provider } from "./calls-context";
import { Call, Pagination } from "types";
import axios from "axios";
import constants from "App-constants";
import { useSnackbar } from "notistack";

const { PAGINATION_DEFAULT_LIMIT } = constants;

type Props = { children: React.ReactNode };
const PlacesProvider = (props: Props) => {
  const [currentCall, setCurrentCall] = useState<Call>();
  const [calls, setCalls] = useState<Call[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    pageLimit: PAGINATION_DEFAULT_LIMIT,
    hasNextPage: false,
    totalCount: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getCalls(pagination.currentPage, pagination.pageLimit);
  }, [pagination.currentPage]);

  const updatePagination = (page: number) =>
    setPagination({ ...pagination, currentPage: page });

  const getCalls = async (
    _currentPage = 1,
    _pageLimit = PAGINATION_DEFAULT_LIMIT
  ) => {
    try {
      const { nodes, hasNextPage, totalCount } = await axios
        .get(
          `/calls?offset=${(_currentPage - 1) * _pageLimit}&limit=${_pageLimit}`
        )
        .then((res) => res.data);

      setCalls(nodes);
      setPagination({ ...pagination, hasNextPage, totalCount });
    } catch (error) {
      console.log(error);
    }
  };

  const getCall = async (id: string) => {
    try {
      const call = await axios.get(`/calls/${id}`).then((res) => res.data);

      setCurrentCall(call);
    } catch (error) {
      console.log(error);
    }
  };

  const archive = async (callIds: string[]) => {
    try {
      console.log("archive ...");
      console.log({ calls });

      await Promise.all(
        callIds.map((callId) => axios.put(`/calls/${callId}/archive`))
      );

      enqueueSnackbar("Archive done");

      getCalls(pagination.currentPage, pagination.pageLimit);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (callId: string, text: string) => {
    try {
      await axios.post(`/calls/${callId}/note`, {
        content: text,
      });

      enqueueSnackbar("New note added successfully !");
      getCall(callId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider
      value={{
        currentCall,
        calls,
        pagination,
        updatePagination,
        archive,
        getCall,
        getCalls,
        addNote,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default PlacesProvider;
