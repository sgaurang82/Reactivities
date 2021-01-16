import 'semantic-ui-css/semantic.min.css';
import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Navbar } from '../../features/nav/navbar';
import { ActivityDashboard } from '../../features/actvities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ActivityForm } from '../../features/actvities/form/ActivityForm';
import ActivityDetails from '../../features/actvities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = observer(({ location }) => {


  return (
    <Fragment>
      <Route exact path='/' component={HomePage} ></Route>
      <Route path='/(.+)' render={() => (
        <Fragment>
          <Navbar />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path='/activities' component={ActivityDashboard} ></Route>
            <Route path='/activities/:id' component={ActivityDetails} ></Route>
            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}></Route>

          </Container>
        </Fragment>
      )}></Route>


    </Fragment>
  );

});


export default withRouter(App);
