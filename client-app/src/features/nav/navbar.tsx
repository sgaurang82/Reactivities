import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'


export const Navbar: React.FC = () => {

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item  header as ={NavLink} exact to='/'>
                    <img src="/assets/logo.png" alt="logo" style = {{marginRight:'10px'}}></img>
                    Reactivites
                </Menu.Item >
                <Menu.Item name='Activities' header as ={NavLink} to='/activities'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content="Create Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
