import styles from '@styles/Home.module.scss';
import { useState } from 'react';
import { Row, Col, Card, Input, Select, Button, Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { stockToken } from '../reducers/user';

function Home() {
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    fonction: '',
  });

  const mdpOublie = () => {
    return <>
      <p>Veuillez renseigner votre adresse e-mail pour réinitialiser votre mot de passe</p>

      <Space direction='vertical' className='w-100 text-center' size={12}>
        <Input placeholder='Email' size='large' />
        <Button type='default' size='large' onClick={() => réinitialisationMDP()}>Valider</Button>
      </Space>
    </>
  }

  //creation du compte eleve
  const handleSignup = () => {
    const userData = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      mot_de_passe: formData.mot_de_passe,
      fonction: formData.fonction,
    };
    fetch('http://localhost:3000/eleves/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Si l'inscription est réussie et que le backend renvoie un token
        if (data && data.token) {
        // Stockez le token dans le Redux store
          dispatch(stockToken(data.token));
          setFormData({...formData, nom:(''), prenom:(''), email:(''), mot_de_passe:(''), fonction:('')})
          // setFormData({ ...formData, nom:('')});
        }
       
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error('Error:', error);
      });
  };
  const creationCompte = () => {
    const réinitialisationMDP = () => {
      setModal(false)
    }

    return <>
      <p>Veuillez renseigner vos informations personnelles</p>

      <Space direction='vertical' className='w-100' size={12}>
        <Row gutter={[12, 12]}>
          <Col span={12}><Input placeholder='Nom' size='large' 
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}/></Col>
          <Col span={12}><Input placeholder='Prénom' size='large' 
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}/></Col>
          <Col span={24}><Input placeholder='Email' size='large' 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}/></Col>

          <Col span={24}><Input.Password placeholder='Mot de passe' size='large' 
          value={formData.mot_de_passe}
          onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}/></Col>

          <Col span={24}>
            <Select placeholder='Fonction' className='w-100' size='large'
             value={formData.fonction}
             onChange={(value) => setFormData({ ...formData, fonction: value })}>
              <Option value="true">Eleve</Option>
              <Option value="false">Professionnel</Option>
            </Select>
          </Col>
          <Col span={24} className='text-center'><Button type='default' size='large' onClick={() =>handleSignup() } >Valider</Button></Col>
        </Row>
      </Space>
    </>
  }

  const clickModalOpen = (data) => {
    setModal(true)
    setModalOpen(data)
  }



  return (
    <>
      <main>
       <section className={styles.section_connection}>
        <div className='container'>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12} className={styles.wrapCenter}>
              <img src='img/logo.svg' alt='logo yours' className={styles.logo} />
            </Col>

            <Col span={24} md={12} className={styles.wrapCenter}>
              <Card className={styles.wrapConnection}>
                <Space size={24} direction='vertical' className='w-100'>
                  <Space direction='vertical' className='w-100 text-center'>
                    <Input placeholder='Email' size='large'/>
                    <Input placeholder='Mot de passe' size='large'/>

                    <Button type='default' size='large' className='w-100'>Se connecter</Button>
                    <Button type='link' onClick={ () => clickModalOpen(true)}>Mot de passe oublié ?</Button>
                  </Space>

                  <Space direction='vertical' className='w-100 text-center'>
                    <Button type='success' size='large' onClick={() => clickModalOpen(false) }>Créer un compte</Button>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
       </section>
      </main>

      <Modal footer={null} centered open={modal} onCancel={() => setModal(false)} wrapClassName={styles.modal} title={modalOpen ? 'Réinitialisation mot de passe' : 'Créer un compte'}>{ modalOpen ? mdpOublie() : creationCompte() }</Modal>
    </>
  )

  }
export default Home;
