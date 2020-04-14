import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Bundle from './Bundle';

const Index = (props) => (<Bundle load={() => import('./modules/index')}>{(Index) => <Index {...props}/>}</Bundle>);
const Login = (props) => (<Bundle load={() => import('./modules/login')}>{(Login) => <Login {...props}/>}</Bundle>);

const BasicRoute = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/Index" component={Index}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact
             component={Index}/>
    </Switch>
  </BrowserRouter>
);


export default BasicRoute;