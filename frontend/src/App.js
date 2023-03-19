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
          <div className='pt-5'></div>
            <Row>
            
              <Col className="pt-5 pb-5 block" lg={6} sm={12}>
                <p className="headline">Was wird versteigert:</p>
                  <div className='description'>
                    Objektart: {objects.name} <br/>
                    Qualifikation: <br/>
                    Kurzbeschreibung: <br/>
                    Zustand: <br/>
                    Mindestpreis: <br/>
                  </div>
              </Col>
            
              <Col className="pt-5 pb-5 block" lg={6} sm={12}>
                <p className="headline">AKTUELLES GEBOT</p>
                <Button className="button1">Jetzt 100 € bieten</Button><br/>
                <p className="pt-4 description">Restzeit: 10:00:00</p>
                <p className='description'>Aktueller Meistbietender: </p>
              </Col>
            </Row>
          <FooterComponent/>
        </div>
      );
    }
  }
}