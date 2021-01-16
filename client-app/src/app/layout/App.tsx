import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, Fragment,  useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { Navbar } from '../../features/nav/navbar';
import { ActivityDashboard } from '../../features/actvities/dashboard/ActivityDashboard';
import {LoadingComponent} from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite'

const App = observer( () => {

  const activityStore = useContext(ActivityStore);
  
  
  useEffect(() => {

    activityStore.loadActvities();


  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="Loading activities..."></LoadingComponent>

  return (
    <Fragment>
      <Navbar  />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard/>

      </Container>

    </Fragment>
  );

});


export default  App;
