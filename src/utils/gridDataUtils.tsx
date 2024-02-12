import { Chip, Stack, Button, Typography, IconButton } from "@mui/material";

export const dateFormatter = (params: any) => {
    let formattedDate = "-";
    if (params.value)
        formattedDate = new Date(params.value).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    return formattedDate;
};

export const tagsFormatter = (params: any) => {
    return (params.value && params.value.length !== 0) ? params.value.join(", ") : "-"
}

export const activeRenderer = (params: any) => {
    return params.value ? "Active" : "Inactive"
}

export const commonFormatter = (params: any) => {
    return (params.value !== null && params.value !== undefined && params.value !== "") ? params.value : "-";
}
export const checkoutStatusRenderer = (params: any) => (
    <Chip label={params.value === "Complete" ? "Ready" : "Checkout Off"} color={params.value === "Complete" ? "success" : "warning"} variant='filled' />
)

export const buyerNameAsLInkRenderer = (params: any) => (
    <Stack direction={"row"} justifyContent="space-between" alignItems="center" gap={1} component={"span"} width="100%">
        <Button disableElevation disableRipple variant='text' href='#' sx={{ '&:hover': { backgroundColor: 'transparent' }, textTransform: "initial", padding: "0", width: "calc(100% - 30px)" }}>
            <Typography width={"100%"} textOverflow={"ellipsis"} textAlign="left" overflow="hidden" whiteSpace="nowrap" style={{ fontSize: "14px" }}>
                {params.value}
            </Typography>
        </Button>
        <IconButton id='shareIcon' color='primary' disableFocusRipple disableTouchRipple disableRipple>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.5858 5H13V3H21V11H19V6.41421L12 13.4142L10.5858 12L17.5858 5Z"></path></svg>
        </IconButton>
    </Stack>
)
