import { Grid } from 'semantic-ui-react'
import { ActivityList } from './ActivityList'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react';
import ActivityStore from '../../../app/stores/activityStore'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
export const ActivityDashboard: React.FC = observer(() => {
    const activityStore = useContext(ActivityStore);


    useEffect(() => {
  
      activityStore.loadActivities();
  
  
    }, [activityStore]);
  
    if (activityStore.loadingInitial) return <LoadingComponent content="Loading activities..."></LoadingComponent>
  
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})

