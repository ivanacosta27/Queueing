import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

const Queue = () => {
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        // Initialize DataTable on mount
        const table = $('#playersTable').DataTable({
            paging: false,
            searching: false
        });

        // Cleanup on unmount
        return () => {
            table.destroy(); // Destroy DataTable on cleanup to avoid conflicts
        };
    }, []);

    // Update DataTable when players change
    useEffect(() => {
        const table = $('#playersTable').DataTable();
        table.clear(); // Clear existing data

        players.forEach((player, index) => {
            // Add player row
            table.row.add([
                player.name,
                `
                    <button class="btn btn-secondary btn-sm update-btn" data-index="${index}" ${player.gamesPlayed === 0 ? 'disabled' : ''}>-</button>
                    <span class="mx-2">${player.gamesPlayed}</span>
                    <button class="btn btn-secondary btn-sm update-btn" data-index="${index}">+</button>
                `,
                `<button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>`
            ]).draw();
        });

        // Attach event listeners for update and delete buttons
        $('.update-btn').off('click').on('click', function () {
            const index = $(this).data('index');
            const operation = $(this).text() === '+' ? 1 : -1; // Determine if it’s + or -
            updateGames(index, operation);
        });

        $('.delete-btn').off('click').on('click', function () {
            const index = $(this).data('index');
            deletePlayer(index);
        });
    }, [players]);

    const addPlayer = () => {
        if (playerName.trim()) {
            const newPlayer = { name: playerName.trim(), gamesPlayed: 0 };
            setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
            setPlayerName(''); // Clear the input field after adding the player
        }
    };

    const updateGames = (index, value) => {
        const updatedPlayers = players.map((player, idx) =>
            idx === index ? { ...player, gamesPlayed: Math.max(0, player.gamesPlayed + value) } : player
        );
        setPlayers(updatedPlayers);
    };

    const deletePlayer = (index) => {
        setPlayers(players.filter((_, idx) => idx !== index));
    };

    return (
        <div className="container mt-5">
            <h1>Queue</h1>

            {/* Textbox for inputting player name */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter player's name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addPlayer}>
                    Add Player
                </button>
            </div>

            <table id="playersTable" className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Games</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Rows will be dynamically added by DataTables */}
                </tbody>
            </table>
        </div>
    );
};

export default Queue;
