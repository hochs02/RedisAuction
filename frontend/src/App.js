import './App.css';
import ImageComponent from './components/ImageComponent';
import TopBar from './components/TopBar';
import FooterComponent from './components/FooterComponent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <TopBar/>
      <ImageComponent/>
        <Row>
          <Col className="pt-5 ps-5 border border-2" lg={6} sm={12}>
            <p className="headline">Was wird versteigert:</p>
            Objektart: <br/>
            Qualifikation: <br/>
            Kurzbeschreibung: <br/>
            Zustand: <br/>
            Mindestpreis: <br/>
          </Col>
          <Col className="pt-5 ps-5 border border-2 block2" lg={6} sm={12}>
          <p className="headline">AKTUELLES GEBOT</p>
          <Button className="button">Jetzt 100 € bieten</Button><br/>
          <p className="pt-2">Restzeit: 10:00:00</p>
          </Col>
        </Row>
      <FooterComponent/>
    </div>
  );
}

export default App;
