import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';
import { ActivityDetailedChat } from './ActivityDetailedChat';
import { ActivityDetailedHeader } from './ActivityDetailedHeader';
import { ActivityDetailedInfo } from './ActivityDetailedInfo';
import { ActivityDetailedSidebar } from './ActivityDetailedSidebar';


interface DetailsParam {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailsParam>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { activity, loadActivity, loadingInitial } = activityStore;

    useEffect(() => {

        loadActivity(match.params.id);
    }, [loadActivity, match.params.id, history]);

    if (loadingInitial) return <LoadingComponent content='Loading activity.....'></LoadingComponent>
    if(!activity)
    {
        return <h1>activity not found.</h1>
    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity = {activity}/>
                <ActivityDetailedInfo activity = {activity}/>
                <ActivityDetailedChat />

            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>

        </Grid>
    )
}

export default observer(ActivityDetails);
export { }