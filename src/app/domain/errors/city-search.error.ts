export class CityHistoricError extends Error {
    constructor() {
        super('Nenhuma cidade pesquisada!');
        super.name = 'CityHistoricError';
    }
}