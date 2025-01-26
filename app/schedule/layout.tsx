
import React, { ReactNode } from 'react';
import PlayerProvider from './player-provider';

export default function ScheduleLayout({ children }:{children:ReactNode}){
    return (
        <PlayerProvider >
            {children}
        </PlayerProvider>
    );
};
