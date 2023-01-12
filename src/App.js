import './App.css';
import HeaderHome from './component/Header/HeaderHome';
import { Outlet } from 'react-router-dom';
import FooterHome from './component/Footer/FooterHome';

function App() {
  return (
    <div className="App">
      <HeaderHome />
      <Outlet />
      <FooterHome />
    </div>
  );
}

export default App;
