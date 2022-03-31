import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { searchUsers } from "../../store/actions";
import UserIntroCard from "./UserIntroCard/UserIntroCard";

import classes from "./Search.module.scss";

const Search = ({ searchUsers, searchResults }) => {
  const { term } = useParams();

  useEffect(() => {
    searchUsers(term);
  }, [term]);

  return (
    <div>
      {searchResults ? (
        <div className={classes.searchHeading}>
          Search results for: {term} {console.log("RESULTS", searchResults)}
        </div>
      ) : null}
      {searchResults
        ? searchResults.map((result) => <UserIntroCard key={result.id} user={result} />)
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.auth.searchResults,
});

export default connect(mapStateToProps, { searchUsers })(Search);
