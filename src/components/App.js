import React from 'react';
import { fetchMainPosts } from '../utils/api';
import Loading from './Loading';
import PostList from './PostsList';

export default class App extends React.Component {
  state = {
    posts: {},
    loading: true,
  };

  componentDidMount() {
    if (this.props.match.path === '/new') this.getPosts('new');
    else this.getPosts('top');
  }

  getPosts = (props) => {
    if (!this.state.posts['top']) {
      fetchMainPosts(props).then((data) => {
        this.setState({
          posts: {
            ['top']: data,
          },
          loading: false,
        });
      });
    }
  };

  render() {
    const { posts, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return <div>{posts['top'] && <PostList posts={posts['top']} />}</div>;
  }
}
