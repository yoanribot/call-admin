import React, { memo, useState } from "react";
import { Provider } from "./calls-context";
import { Call, Pagination } from "types";
import axios from "axios";

type Props = { children: React.ReactNode };
const PlacesProvider = (props: Props) => {
  const [currentCall, setCurrentCall] = useState<Call>();
  const [calls, setCalls] = useState<Call[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    hasNextPage: false,
    totalCount: 0,
  });

  const getCalls = async () => {
    try {
      const { nodes, hasNextPage, totalCount } = await axios
        .get(`/calls?offset=${pagination?.offset}&limit=${pagination?.limit}`)
        .then((res) => res.data);

      setCalls(nodes);
      setPagination({ ...pagination, hasNextPage, totalCount });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider
      value={{
        currentCall,
        calls,
        getCalls,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default PlacesProvider;
