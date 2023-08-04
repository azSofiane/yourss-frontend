import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfilEleve from '../../components/ProfilEleve';

function ProfilEleve() {
  const router = useRouter();
  const { token } = router.query;
  const [eleve, setEleve] = useState(null);

  useEffect(() => {
    // Fonction pour effectuer la requête vers le backend et récupérer les informations de l'élève
    const fetchEleveData = async () => {
        const response = await fetch(`/api/eleves/${token}`);
        const data = await response.json();
        setEleve(data); // Mettre à jour l'état "eleve" avec les données de l'élève
    };

    // Appeler la fonction pour récupérer les données de l'élève lorsque le composant est monté
    fetchEleveData();
  }, [token]); // Le useEffect sera exécuté à chaque changement du token dans l'URL

  return (
    <div>
      <h1>Profil de l'élève</h1>
      {eleve ? (
        <>
          <p>Nom : {eleve.nom}</p>
          <p>Prénom : {eleve.prenom}</p>
          {/* Affichez d'autres informations de l'élève ici */}
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default ProfilEleve;

