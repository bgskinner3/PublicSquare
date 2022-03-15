import React from 'react';
import { connect } from 'react-redux';
import { GET_SINGLE_USER } from '../graphql/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import { JWT_SECRET, USER } from '../constants';

const HomePage = () => {
  const authToken = localStorage.getItem(JWT_SECRET);



  const { loading, error, data } = useQuery(GET_SINGLE_USER, {
    variables: { token: authToken },
  });

  const { user } = { ...data };

  console.log(loading);

  return loading ? (
    <h1>Loading!!!!</h1>
  ) : (
    <div>
      {authToken ? (
        <h1>Welcome, {user.username}</h1>
      ) : (
        <div>
          <h1>Welcome!</h1>
     
        
          
        </div>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default HomePage;
