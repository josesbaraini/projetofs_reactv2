import React, { useState } from 'react';
import { useEventoHoje } from '../hooks/useEventoHoje';

function TestComponent() {
    const {
        dataHoje,
        getAllTreinos, // TODO: MODIFICAR DEPOIS - FUNÇÃO DE TREINOS
        getAllEventos,
        verificarECriarNotificacoes,
        testarFuncoes
    } = useEventoHoje();

    const [userId, setUserId] = useState(2);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // TODO: MODIFICAR DEPOIS - TESTE DE TREINOS
    // const handleTestTreinos = async () => {
    //     setLoading(true);
    //     try {
    //         const treinos = await getAllTreinos(userId);
    //         setResults({ type: 'treinos', data: treinos });
    //         console.log('Treinos result:', treinos);
    //     } catch (error) {
    //         console.error('Error testing treinos:', error);
    //         setResults({ type: 'error', data: error.message });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleTestEventos = async () => {
        setLoading(true);
        try {
            const eventos = await getAllEventos(userId);
            setResults({ type: 'eventos', data: eventos });
            console.log('Eventos result:', eventos);
        } catch (error) {
            console.error('Error testing eventos:', error);
            setResults({ type: 'error', data: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleTestNotificacoes = async () => {
        setLoading(true);
        try {
            const result = await verificarECriarNotificacoes(userId);
            setResults({ type: 'notificacoes', data: result });
            console.log('Notificações result:', result);
        } catch (error) {
            console.error('Error testing notificações:', error);
            setResults({ type: 'error', data: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleTestAll = async () => {
        setLoading(true);
        try {
            const result = await testarFuncoes(userId);
            setResults({ type: 'all', data: result });
            console.log('All test result:', result);
        } catch (error) {
            console.error('Error testing all:', error);
            setResults({ type: 'error', data: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Test Component - useEventoHoje Hook</h2>

            <div style={{ marginBottom: '20px' }}>
                <label>
                    User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </label>
                <p>Today's date: {dataHoje}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                {/* TODO: MODIFICAR DEPOIS - BOTÃO DE TESTE DE TREINOS */}
                {/* <button 
                    onClick={handleTestTreinos}
                    disabled={loading}
                    style={{ marginRight: '10px', padding: '10px' }}
                >
                    {loading ? 'Loading...' : 'Test Treinos'}
                </button> */}

                <button
                    onClick={handleTestEventos}
                    disabled={loading}
                    style={{ marginRight: '10px', padding: '10px' }}
                >
                    {loading ? 'Loading...' : 'Test Eventos'}
                </button>

                <button
                    onClick={handleTestNotificacoes}
                    disabled={loading}
                    style={{ marginRight: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    {loading ? 'Loading...' : '🔔 Verificar Notificações'}
                </button>

                <button
                    onClick={handleTestAll}
                    disabled={loading}
                    style={{ padding: '10px' }}
                >
                    {loading ? 'Loading...' : 'Test All'}
                </button>
            </div>

            {results && (
                <div style={{
                    border: '1px solid #ccc',
                    padding: '15px',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3>Results ({results.type}):</h3>
                    <pre style={{
                        backgroundColor: '#fff',
                        padding: '10px',
                        borderRadius: '3px',
                        overflow: 'auto',
                        maxHeight: '400px'
                    }}>
                        {JSON.stringify(results.data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default TestComponent; 