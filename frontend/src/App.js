import './App.css';
import ImageComponent from './components/ImageComponent';
import TopBar from './components/TopBar';
import FooterComponent from './components/FooterComponent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React from "react";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        error: null,
        popup: false,
        popuperror: false,
        objects: [],
        bids:[],
        bidhighest: [],
    };

      this.ObjectGet = this.ObjectGet.bind(this);
    }

    async componentDidMount() {
      await this.ObjectGet();
    }
    async handleError() {
      this.setState({popuperror: true});
    }
    async handlepopup() {
      this.setState({popup: true});
    }
    async handleClose() {
      this.setState({popup: false, popuperror: false});
    }

   
    
      async ObjectGet() {
        try {
            const result = await fetch('http://localhost:1234/auction');
            if (result.status === 200) {
                const objects = await result.json();
                console.log(objects);
                console.log("Objekte wurden geladen")
                this.setState({ objects });
            } else {
                throw Error("Keine Objekte gefunden!");
            }
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }
        this.setState({ isLoading: false });
        try {
          const result = await fetch('http://localhost:1234/bids');
            if (result.status === 200) {
                const bidnormal = await result.json();
                const bids = bidnormal.reverse();
                console.log(bids);
                console.log("Gebote wurden geladen")
                this.setState({ bids });
            } else {
                throw Error("Keine Gebote gefunden!");
            }
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }
        this.setState({ isLoading: false });
        try {
          const result = await fetch('http://localhost:1234/bids/highest');
            if (result.status === 200) {
                const bidhighest = await result.json();
                console.log(bidhighest);
                console.log("Gebote wurden geladen")
                this.setState({ bidhighest });
            } else {
                throw Error("Keine Gebote gefunden!");
            }
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }
        this.setState({ isLoading: false });
      }


      async BidObject() {
        try {
          const result = await fetch("http://localhost:1234/bid", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ 
              "nutzer" : 11
            }),
        });
       console.log(result);
            if (result.status === 200) {
                console.log("erfolgreich")
            } else {
                throw Error("Interner Server Fehler.");
            }
        } catch (error) {
            console.log(error);
            this.setState({error});
        }
        this.setState({isLoading: false});
        }

    render() {
      const { err, isLoading, objects, bids, bidhighest} = this.state;
      if (err) {
          return <div>Sorry, etwas ist schiefgelaufen!</div>;
      } else if (isLoading) {
          return <div>Loading....</div>;
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
                  <p className="headline">AKTUELLES GEBOT: {bidhighest.score} €</p>
                <Button  onClick={() => this.BidObject()} className="button1">Jetzt {bidhighest.score + 500} € bieten</Button><br/>
                <div className="description">
                  Restzeit: {objects.auktionszeit} <br/>
                  Starthöhe: {objects.starthöhe} € <br/>
                </div>
                <div className="rechtliches pt-2">
                  Rechtliche Hinweise: "Ihre Gebote bei dieser Auktion sind verbindlich und Sie sind rechtlich verpflichtet,
                  den Artikel zum gebotenen Preis zu erwerben, sollten Sie die Auktion gewinnen." 
                </div>
              </Col>

              <Col className="pt-4 pb-5 block-verlauf" lg={6} sm={12}>
                <p className="headline">Gebotsverlauf:</p>
                {bids.map((bid)=> (
                  <div className='description'>
                    {bid.value} bietet {bid.score} €
                    <div className="border border-1 border-secondary"></div>
                  </div>
                ))}
                  
                  
                
              </Col>
            </Row>
          <FooterComponent/>
        </div>
      );
    }
  }
}