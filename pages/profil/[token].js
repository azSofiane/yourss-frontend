import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfilEleve from '@components/ProfilEleve'

export default function ProfilPage() {
  const router = useRouter();
  const { query: { token } } = router;

  const [profilDetails, setProfilDetails] = useState({ nom: '', prenom: '', photos: '', date_de_naissance: '', etablissement: '', presentation: '', motivation: '', ville: '', code_postal: '', disponible: null, date_de_debut: null, date_de_fin: null, ma_recherche_de_stage: '', mot_cle: [] });

 useEffect(() => {
// Faire une requête au backend pour obtenir les détails de l'annonce en utilisant le slug
    fetch("http://localhost:3000/eleves/02/" + token) // Faire une requête au backend pour obtenir les détails de l'annonce en utilisant le slug
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setProfilDetails(data.result);
        
          console.log('mes data fetch',data.data)

          const { nom, prenom, photos, date_de_naissance, etablissement, presentation, motivation, ville, code_postal, disponible, date_de_debut, date_de_fin, ma_recherche_de_stage, mot_cle } = data.data;

          console.log('lahrim', nom)

          setProfilDetails({ nom:nom, prenom:prenom, photos:photos, date_de_naissance:date_de_naissance, etablissement:etablissement, presentation:presentation, motivation:motivation, ville:ville, code_postal:code_postal, disponible:disponible, date_de_debut: date_de_debut, date_de_fin:date_de_fin, ma_recherche_de_stage: ma_recherche_de_stage, mot_cle:mot_cle });
        }
      });
    // }
  }, [token]);

  return (
    <>
    {profilDetails ?
      <ProfilEleve props={profilDetails}/>
      :
      <p> Chargement ...</p>
    }
  </>
  );
}