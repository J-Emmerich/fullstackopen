import React from 'react'
import '../'

const Notification = ({message, notificationOf}) => {
    if(message === null){
        return null 
    }
    const error = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
      }
    const success = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
      }
    return (
        <div style={notificationOf === 'success' ? success : error}>
            <p>{message}</p>
        </div>
    )
}

export default Notification