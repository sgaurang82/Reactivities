import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityDetails from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { ActivityList } from './ActivityList'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite'


export const ActivityDashboard: React.FC = observer(() => {
    const activityStore = useContext(ActivityStore);        
    const {selectedActivity, editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails></ActivityDetails>}
                {editMode && 
                <ActivityForm
                 // eslint-disable-next-line no-mixed-operators
                 key = {selectedActivity && selectedActivity.id || 0}
                activity={selectedActivity!}                
                ></ActivityForm>}
            </Grid.Column>
        </Grid>
    )
})

