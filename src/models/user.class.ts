export class User {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    birthDate!: number;
    street!: string;
    zipCode!: number;
    city!: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : 0;
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : 0;
        this.city = obj ? obj.city : '';
    }

    public getCleanJson(user: User): {} {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthDate: user.birthDate,
            street: user.street,
            zipCode: user.zipCode,
            city: user.city
        }
    }

    public formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate sind 0-basiert
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }


    public setUserObject(user: any, id: any): User {
        return new User({
            id: id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthDate: this.formatDate(user.birthDate),
            street: user.street,
            zipCode: user.zipCode,
            city: user.city
        });
    }
}
