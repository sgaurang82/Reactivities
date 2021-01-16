import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailsParam{
    id:string;
}

export const ActivityForm: React.FC<RouteComponentProps<DetailsParam>> = observer(({match, history}) => {

    const activityStore = useContext(ActivityStore);
    const {editActivity, createActivity, submitting, activity:initialFormState, loadActivity, cleanActivity} = activityStore;

    useEffect(() => {
        
        if(match.params.id)
        loadActivity(match.params.id).then(()=>{  initialFormState && setActivity(initialFormState)

        });
        
        return ()=>{
            cleanActivity();
        }

    }, [cleanActivity, initialFormState, loadActivity, match.params.id])

    const initializeForm = () => {

        if (initialFormState) {
            return initialFormState;
        }
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }

    };

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    const handleSubmit =() => {

        if(activity.id.length === 0)
        {
            let newActivity = {
                ...activity, 
                id: uuid()
            }

            createActivity(newActivity).then(()=>{history.push('/activities')});
        }
        else
        {
            editActivity(activity).then(()=>{history.push('/activities')});
        }
    }
    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };

    return (
        <Segment clearing>
            <Form onSubmit = {handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title}></Form.Input>
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={activity.description}></Form.TextArea>
                <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category}></Form.Input>
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date' value={activity.date}></Form.Input>
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city}></Form.Input>
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue}></Form.Input>
                <Button loading = {submitting} floated='right' positive type='submit' content='Submit'></Button>
                <Button onClick={()=>{history.push('/activities')}} floated='right' content='Cancel'></Button>
            </Form>
        </Segment>
    )
})

