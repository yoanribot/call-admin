import React, { useMemo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Pagination as MUIPagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paginationWrapper: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface Props {
  isVisible: boolean;
  total: number;
  limit: number;
  onChangePage: (currentPage: number) => void;
}

const Pagination = ({ isVisible, total, limit, onChangePage }: Props) => {
  const classes = useStyles();

  const pages = useMemo(() => {
    let pagesCount = Math.floor(total / limit);
    const rest = total % limit;

    if (rest > 0) {
      pagesCount++;
    }

    return pagesCount;
  }, [total, limit]);

  const onChange = (event: {}, page: number) => {
    onChangePage(page);
  };

  if (!isVisible) return null;

  return (
    <MUIPagination
      className={classes.paginationWrapper}
      count={pages}
      variant="outlined"
      color="primary"
      onChange={onChange}
    />
  );
};

export default Pagination;
