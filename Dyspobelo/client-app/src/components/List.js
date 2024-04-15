import React, { useState } from 'react';

function List() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const styles = {
        container: {
            height: '400px',
            overflowY: 'scroll',
            margin: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f8f8f8'
        },
        searchInput: {
            width: '80%',
            align: 'center',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc'
        },
        searchContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    };

    return (
        <div>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Szukaj..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
            </div>
            <div style={styles.container}>
                <p>Element 1</p>
                <p>Element 2</p>
                <p>Element 3</p>
                <p>Element 4</p>
                <p>Element 5</p>
                <p>Element 6</p>
                <p>Element 7</p>
                <p>Element 8</p>
                <p>Element 9</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
                <p>Element 10</p>
            </div>
        </div>
    );
}

export default List;
