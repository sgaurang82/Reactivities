import React, { useContext } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'


export const Navbar: React.FC = () => {

    const activityStore = useContext(ActivityStore)
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item  header>
                    <img src="/assets/logo.png" alt="logo" style = {{marginRight:'10px'}}></img>
                    Reactivites
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={activityStore.openCreateForm} positive content="Create Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
