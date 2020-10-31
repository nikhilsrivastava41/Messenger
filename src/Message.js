import './Message.css';
import React from 'react'
import { forwardRef } from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
const Message=forwardRef ((props,ref) =>{
    const isUser = props.username === props.msg.username;
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser? "message__usercard" : "message__guestcard"}>
                <CardContent>
                    <Typography color="white" variant="h5" component="h2">
                        {!isUser && `${props.username} : `} {props.msg.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
