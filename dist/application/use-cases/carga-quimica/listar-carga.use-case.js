export class ListarCargaQuimicaUseCase {
    cargaQuimicaRepository;
    constructor(cargaQuimicaRepository) {
        this.cargaQuimicaRepository = cargaQuimicaRepository;
    }
    async execute() {
        return await this.cargaQuimicaRepository.findAll();
    }
}
//# sourceMappingURL=listar-carga.use-case.js.map