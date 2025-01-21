import React, { ReactNode } from 'react';

export default function ScheduleLayout({ children }:{children:ReactNode}){
    return (
        <div >
            <header >
                <h1>Schedule</h1>
            </header>
            <main>{children}</main>
            <footer >
                <p>&copy; 2023 Pixelcore Gaming</p>
            </footer>
        </div>
    );
};
