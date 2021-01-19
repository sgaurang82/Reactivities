import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { ActivityFormValues } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput } from '../../../app/common/form/TextInput';
import { TextAreaInput } from '../../../app/common/form/TextAreaInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import { DateInput } from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';

import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';


const validate = combineValidators({
    title: isRequired({message:'The event title is required'}),
    category: isRequired('Categoory'),
    description: composeValidators(isRequired('Description'),
    hasLengthGreaterThan(4)({message:'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface DetailsParam {
    id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<DetailsParam>> = observer(({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { editActivity, createActivity, submitting, loadActivity } = activityStore;

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id)
                .then(activity => {
                    setActivity(new ActivityFormValues(activity));
                }).finally(() => setLoading(false));

        }
    }, [loadActivity, match.params.id]);

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    const handleFinalFormSubmit = (values: any) => {

        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;

        console.log(activity);

        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }

            createActivity(newActivity);
        }
        else {
            editActivity(activity);
        }

    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        validate = {validate}
                        onSubmit={handleFinalFormSubmit}
                        initialValues={activity}
                        render={({ handleSubmit, invalid, pristine }) => {
                            return <Form onSubmit={handleSubmit} loading={loading}
                            >
                                <Field name='title' placeholder='Title' value={activity.title} component={TextInput}></Field>
                                <Field name='description' placeholder='Description' value={activity.description} rows={3} component={TextAreaInput}></Field>
                                <Field name='category' placeholder='Category' value={activity.category} options={category} component={SelectInput}></Field>
                                <Form.Group width='equal'>
                                    <Field name='date' date={true} type='datetime-local' placeholder='Date' value={activity.date} component={DateInput}></Field>
                                    <Field name='time' time={true} type='datetime-local' placeholder='Time' value={activity.time} component={DateInput}></Field>
                                </Form.Group>

                                <Field name='city' placeholder='City' value={activity.city} component={TextInput}></Field>
                                <Field name='venue' placeholder='Venue' value={activity.venue} component={TextInput}></Field>
                                <Button loading={submitting} disabled={loading || invalid || pristine} floated='right' positive type='submit' content='Submit'></Button>
                                <Button disabled={loading} onClick={activity.id ? () => { history.push(`/activities/${activity.id}`) } : () => { history.push('/activities') }} floated='right' content='Cancel'></Button>
                            </Form>
                        }}
                    />

                </Segment>
            </Grid.Column>
        </Grid>

    )
})

