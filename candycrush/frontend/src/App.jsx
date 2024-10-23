// client/src/App.jsx
import React from 'react';
import GameBoard from './components/GameBoard.jsx'; // Ensure the path is correct

const App = () => {
    return (
        <div className="App">
            <h1>Candy Crush Clone</h1>
            <GameBoard /> {/* Use GameBoard without userId since we are using a default user */}
        </div>
    );
};

export default App;
