import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Annonce from "@components/Annonce";

export default function AnnoncePage() {
  const router = useRouter();
  const { query: { id } } = router;

  const [formData, setFormData] = useState({ titre: '', date_de_creation: null, date_de_modification: null, archive: null, date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', profession: [] });

  useEffect(() => {
    // Faire une requête au backend pour obtenir les détails de l'annonce en utilisant le slug
    fetch('http://localhost:3000/annonces/' + id)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const { titre, date_de_creation, date_de_modification, archive, date_de_publication, date_de_debut, date_de_fin, adresse, code_postal, ville, description, profession } = data.annonce;

          setFormData({ titre, date_de_creation, date_de_modification, archive, date_de_publication, date_de_debut, date_de_fin, adresse, code_postal, ville, description, profession });
        };
      });
  }, [id]);

  return (
    <>
      {
        formData ?
          <Annonce props={formData} />
        :
          <p>Chargement...</p>
      }
    </>
  );
}
