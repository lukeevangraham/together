import React from "react";
import { useParams } from "react-router-dom";

const Search = (props) => {
  //   const [searchParams, setSearchParams] = useSearchParams();

  const { term } = useParams();

  //   setSearchParams(params)

  //   console.log("PARAMS: ", searchParams)

  console.log("HERE ", term);

  return <div>{term}</div>;
};

export default Search;
