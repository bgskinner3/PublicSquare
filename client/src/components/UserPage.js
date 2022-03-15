import React, { useState } from 'react';
import { GET_SINGLE_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { JWT_SECRET } from '../constants';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const UserPage = () => {
  const authToken = localStorage.getItem(JWT_SECRET);
  console.log(authToken);
  const { loading, data } = useQuery(GET_SINGLE_USER, {
    variables: { token: authToken },
  });

  const { user } = { ...data };
  console.log(data);

  return loading ? (
    <h1>Loading!!!!!</h1>
  ) : (
    <div>
      {authToken ? (
        <div>
          <div className="newscard">
            <Card
              id="profile-box"
              className="newscard-object"
              style={{ width: '20.5rem' }}
            >
              <Card.Img
                variant="top"
                src={user.profileImg}
                alt="none"
                className="my-image"
              />
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="profileposts">
            {user.posts
              ? user.posts.map((post, i) => {
                  return (
                    <div className="newscard" key={i}>
                      <Card
                        style={{ width: '20.5rem' }}
                        className="newscard-object"
                      >
                        <Card.Img
                          variant="top"
                          src={post.topic}
                          className="my-image"
                        />
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Text>
                            <h1>{post.description}</h1>
                            {post.pollresultstrue}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              : 'There are currently no new posts'}
          </div>
        </div>
      ) : (
        <div> Guest </div>
      )}
    </div>
  );
};

export default UserPage;
