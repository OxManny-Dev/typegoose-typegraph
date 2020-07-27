import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { applyMiddleware, createStore } from 'redux';
import ApolloClient from 'apollo-boost';
import { App } from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import { theme } from './assets/theme';
import reducers from './reducers';

import 'react-tabulator/lib/styles.css'; // default theme
import 'react-tabulator/css/materialize/tabulator_materialize.min.css'; // use Theme(s)
// import "react-tabulator/css/semantic-ui/tabulator_semantic-ui.min.css"; // use Theme(s)

/* lines 21 - 30 are for preloading state*/
const getToken = () => {
  const employee = sessionStorage.getItem('loggedInEmployee');
  if (employee) {
    return JSON.parse(employee);
  }
  return { email: '', id: '', token: '' };
};
const employeeObj: { id: string, email: string, token: string } = getToken();
const { email, id, token } = employeeObj;

const store = createStore(
  reducers,
  { employee: { loggedInEmployee: { email, id, token }, employees: [] } },
  composeWithDevTools(applyMiddleware()));

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  request: async operation => {
    let token;
    const employee = sessionStorage.getItem('loggedInEmployee');
    if (employee) {
      const employeeObj = JSON.parse(employee);
      token = employeeObj.token;
    }
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN": token || ""
      }
    });
  }
});

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline/>
          <App/>
        </Router>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
