import React from 'react';
import UseTitle from '../../hooks/UseTitle'

const Index: React.FC = () => {
    UseTitle('TurnoMaster - Dashboard');
    return (
        <div>
            <h1>Welcome to TurnoMaster</h1>
            <p>This is the index page.</p>
        </div>

    );
};

export default Index;