'use client'
import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        teamName: '',
        game: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div>
            <h2>Signup for Esport Team</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="game">Game:</label>
                    <select
                        id="game"
                        name="game"
                        value={formData.game}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a game</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="Dota 2">Dota 2</option>
                        <option value="CS:GO">CS:GO</option>
                        <option value="Overwatch">Overwatch</option>
                    </select>
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;