import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql/mutations';

const UserForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  return (
    <div>
      <input
        type="text"
        placeholder="Username..."
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Password..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          createUser({
            variables: {
              input: { password, username },
            },
          });
        }}
      >
        Create User
      </button>
    </div>
  );
};

export default UserForm;
