'use client'
import React, { useState } from 'react';

export default function ScheduleMatchForm(){
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({ teamA, teamB, date, time });
    };

    return (
        <div>
            <h2>Schedule a Match</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="teamA">Team A:</label>
                    <input
                        type="text"
                        id="teamA"
                        value={teamA}
                        onChange={(e) => setTeamA(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="teamB">Team B:</label>
                    <input
                        type="text"
                        id="teamB"
                        value={teamB}
                        onChange={(e) => setTeamB(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Schedule Match</button>
            </form>
        </div>
    );
};

