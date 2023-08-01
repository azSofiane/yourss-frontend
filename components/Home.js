import styles from '@styles/Home.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Input, Select, Button, Space, Modal } from 'antd';
import { login, logout, oubliemdp,reinitialisationmdp } from '@reducers/user';

function Home() {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const[signInEmail,setSignInEmail] = useState("")
  const[signInMot_de_passe,setSignInMot_de_passe] = useState("")
  const[resetMot_de_passe,setResetMot_de_passe] = useState("")
  const[reinitialisationMot_de_passe,setReinitialisationMot_de_passe] = useState("")

  const mdpOublie = () => {
    return <>
      <p>Veuillez renseigner votre adresse e-mail pour réinitialiser votre mot de passe</p>

      <Space direction='vertical' className='w-100 text-center' size={12}>
        <Input placeholder='Email' size='large' onChange={(e) => setResetMot_de_passe(e.target.value)} value={resetMot_de_passe}/>
        <Button type='default' size='large' onClick={() => handleMot_de_passeOublie()}>Valider</Button>
      </Space>
    </>
  }

  const creationCompte = () => {
    return <>
      <p>Veuillez renseigner vos informations personnelles</p>

      <Space direction='vertical' className='w-100' size={12}>
        <Row gutter={[12, 12]}>
          <Col span={12}><Input placeholder='Nom' size='large' /></Col>
          <Col span={12}><Input placeholder='Prénom' size='large' /></Col>
          <Col span={24}><Input placeholder='Email' size='large' /></Col>
          <Col span={24}><Input.Password placeholder='Mot de passe' size='large' /></Col>
          <Col span={24}>
            <Select placeholder='Fonction' className='w-100' size='large'>
              <Option value="true">Eleve</Option>
              <Option value="false">Professionnel</Option>
            </Select>
          </Col>
          <Col span={24} className='text-center'><Button type='default' size='large' onClick={() => réinitialisationMDP()}>Valider</Button></Col>
        </Row>
      </Space>
    </>
  }
  
  const clickModalOpen = (data) => {
    setModal(true)
    setModalOpen(data)
  }

  const réinitialisationMDP = () => {
    setModal(false)
  }

  // CONNECTION ENTRE BACK FRONT LOGIN (INPUT MODAL CONNEXION)
  const handleConnection = () => {
    fetch('http://localhost:3000/professionnels/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signInEmail, mot_de_passe: signInMot_de_passe }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({token: data.token})); // ce qui va être stocké dans le localstorage
          setSignInEmail('');
          setSignInMot_de_passe('');
        }
        console.log(data)
      });
  };

  // CONNECTION ENTRE BACK FRONT LOGIN (BOUTON DECONNEXION "PROFIL")
  const handleLogout = () => {
    dispatch(logout());
  };

  // todo - revoir la partie reinisialiser mot de passe
  // CONNECTION ENTRE BACK FRONT (BOUTON " DEMANDE DE REINITIALISATION DE MDP")
  const handleMot_de_passeOublie = () => {
    fetch('http://localhost:3000/reinisialisermdp/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resetMot_de_passe}),
    }).then(response => response.json())
      .then(data => {
        console.log(data)

        if (!data.result) {
          // todo - réaliser les effets de refus (message sur le frontend)
          return;
        }

        // todo - faire la partie changement de mot de passe
        // fetch('http://localhost:3000/professionnels/reset-password', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token: data.token}),
        // }).then(response => response.json())
        //   .then(data => {
        //      console.log('01', data)
        //      if (!data.result) {
        //       return;
        //     }
        //     setResetMot_de_passe('')
           
        //   });
      });
  };

  // CONNECTION ENTRE BACK FRONT ("REINITIALISATION DE MDP")
  // const handleReinitialisationMdp = () => {
  //   fetch('http://localhost:3000/professionnels/reset-password', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email: ReinitialisationMot_de_passe}),
  //   }).then(response => response.json())
  //     .then(data => {
  //       if (data.result) {
  //         dispatch(reinitialisationmdp({ email: ReinitialisationMot_de_passe, token: data.token }));
  //         setReinitialisationMot_de_passe('')
  //       }
  //       console.log(data)
  //     });
  // };

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
                    <Input placeholder='Email' size='large' onChange={(e) => setSignInEmail(e.target.value)} value={signInEmail}/>
                    <Input placeholder='Mot de passe' size='large' onChange={(e) => setSignInMot_de_passe(e.target.value)} value={signInMot_de_passe}/>

                    <Button type='default' size='large' className='w-100' onClick={() => handleConnection()}>Se connecter</Button>
                    <Button type='link' onClick={ () => clickModalOpen(true)}>Mot de passe oublié ?</Button>
                  </Space>

                  <Space direction='vertical' className='w-100 text-center'>
                    <Button type='success' size='large' onClick={ () => clickModalOpen(false)}>Créer un compte</Button>
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

export default Home
