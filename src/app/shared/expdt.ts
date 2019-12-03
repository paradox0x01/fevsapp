export interface Expediteur {
    _id: any;
    villeDepart: string;
    jourDepart: Date;
    villeArrivee: string;
    jourArrivee: Date;
    typeColis: string;
    nbreKilo: number;
    montantExpediteur: number;
    nom_prenoms: string;
    dateNaissance: Date;
    addresse: string;
    email: string;
    telephone: string;
}
