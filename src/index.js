import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Loading from './components/Loading';
import { ThemeProvider } from './contexts/theme';

const App = React.lazy(() => import('./components/App'));
const Author = React.lazy(() => import('./components/Author'));
const Post = React.lazy(() => import('./components/Post'));

const root = ReactDOM.createRoot(document.getElementById('root'));
class Index extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light',
      }));
    },
  };
  render() {
    return (
      <React.StrictMode>
        <Router>
          <ThemeProvider value={this.state}>
            <div className={this.state.theme}>
              <div className='container'>
                <Nav />
                <React.Suspense fallback={<Loading />}>
                  <Switch>
                    <Route exact path='/' render={() => <App type='top' />} />
                    <Route path='/new' render={() => <App type='new' />} />
                    <Route path='/user' component={Author} />
                    <Route path='/post' component={Post} />
                    <Route render={() => <h1>404</h1>} />
                  </Switch>
                </React.Suspense>
              </div>
            </div>
          </ThemeProvider>
        </Router>
      </React.StrictMode>
    );
  }
}

root.render(<Index />);
