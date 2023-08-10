import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfilEleve from '@components/ProfilEleve'
import { useSelector} from "react-redux";
export default function ProfilPage() {
  const router = useRouter();
  const { query: { token } } = router;

  const  user = useSelector((state) => state.user);

  const [formData, setFormData] = useState(null);

 useEffect(() => {
// Faire une requête au backend pour obtenir les détails de l'annonce en utilisant le slug
    fetch("http://localhost:3000/eleves/02/" + token) 
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
      const { nom, prenom, photos, date_de_naissance, etablissement, presentation, motivation, ville, code_postal, disponible, date_de_debut, date_de_fin, ma_recherche_de_stage, mot_cle } = data.eleves;
     
      

      setFormData({ nom, prenom, photos, date_de_naissance, etablissement, presentation, motivation, ville, code_postal, disponible, date_de_debut, date_de_fin, ma_recherche_de_stage, mot_cle,});
    }
  });
// }
  }, [token]);
  return (
    <>
    {
      user.fonction === 'false' ?

      (formData ?
        <ProfilEleve token={token} props={formData}/>
        :
        <p> Chargement ...</p>
      )
      :
      //Todo insertion de la page 404
      <div>page 404</div>
    }
  </>
  );
}