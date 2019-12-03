export interface Colis {
    _id: string;
    expediteur: string;
    voyageur: string;
    jourDepart: Date;
    jourArrivee: Date;
    heureArrivee: Date;
    status: string;
}
