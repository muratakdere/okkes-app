import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { db } from '../services/firebase';

export type EmployeeCategory = 'Garson' | 'Usta' | 'Kasiyer' | 'Bulaşıkçı';
export type EmployeeType = 'Hourly' | 'Weekly';

export interface Employee {
    id: string;
    name: string;
    category: EmployeeCategory;
    type: EmployeeType;
    rate: number; // Hourly rate or Weekly salary
}

export interface WorkLog {
    id: string;
    employeeId: string;
    date: string;
    hours?: number;
    calculatedPay: number;
}

interface EmployeeContextType {
    employees: Employee[];
    workLogs: WorkLog[];
    addLog: (log: Omit<WorkLog, 'id'>) => Promise<void>;
    getLogsByEmployee: (employeeId: string) => WorkLog[];
    addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
}

export const EmployeeContext = createContext<EmployeeContextType>({
    employees: [],
    workLogs: [],
    addLog: async () => { },
    getLogsByEmployee: () => [],
    addEmployee: async () => { },
});

export function EmployeeProvider({ children }: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'employees'), (snapshot) => {
            const employeeList: Employee[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Employee));
            setEmployees(employeeList);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'workLogs'), (snapshot) => {
            const logsList: WorkLog[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as WorkLog));
            setWorkLogs(logsList);
        });

        return () => unsubscribe();
    }, []);

    const addLog = async (log: Omit<WorkLog, 'id'>) => {
        try {
            await addDoc(collection(db, 'workLogs'), log);
        } catch (error) {
            console.error("Error adding log: ", error);
            throw error;
        }
    };

    const addEmployee = async (employee: Omit<Employee, 'id'>) => {
        try {
            await addDoc(collection(db, 'employees'), employee);
        } catch (error) {
            console.error("Error adding employee: ", error);
            throw error;
        }
    };

    const getLogsByEmployee = (employeeId: string) => {
        return workLogs.filter((log) => log.employeeId === employeeId);
    };

    return (
        <EmployeeContext.Provider value={{ employees, workLogs, addLog, getLogsByEmployee, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}
