﻿import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [typyZgloszen, setTypyZgloszen] = useState([]);
    const [klasyZgloszen, setKlasyZgloszen] = useState([]);
    useEffect(() => {
        const fetchTypyIKlasy = async () => {
            try {
                const typyRes = await axios.get('http://localhost:5000/api/TypyZgloszen');
                const klasyRes = await axios.get('http://localhost:5000/api/KlasyZgloszen');
                setTypyZgloszen(typyRes.data);
                setKlasyZgloszen(klasyRes.data);
            } catch (error) {
                console.error('Error loading types and classes:', error);
            }
        };

        fetchTypyIKlasy();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:5000/api/Zgloszenia', {
                ...formData,
                idTypZgloszenia: parseInt(formData.idTypZgloszenia),
                idKlasaZgloszenia: parseInt(formData.idKlasaZgloszenia),
                numerBudynku: parseInt(formData.numerBudynku),
                numerMieszkania: parseInt(formData.numerMieszkania)
            });
            console.log('Submit successful:', response.data);
            // Resetowanie formularza lub inne działania po zatwierdzeniu
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            // Dodano obsługę sytuacji, gdy response jest undefined
        }
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
                    name="idTypZgloszenia"
                    value={formData.idTypZgloszenia}
                    onChange={handleInputChange}
                    style={styles.input}
                >
                    <option value="">Wybierz typ zgłoszenia</option>
                    {typyZgloszen.map(typ => (
                        <option key={typ.id} value={typ.id}>{typ.nazwaTypu}</option>
                    ))}
                </select>
                <select
                    name="idKlasaZgloszenia"
                    value={formData.idKlasaZgloszenia}
                    onChange={handleInputChange}
                    style={styles.input}
                >
                    <option value="">Wybierz klasę zgłoszenia</option>
                    {klasyZgloszen.map(klasa => (
                        <option key={klasa.id} value={klasa.id}>{klasa.klasa_zgloszenia}</option>
                    ))}
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
