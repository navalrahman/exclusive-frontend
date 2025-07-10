import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '80px',  justifyContent: 'center', alignItems: 'center' }}>
            <div style={{  padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '100px' }}>404 Not Found </h1>

                <p style={{ textAlign: 'center' }}>Your visited page not found. You may go home page.</p>
                <div style={{textAlign:'center'}}>
                    <button onClick={() => navigate('/')}
                        style={{padding:'16px',border:'none',width:'25%',borderRadius:'6px', backgroundColor:'#DB4444', color:'white'}}
                        >
                        Back to home page</button>
                </div>
            </div>
        </div>
    )
}

export default Notfound
