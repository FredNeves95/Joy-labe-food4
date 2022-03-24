import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { goToLogin } from "../routes/coordinator";

const useProtectedPage = () => {
    const history = useHistory()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token === null) {
            goToLogin(history)
        }
    }, [history, token])

}
export default useProtectedPage