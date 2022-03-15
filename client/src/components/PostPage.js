import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { JWT_SECRET } from '../constants';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { GET_ALL_POSTS } from '../graphql/queries';
import { UPDATE_POST } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const PostPage = () => {
  const authToken = localStorage.getItem(JWT_SECRET);
  const { data: PostData } = useQuery(GET_ALL_POSTS);
  // const [voteState, setVoteState] = useState({
  //   id: '',
  //   state: null,
  //   pollcountfalse: 1,
  //   pollcounttrue: 1,
  //   pollresults: '',
  // });
  const [updatePost, { loading }] = useMutation(UPDATE_POST);

  return loading ? (
    <h1>Loading.....</h1>
  ) : authToken ? (
    <div>
      <h1>welcome</h1>
      <h1>Posts</h1>
      <div className="Allposts">
        {PostData &&
          PostData.posts.map((post) => {
            return (
              <div className="newscard" key={post.id}>
                <Card style={{ width: '20.5rem' }} className="newscard-object">
                  <Card.Img
                    variant="top"
                    src={post.topic}
                    className="my-image"
                  />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                  </Card.Body>

                  <Button
                    type="button"
                    onClick={async (e) => {
                      let vote = post.pollcounttrue += 1;
                      try {
                        e.preventDefault();
                        console.log(vote)
                        
                        await updatePost({
                          variables: {
                            input: {
                              id: post.id,
                              newpollcounttrue: 1,
                            },
                          },
                        });
                      } catch (error) {
                        console.error('i broke', error);
                      }
                    }}
                  >
                    True
                  </Button>
                  <Button
                    type="button"
                    onClick={async (e) => {
                      try {
                        e.preventDefault();
                        console.log('hello');
                        await updatePost({
                          variables: {
                            input: {
                              id: post.id,
                              newpollcountfalse: 1,
                            },
                          },
                        });
                      } catch (error) {
                        console.error('i broke', error);
                      }
                    }}
                  >
                    False
                  </Button>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <h1>'nothing to show here, why don't you sign up'</h1>
  );
};

export default PostPage;
