import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AdminLayout from "./layout/Admin";
import IndexLayout from "./layout/Index"
import Login from "./pages/Login"

function Routes () {
    return (
        <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/admin" component={AdminLayout} />
            <Route path="/" component={IndexLayout} />
        </Switch>
    );
}

export default Routes;