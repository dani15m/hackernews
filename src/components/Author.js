import React from 'react';
import { fetchPosts, fetchUser } from '../utils/api';
import Loading from './Loading';
import PostList from './PostsList';
import queryString from 'query-string';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

function Description({ user }) {
  const { about, id, created, karma, submitted } = user;
  let date = new Date(created * 1000);
  date = date.toLocaleTimeString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div>
      <h1>{id}</h1>
      <p>
        joined {date} has {karma} karma
      </p>
      {about && <p dangerouslySetInnerHTML={{ __html: about }} />}
    </div>
  );
}

export default class Author extends React.Component {
  state = {
    user: {},
    posts: {},
  };

  getUser = (authorId) => {
    fetchUser(authorId)
      .then((id) => {
        this.setState({
          user: {
            [authorId]: id,
          },
        });
      })
      .then(() => {
        console.log(this.state);
      });
  };

  getPosts = (authorId) => {
    const { user, posts } = this.state;
    const { submitted } = user[authorId];

    if (!Array.isArray(posts)) {
      fetchPosts(submitted.slice(0, 30)).then((posts) => {
        this.setState({
          posts: posts,
        });
      });
    }
  };

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    if (id) this.getUser(id);
  }

  render() {
    const { user, posts } = this.state;
    const { id } = queryString.parse(this.props.location.search);
    setTimeout(() => {
      // console.log('user: ', user);
    }, 300);
    return (
      <div>
        {!user[id] && <Loading text='Fetching user' />}
        {user[id] && <Description user={user[id]} />}
        {user[id] && this.getPosts(id)}
        {!Array.isArray(posts) && user[id] && <Loading text='Fetching posts' />}
        {Array.isArray(posts) && (
          <div>
            {' '}
            <h2>Posts</h2>
            <PostList posts={posts} />
          </div>
        )}
      </div>
    );
  }
}
