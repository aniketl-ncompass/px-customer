import { AppBar, Avatar, Stack, Toolbar } from '@mui/material';
import mobiLogo from "../assets/mobiLogo.png";
import batman from "../assets/batman.png";
import LogoutUser from '../views/LogoutUser';

const Navbar = () => {
    return (
        <AppBar position='relative' variant='outlined' elevation={0} color='inherit'>
            <Toolbar>
                <Stack width="100%" alignSelf="stretch" direction="row" spacing={1} alignItems='center' justifyContent="space-between">
                    <a href="#">
                        <img src={mobiLogo} alt="mobi-logo" className='logo' />
                    </a>
                    <Stack direction="row" spacing={1} alignItems='center'>
                        <LogoutUser />
                        <Avatar alt='Avatar' src={batman} />
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar