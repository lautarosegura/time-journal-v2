'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export interface Log {
    date: Date | null
    hours: number
    note: string
    id: string
}

type LogsContextType = {
    log: Log
    logs: Log[]
    setLogs: (logs: Log[]) => void
    setLog: (log: Log) => void
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

export const LogsContext = createContext<LogsContextType | null>(null)

interface LogsContextProviderProps {
    children: React.ReactNode
}

const LogsContextProvider = ({ children }: LogsContextProviderProps) => {
    const [log, setLogState] = useState<Log>({
        date: null,
        hours: 0,
        note: '',
        id: ''
    })
    const [logs, setLogsState] = useState<Log[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const setLog = (log: Partial<Log>) => {
        setLogState((prevLog) => ({
            ...prevLog,
            ...log
        }))
    }

    const setLogs = (logs: Log[]) => {
        setLogsState(logs)
    }

    useEffect(() => {}, [])

    return (
        <LogsContext.Provider
            value={{
                log,
                logs,
                setLogs,
                setLog,
                isLoading,
                setIsLoading
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
