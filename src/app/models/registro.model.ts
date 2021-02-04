export class Registro {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor( format: string, text: string) {

        this.format = format;
        this.text = text;

        this.created = new Date();
        this.determinarTipo();

    }

    private determinarTipo() {
        const InicioTexto = this.text.substr(0, 4);
        console.log('TIPO', InicioTexto );

        switch ( InicioTexto ) {
            case 'http':
                this.type = 'http';
                this.icon = 'globe';
                break;

            default:
                this.type = 'No configurado';
                this.icon = 'create';
                break;
        }
    }
}
