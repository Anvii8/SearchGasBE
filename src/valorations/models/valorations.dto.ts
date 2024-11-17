import { ValorationsEntity } from "../entity/valoration.entity";

export class ValorationDTO {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    userName: string;
    userSurname: string;
    gasStationId: number;

    constructor(valoracion: ValorationsEntity){
        this.id = valoracion.id;
        this.rating = valoracion.rating;
        this.comment = valoracion.comment;
        this.createdAt = valoracion.createdAt;
        this.userName = valoracion.user.name;
        this.userSurname = valoracion.user.surname;
        this.gasStationId = valoracion.gasStation.id;
    }
}