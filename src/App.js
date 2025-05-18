import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'; 

function App() {
  const [tgUser, setTgUser] = useState(null);
  const [tgTheme, setTgTheme] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg) {
      tg.ready();
      console.log('Telegram WebApp is ready');

      // Example: Get user data (handle potential undefined initDataUnsafe)
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        setTgUser(tg.initDataUnsafe.user);
      } else {
        console.log('User data not available or not in expected format.');
        // Fallback or default user display
        setTgUser({ first_name: 'Guest', username: 'guest' }); 
      }

      // Example: Get theme parameters
      setTgTheme(tg.themeParams);

      // Example: Configure the main button
      tg.MainButton.setText('Click Me!');
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.showAlert('Main button was clicked!');
      });

      // Example: Expanding the app
      tg.expand();

    } else {
      console.error('Telegram WebApp SDK not found.');
    }

    // Clean up main button event listener when component unmounts
    return () => {
      if (tg && tg.MainButton.isVisible) {
        tg.MainButton.offClick(); // Remove specific listener if possible or all
        tg.MainButton.hide();
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {tgUser ? (
          <p>
            Hello, {tgUser.first_name || tgUser.username || 'User'}!
          </p>
        ) : (
          <p>Loading Telegram User Data...</p>
        )}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {tgTheme && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <p>Current Telegram Theme:</p>
            <pre style={{ textAlign: 'left', fontSize: '0.8em', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {JSON.stringify(tgTheme, null, 2)}
            </pre>
          </div>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p style={{ marginTop: '20px', fontSize: '0.9em' }}>
          Try clicking the main button at the bottom!
        </p>
      </header>
    </div>
  );
}

export default App;
