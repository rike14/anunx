import { useContext, createContext, useState } from "react"
import Toasty from "../components/Toast"

const ToastyContext = createContext({})

export const ToastyProvider = ({ children }) => {
    const [toasty, setToasty] = useState({
        open: false,
        message: '',
        severity: 'info',
    })

    return (
        <ToastyContext.Provider value={{ setToasty }}>
            <Toasty
                open={toasty.open}
                message={toasty.message}
                severity={toasty.severity}
                onClose={() => setToasty({ ...toasty, open: false })}
            />
            {children}
        </ToastyContext.Provider>
    )
}

const useToasty = () => useContext(ToastyContext)

export default useToasty

