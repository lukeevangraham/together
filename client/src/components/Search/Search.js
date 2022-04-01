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
        <div className={classes.searchHeading}>Search results for: {term}</div>
      ) : null}
      {searchResults ? (
        searchResults.length > 0 ? (
          searchResults.map((result) => (
            <UserIntroCard key={result.id} user={result} />
          ))
        ) : (
          <div>No results found</div>
        )
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.auth.searchResults,
});

export default connect(mapStateToProps, { searchUsers })(Search);
