import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';

import IndexPage from './Pages/index';

function App() {
    return (
        <IndexPage />
    );
}

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
