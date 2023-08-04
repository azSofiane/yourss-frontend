import styles from "@styles/Model.module.scss";
import {
  Row,
  Col,
  Card,
  Avatar,
  DatePicker,
  Input,
  Select,
  Button,
  Space,
  Modal,
  
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function Annonce() {
  const test = false;

  

  return (
    <>
      <main>
        <div className="container">
          <Space direction="vertical" className="w-100" size={12}>
            <Row gutter={[12, 12]}>
              {/* Section 1 élève non editable */}
              <Col span={24}>
                <Card>
                  <Row gutter={[12, 12]}>
                    <Col span={24} md={4}>
                    <Avatar size={100} src={<img src={"https://cdn.britannica.com/01/236601-050-2CFDF711/Julia-Roberts-2019.jpg"} alt="Photo de profile"/>}/>
                    </Col>

                    <Col span={24} md={10}>
                      <div>Poste</div>
                      <div>Entreprise</div>
                      <div>Localisation</div>
                    </Col>

                    <Col span={24} md={10}>
                      <div>Date du stage</div>
                      <br></br>
                      <div><FontAwesomeIcon size={50} icon={faStar} style={{color: "#f2e12c",}} /></div>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Section 2 eleve non éditable*/}
              <Col span={24}>
                <div className="d-flex justify-content-end align-items-center">
                  <span>Postulé</span>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Postuler</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Contacter le professionnel</Button>
                </div>
              </Col>

              {/* Section 1 professionnel non éditable 
              boutton editer archiver et sauvgarder */}
              <Col span={24}>
                <div className="d-flex justify-content-end align-items-center">
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Editer</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Archiver</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Sauvegarder</Button>
                </div>
              </Col>
              {/* Section page annonce champs éditable*/}
              <Col span={24}>
                <Card>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>{ test ? <Input placeholder="Titre" size="large" /> : 'Titre' }</Col>
                    <Col span={24} size="large"  ><RangePicker size="large"/></Col>
                    <Col span={24}>{ test ? <Input placeholder="Poste" size="large" /> : 'Localisation' }</Col>
                    <Col span={24}>{ test ? <Input placeholder="Entreprise" size="large" /> : 'Profession' }</Col>
                    <Col span={24}> {test ? <TextArea rows={12} placeholder="Description du stage"/>: "Description du stage" } </Col>
                    <Col span={24}><Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Valider</Button></Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Space>
        </div>
      </main>
    </>
  );
}

export default Annonce;
