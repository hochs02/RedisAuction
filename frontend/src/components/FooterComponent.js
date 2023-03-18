import React from 'react'
import { CDBBox } from 'cdbreact'
import './footer.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import whatsapp from '../images/componentimages/whatsapp_icon.png'
import facebook from '../images/componentimages/facebook_icon.png'
import instagram from '../images/componentimages/instagram_icon.png'
import twitter from '../images/componentimages/twitter_icon.png'
import linkedin from '../images/componentimages/linkedin_icon.png'

export default function FooterComponent () {
  return (

    <div className='footer'>
      <div className='shadow'>

        <CDBBox display='flex' flex='column' className='mx-auto pt-4' style={{ width: '90%' }}>
          <Row className='footercontentrow'>
            <CDBBox display='flex' justifyContent='between' className='flex-wrap'>
              
              <Col lg={3} sm={4} xs={6}>
                <CDBBox>
                  <p className='headline mb-2 pt-3'>
                    Informationen:
                  </p>
                  <CDBBox className='text' flex='column' display='flex'>
                    <div className='footerlink'>Über Uns</div>
                    <div className='footerlink'>Aktuelles</div>
                    <div className='footerlink'>Blog</div>
                  </CDBBox>
                </CDBBox>
              </Col>
              <Col lg={3} sm={4} xs={6}>
                <CDBBox>
                  <p className='headline mb-2 pt-3'>
                    Gesetziche Angaben:
                  </p>
                  <CDBBox className='text' display='flex' flex='column'>
                    <div className='footerlink'>Impressum</div>
                    <div className='footerlink'>Datenschutz</div>
                    <div className='footerlink'>Rechtliche Hinweise</div>
                  </CDBBox>
                </CDBBox>
              </Col>
              <Col lg={3} sm={4} xs={7}>
                <CDBBox>
                  <p className='headline mb-2 pt-3'>
                    Kontakt:
                  </p>
                  <CDBBox className='text' display='flex' flex='column'>
                    <span>Adresse: <a className='footerlink' href='https://www.google.de/maps/place/Heidenheim+an+der+Brenz/'> Musterstraße 1; <br /> 89518 Heidenheim an der Brenz</a></span> 
                    <span>Telefon: <a className='footerlink' href='tel:+49 123456789'> +49 123456789</a></span>
                    <span>E-Mail: <a className='footerlink' href='mailto:hoechstpreis@auktion.de'> hoechstpreis@auktion.de</a></span>
                  </CDBBox>
                </CDBBox>
              </Col>
            </CDBBox>
          </Row>
          <Row>
            <Col className='endfooter'>
              <a className='ps-3 pe-3' href='https://www.whatsapp.com/'>
                <img src={whatsapp} alt='WhatsApp' />
              </a>
              <a className='ps-3 pe-3' href='https://de-de.facebook.com/'>
                <img src={facebook} alt='Facebook' />
              </a>
              <a className='ps-3 pe-3' href='https://www.instagram.com/'>
                <img src={instagram} alt='Instagram' />
              </a>
              <a className='ps-3 pe-3' href='https://twitter.com/'>
                <img src={twitter} alt='Twitter' />
              </a>
              <a className='ps-3 pe-3' href='https://www.linkedin.com/'>
                <img src={linkedin} alt='LinkedIn' />
              </a>
            </Col>
          </Row>
          <small className='companytext text-center mt-5 pb-3'>&copy; Zum Höchspreis erworben Inc, 2022. All rights reserved.</small>
        </CDBBox>
      </div>
    </div>
  )
};
