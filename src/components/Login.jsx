import '../styles/Login.css';
import { useState } from 'react';
import props from 'prop-types';

function Login({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        if (username === "") {
            alert("Veuillez entrer un nom d'utilisateur");
            return;
        } 

        if (password === "" || password.length < 3) {
            alert("Veuillez entrer un mot de passe d'au moins 3 caractères");
            return;
        }

        try {
            const response = await fetch('http://193.108.54.49:8080/utgCheckLogin', {
                method: "POST",
                body: JSON.stringify({
                    username: username, 
                    password: password,}),
                headers: {
                    "Content-Type": "application/json", charset: "utf-8",
                },
            });
            const data = await response.json();

            if (!data.strErrorInfo) {
                onLogin(data);
            } else {
                alert('Compte inexistant !');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='m-6'> 
            <h1 className='my-4 has-text-weight-bold is-size-2'>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="field">
                    <label className="label" htmlFor="Login">Utilisateur</label>
                    <div className="control has-icons-left">
                        <input 
                            className='input is-medium'
                            type="text"
                            placeholder='Entrez votre nom'
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />        
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>
                </div>
        
                <div className="field">
                    <label className="label" htmlFor="Password">Mot de passe</label>
                    <div className="control has-icons-left">
                        <input 
                            className='input is-medium'
                            type="password"
                            placeholder='Entrez votre mot de passe'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <button type="submit" className="button is-primary">Se connecter</button>
            </form>
        </div>
    );
}

Login.props = {
    onLogin: props.func.isRequired,
};

export default Login;