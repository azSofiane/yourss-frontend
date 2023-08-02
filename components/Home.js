import styles from '@styles/Home.module.scss';
import { useState } from 'react';
import { Row, Col, Card, Input, Select, Button, Space, Modal } from 'antd';
import { login } from '@reducers/user';
import { stockToken } from '../reducers/user';

function Home() {
  // const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    fonction: '',
  });

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

  //creation du compte eleve
  const handleSignup = () => {
    const userData = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      mot_de_passe: formData.mot_de_passe,
      fonction: formData.fonction,
    };

    let signupUrl;

    // Vérifiez la valeur de "fonction" et définission de l'URL en conséquence
    if (formData.fonction === 'true') {
      signupUrl = 'http://localhost:3000/eleves/signup';
    } else {
      signupUrl = 'http://localhost:3000/professionnels/signup';
    }

    fetch(signupUrl, {
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
