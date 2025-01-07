import { EventsType } from '@/types/eventType';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export const UserEvents = () => {
    const [ events, setEvents ] = useState<EventsType[]>([]);
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();

    const { data: session, status } = useSession();

    const getEvents = async() => {
        setIsLoading(true)

        try {
            const result = await axios.get('/api/user-events');
            if(result.data.success){
                setEvents(result.data.events || []);
                return;
            }
            setError(result.data.error || "Unexpected Error occured");
            
        } catch (error) {
            console.log("Error in getting events", error);
        } finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    },[]);

  return (
    <div>

    </div>
  )
}
