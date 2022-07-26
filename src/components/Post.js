import React from 'react';
import { fetchComments, fetchItem } from '../utils/api';
import PostList from './PostsList';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Content({ item }) {
  const { by, descendants, time, title, url, text } = item;
  let date = new Date(time * 1000);
  date = date.toLocaleTimeString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div>
      <h1 className='header'>
        <a className='link' href={url}>
          {title}
        </a>
      </h1>
      <div className='meta-info-light'>
        <span>
          by <a href='/'>{by}</a>
        </span>
        <span>on {date}</span>
        <span>
          with <a href='/'>{descendants}</a> comments
        </span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

function Comments({ comments }) {
  return (
    <div>
      {comments.map((comment, index) => {
        const { by, time, text } = comment;
        let date = new Date(time * 1000);
        date = date.toLocaleTimeString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        return (
          <div className='comment' key={index}>
            <div className='meta-info-light'>
              <span>
                by{' '}
                <Link
                  to={{
                    pathname: '/user',
                    search: `id=${by}`,
                  }}
                >
                  {by}
                </Link>
              </span>
              on {date}
            </div>
            <p dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        );
      })}
    </div>
  );
}

export default class Post extends React.Component {
  state = {
    item: {},
    comments: {},
  };

  getComments = () => {
    const { item, comments } = this.state;
    if (!comments[0]) {
      fetchComments(item.kids).then((comments) => {
        this.setState({
          comments: comments,
        });
      });
    }
  };

  getItem = (id) => {
    fetchItem(id).then((item) => {
      this.setState({
        item: item,
      });
    });
  };

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    this.getItem(id);
  }

  render() {
    return (
      <div>
        {!this.state.item.kids && <Loading text='Fetching post' />}
        {this.state.item.kids && this.getComments() && (
          <Content item={this.state.item} />
        )}
        {this.state.item.kids && <Content item={this.state.item} />}
        {!this.state.comments[0] && this.state.item.kids && (
          <Loading text='Fetching comments' />
        )}
        {this.state.comments[0] && <Comments comments={this.state.comments} />}
      </div>
    );
  }
}
