import { observer } from 'mobx-react-lite';
import React, {Fragment, useContext } from 'react'
import { Item, Label } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { ActivityListItem } from './ActivityListItem';

export const ActivityList: React.FC = observer(() => {
  const activityStore = useContext(ActivityStore);
  const {activitiesByDate} = activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([date,activities])=>{
       return <Fragment key={date}>
        <Label size='large' color='blue'>{date}</Label>
        
              <Item.Group divided>
                {activities.map((activity) => {
                  return <ActivityListItem key={activity.id} activity={activity} ></ActivityListItem>           

                })}        
              </Item.Group>
        </Fragment>

      })}
    </Fragment>
    
  )
})
