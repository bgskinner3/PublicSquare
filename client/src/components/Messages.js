import React from 'react';
import { Container, Row, Col, FormInput, Button } from 'shards-react';
import { useSubscription, useMutation } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';

const Messages = ({user}) => {
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return null;
  }



  //use subscription to bring up a live chat? 
  //hasura.io/learn/graphql/react/subscriptions/2-apollo-subscription/#:~:text=The%20easiest%20way%20to%20bring,render%20function%20of%20your%20component!

  return (
  <div>
    
    
    
    new message
    
    </div>);
}