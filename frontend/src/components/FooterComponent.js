import './footer.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function FooterComponent(){
    return(
        <footer className="footer">
            <Row>
                <Col md={6} sm={6} className="footer-left">
                <h2>Meins zum Höchstpreis ;)</h2>
                </Col>
                <Col md={6} sm={6} className="footer-center">
                    <a href="https://www.google.de/maps/place/Heidenheim+an+der+Brenz/">
                        <p>Adresse: Heidenheim an der Brenz, DHBW-Str. 1</p>
                    </a>
                    <div className="pt-2">
                        <a href="tel:+49123456789" className="fa fa-phone">
                            <p>Telefon: +49 123456789</p>
                        </a>
                    </div>
                    <div className="pt-2">
                        <a  href="mailto:meinszumhoechstpreis@email.de">
                            <p>Email-Adresse: meinszumhoechstpreis@email.de</p>
                        </a>  
                    </div>
                </Col>
            </Row>
            
            <Col md={12} sm={12} className="footer-right">
                <p className="menu">
                Homepage | 
                Über Uns | 
                Services | 
                Impressum | 
                Datenschutz | 
                News
                </p>
                <p className="menu text-center"> Meins zum Höchstpreis &copy; 2023</p>
            </Col>
        </footer>
    );
};