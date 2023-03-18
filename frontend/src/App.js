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
    };

      this.BidObject = this.BidObject.bind(this);
    }

    async componentDidMount() {
      await this.BidObject();
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

    async BidObject() {
      try {
        const result = await fetch("http://localhost:6666/bid", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ 
            "nutzer" : document.getElementById("shortHand").value,
            "betrag": document.getElementById("type").value,
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
    
      async ObjectGet() {
        try {
            const result = await fetch('http://localhost:6666/auction');
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
        
      }

    render() {
      const { err, isLoading, objects, popup, popuperror} = this.state;
      if (err) {
          return <div>Sorry, etwas ist schiefgelaufen!</div>;
      } else if (isLoading) {
          return <div>Loading....</div>;
      } else {
      return (
        <div className="App">
          <TopBar/>
          <ImageComponent/>
            <Row>
              <Col className="pt-5 ps-5 border border-2" lg={6} sm={12}>
                <p className="headline">Was wird versteigert:</p>
                {objects.map((object) => (
                  <div>
                    Objektart: {object.name}<br/>
                    Qualifikation: {object.starthöhe}<br/>
                    Kurzbeschreibung: <br/>
                    Zustand: <br/>
                    Mindestpreis: <br/>
                  </div>
                  
                ))}
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
  }
}