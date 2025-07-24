import { Navigate } from "react-router-dom";
import { useState } from "react";

const RequireAdmin = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(null)


    useEffect(() => {
        if (!isAdmin) {
        router.set('/auth')
        }
    }, [isAdmin])


    if (!isAdmin){
        return null
    };

    return children
}

export default RequireAdmin