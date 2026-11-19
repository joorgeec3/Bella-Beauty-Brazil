import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './theme-light.css'; // LIGHT THEME TEST — remove this line to go back

createRoot(document.getElementById('root')!).render(<App />);
