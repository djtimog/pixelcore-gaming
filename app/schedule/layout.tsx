import React, { ReactNode } from 'react';

export default function ScheduleLayout({ children }:{children:ReactNode}){
    return (
        <div >
            <main>{children}</main>
        </div>
    );
};
