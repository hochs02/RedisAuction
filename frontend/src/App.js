import './App.css';
import ImageComponent from './components/ImageComponent';
import TopBar from './components/TopBar';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div className="App">
      <TopBar/>
      <ImageComponent/>
      <FooterComponent/>
    </div>
  );
}

export default App;
