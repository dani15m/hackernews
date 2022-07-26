import React from 'react';
import { fetchMainPosts } from '../utils/api';
import Loading from './Loading';
import PostList from './PostsList';

export default class App extends React.Component {
  state = {
    posts: null,
    loading: true,
  };

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) this.getPosts();
  }

  getPosts() {
    this.setState({
      posts: null,
      loading: true,
    });

    fetchMainPosts(this.props.type).then((data) => {
      this.setState({
        posts: data,
        loading: false,
      });
    });
  }

  render() {
    const { posts, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return <div>{posts && <PostList posts={posts} />}</div>;
  }
}
