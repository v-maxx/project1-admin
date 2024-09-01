'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const DateSelector = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedDate, setSelectedDate] = useState('');

    // Initialize selectedDate with the current date or the date from query parameters
    useEffect(() => {
        const dateFromParams = searchParams.get('date');
        const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
        if (dateFromParams) {
            setSelectedDate(dateFromParams);
        } else {
            setSelectedDate(currentDate);
        }
    }, [searchParams]);
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
        const params = new URLSearchParams(searchParams);
        params.set('date', currentDate);
        router.push(`${window.location.pathname}?${params.toString()}`);
    }, []);


    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);

        // Update query params in the URL
        const params = new URLSearchParams(searchParams);
        params.set('date', date);

        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    return (
        <div className={'flex gap-2 items-center content-center'}>
            <label htmlFor="dateInput">Select Date:</label>
            <input
                className={'text-black p-2 rounded-lg'}
                id="dateInput"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default DateSelector;
