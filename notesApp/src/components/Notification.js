import { useEffect, useState } from "react"

const Notification = ({message}) => {
    if (!message) return
    
    return (
        <div>{message}</div>
    )
}

export default Notification