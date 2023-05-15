import * as React from "react";
import MenuItem from "@mui/material/MenuItem";


export default function MainMenuItem(props) {
    const handleClose = (event)=>{
        props.handleCloseMenu(event,props.menu)
    }
    return (
        <MenuItem onClick={handleClose} key={props.menu.name} >{props.menu.name}</MenuItem>)
}

