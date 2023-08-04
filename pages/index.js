import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Home from '@components/Home';
import ProfilEleve from '@components/ProfilEleve';
import ProfilProfessionnel from '@components/ProfilProfessionnel';

function Index() {
  // verifier (si l'utilisateur est connecté), si le token est valide puis rediriger automatiquement sur Profil
  const user = useSelector((state) => state.user);
  const [isToken, setIsToken] = useState(false);
  const [isFonction, setIsFonction] = useState();

  useEffect(() => {
    if (user.fonction !== null) {
      setIsFonction(user.fonction === 'true' ? 'eleves' : 'professionnels');
    }

    if (user.token) {
      fetch('http://localhost:3000/' + isFonction + '/' + user.token)
        .then(response => response.json())
        .then(data => data.result && setIsToken(true));
    }
  }, [isFonction, user.token]);

  if(isToken){
    if(user.fonction === 'true'){
      return <ProfilEleve />;
    } else {
      return <ProfilProfessionnel />;
    };
  } else {
    return <Home />;
  };
};

export default Index;
