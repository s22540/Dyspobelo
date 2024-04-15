import React, { useState } from 'react';

function Form() {
    const [formData, setFormData] = useState({
        imie: '',
        nazwisko: '',
        numerKontaktowy: '',
        ulica: '',
        numerBudynku: '',
        numerMieszkania: '',
        klasaZgloszenia: '',
        typZgloszenia: '',
        opisZdarzenia: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Tu bedzie przetwarzanie forma pozniej
    };

    const styles = {
        formContainer: {
            width: '50%',
            margin: '0 auto',
            backgroundColor: '#f2f2f2',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        },
        input: {
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
        },
        button: {
            padding: '10px 15px',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        },
        submitButton: {
            backgroundColor: '#4CAF50'
        },
        cancelButton: {
            backgroundColor: '#f44336'
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2>Wprowadź dane zgłoszenia</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="imie"
                    value={formData.imie}
                    onChange={handleInputChange}
                    placeholder="Imię"
                    style={styles.input}
                />
                <input
                    name="nazwisko"
                    value={formData.nazwisko}
                    onChange={handleInputChange}
                    placeholder="Nazwisko"
                    style={styles.input}
                />
                <input
                    name="numerKontaktowy"
                    value={formData.numerKontaktowy}
                    onChange={handleInputChange}
                    placeholder="Numer kontaktowy"
                    style={styles.input}
                />
                <input
                    name="ulica"
                    value={formData.ulica}
                    onChange={handleInputChange}
                    placeholder="Ulica"
                    style={styles.input}
                />
                <input
                    name="numerBudynku"
                    value={formData.numerBudynku}
                    onChange={handleInputChange}
                    placeholder="Numer budynku (opcjonalne)"
                    style={styles.input}
                />
                <input
                    name="numerMieszkania"
                    value={formData.numerMieszkania}
                    onChange={handleInputChange}
                    placeholder="Numer mieszkania (opcjonalne)"
                    style={styles.input}
                />
                <select
                    name="klasaZgloszenia"
                    value={formData.klasaZgloszenia}
                    onChange={handleInputChange}
                    style={styles.input}
                >
                    <option value="">Wybierz klasę zgłoszenia</option>
                    <option value="klasa1">Klasa 1</option>
                    <option value="klasa2">Klasa 2</option>
                </select>
                <select
                    name="typZgloszenia"
                    value={formData.typZgloszenia}
                    onChange={handleInputChange}
                    style={styles.input}
                >
                    <option value="">Wybierz typ zgłoszenia</option>
                    <option value="typ1">Typ 1</option>
                    <option value="typ2">Typ 2</option>
                </select>
                <textarea
                    name="opisZdarzenia"
                    value={formData.opisZdarzenia}
                    onChange={handleInputChange}
                    placeholder="Opis zdarzenia"
                    style={{ ...styles.input, height: '100px' }}
                />
                <div style={styles.buttonContainer}>
                    <button type="button" onClick={() => setFormData({})} style={{ ...styles.button, ...styles.cancelButton }}>Anuluj</button>
                    <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>Zatwierdź</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
