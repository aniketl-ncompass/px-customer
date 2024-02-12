import { Box, Button, Modal, Stack, Typography } from "@mui/material"
import { Fragment, useState } from "react"

const LogoutUser = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <Button onClick={() => setOpen(true)}>Log out</Button>
            <Modal
                open={open}
                className="modalOuterWrapper"
                onClose={() => setOpen(false)}
            >
                <Box className="modalWrapper logoutWrapper">
                    <Stack alignItems="left" gap={2} alignSelf={"stretch"} width="100%">
                        <Typography variant="h6">Logout</Typography>
                        <Typography variant="body1">Are you sure you want to logout?</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1.5} justifyContent="flex-end">
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Logout</Button>
                    </Stack>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default LogoutUser