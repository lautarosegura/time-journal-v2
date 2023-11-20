'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export interface Log {
    date: Date | null
    hours: number
    note: string
}

type LogsContextType = {
    log: Log
    logs: Log[]
    addLog: (log: Log) => void
    setLog: (log: Log) => void
}

export const LogsContext = createContext<LogsContextType | null>(null)

interface LogsContextProviderProps {
    children: React.ReactNode
}

const LogsContextProvider = ({ children }: LogsContextProviderProps) => {
    const [log, setLogState] = useState<Log>({
        date: null,
        hours: 0,
        note: ''
    })

    const setLog = (log: Partial<Log>) => {
        setLogState((prevLog) => ({
            ...prevLog,
            ...log
        }))

        console.log(log)
    }

    useEffect(() => {}, [])

    return (
        <LogsContext.Provider
            value={{
                log,
                logs: [],
                addLog: () => {},
                setLog
            }}
        >
            {children}
        </LogsContext.Provider>
    )
}

export const useLogs = () => {
    const context = useContext(LogsContext)

    if (context === null) {
        throw new Error('useLogs must be used within a LogsContextProvider')
    }

    return context
}

export default LogsContextProvider
