import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

export default function PostList({ posts }) {
  return (
    <div>
      {posts.length === 0 && (
        <p className='center-text'>This user hasn't posted yet</p>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => {
            const { by, descendants, time, title, url, id } = post;
            let date = new Date(time * 1000);
            date = date.toLocaleTimeString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
            return (
              <li key={index} className='post'>
                {url ? (
                  <a href={url} className='link'>
                    {title}
                  </a>
                ) : (
                  <Link
                    to={{
                      pathname: '/post',
                      search: `id=${id}`,
                    }}
                    className='link'
                  >
                    {title}
                  </Link>
                )}
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
                  <span>on {date}</span>
                  <span>
                    with{' '}
                    <Link
                      to={{
                        pathname: '/post',
                        search: `id=${id}`,
                      }}
                    >
                      {descendants}
                    </Link>{' '}
                    comments
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
