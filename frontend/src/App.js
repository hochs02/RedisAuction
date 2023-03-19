import './App.css';
import ImageComponent from './components/ImageComponent';
import TopBar from './components/TopBar';
import FooterComponent from './components/FooterComponent';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:1234');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [objects, setObjects] = useState([]);
  const [bids, setBids] = useState([]);
  const [bidhighest, setBidHighest] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const objectResult = await fetch('http://localhost:1234/auction');
        if (objectResult.status === 200) {
          const objects = await objectResult.json();
          console.log(objects);
          console.log("Objekte wurden geladen")
          setObjects(objects);
        } else {
          throw Error("Keine Objekte gefunden!");
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }

      try {
        const bidResult = await fetch('http://localhost:1234/bids');
        if (bidResult.status === 200) {
          const bidnormal = await bidResult.json();
          const bids = bidnormal.reverse();
          console.log(bids);
          console.log("Gebote wurden geladen")
          setBids(bids);
        } else {
          throw Error("Keine Gebote gefunden!");
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }

      try {
        const highestBidResult = await fetch('http://localhost:1234/bids/highest');
        if (highestBidResult.status === 200) {
          const bidhighest = await highestBidResult.json();
          console.log(bidhighest);
          console.log("Gebote wurden geladen")
          setBidHighest(bidhighest);
        } else {
          throw Error("Keine Gebote gefunden!");
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }

      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("bid-did-change", (data) => {
      setBids(data)
    });
    socket.on("highest-bid-did-change", (data) =>{
      setBidHighest(data)
    })
  }, [socket]);

  
    const BidObject = () =>{
      
    socket.emit('bid-change');};
  

  async function hanBidObject() {
    try {
      const result = await fetch("http://localhost:1234/bid", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ "nutzer": 11 }),
      });
      console.log(result);
      if (result.status === 200) {
        console.log("erfolgreich")
      } else {
        throw Error("Interner Server Fehler.");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  }

  if (error) {
          return <div>Seite kann nicht geladen werden</div>;
      } else if (isLoading) {
          return <div>Seite lädt....</div>;
      } else {
      return (
        <div className="App">
          <TopBar/>
          <div className='pt-3'></div>
          <Row>
            <Col lg={6} sm={12}>
              <ImageComponent/>
            </Col>
            <Col className="pt-4 pb-5 block" xl={12} >
              <p className="headline">Was wird versteigert:</p>
                <div className='description'>
                  Objektart: "{objects.name}" <br/>
                  Kurzbeschreibung: "{objects.kurzbeschreibung}" <br/>
                  Zustand: "{objects.zustand}" <br/>
                  Herstellungsjahr: {objects.herstellungsjahr} a.d <br/>
                  Bemessung: {objects.bemessung}
                </div>
            </Col>
          </Row> 
          <div className='pt-3'></div>
          <Row className="pt-5 ps-5"> 
              <Col className="pt-4 pb-3 block-verlauf" xl={12} >
                <div className="bieten">
                    <p className="headline">AKTUELLES GEBOT: {bidhighest.score} €</p>
                  <Button  onClick={BidObject} id="Button" name="Button" className="button1">Jetzt {bidhighest.score + 500} € bieten</Button><br/>
                  <div className="description">
                    Restzeit: {objects.auktionszeit} <br/>
                    Starthöhe: {objects.starthöhe} € <br/>
                  </div>
                  <div className="rechtliches pt-2">
                    Rechtliche Hinweise: "Ihre Gebote bei dieser Auktion sind verbindlich und Sie sind rechtlich verpflichtet,
                    den Artikel zum gebotenen Preis zu erwerben, sollten Sie die Auktion gewinnen." 
                  </div>
                </div>
              </Col>

              <Col className="pt-4 pb-5 block-verlauf" lg={6} sm={12}>
                <p className="headline">Gebotsverlauf:</p>
                <div className="gebotsverlauf">
                  {bids.map((bid)=> (
                    <div className='description'>
                      {bid.value} bietet {bid.score} €
                      <div className="border border-1 border-secondary"></div>
                    </div>
                  ))} 
                </div>
              </Col>
            </Row>
          <FooterComponent/>
        </div>
      );
    }
  }