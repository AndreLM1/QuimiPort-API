import type { InputAlterarCargaQuimica } from "@/application/dtos/alterar-carga-quimica.dto.js";
import type { CargaQuimicaRepository } from "@/application/ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "@/domain/entities/carga-quimica.js";
import { ResourceNotFoundError } from "@/application/errors/resource-not-found.error.js"

export class AtualizaCargaQuimicaUseCase {
    constructor(private readonly cargaQuimicaRepository: CargaQuimicaRepository) { }

    async execute(id: number, input: InputAlterarCargaQuimica): Promise<CargaQuimica> {
        const cargaEncontrada = await this.cargaQuimicaRepository.findById(id);

        if (!cargaEncontrada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrada`
            }, "ResourceNotFoundError");
        };

        cargaEncontrada.alterarDados(
            input.codigoCarga,
            input.quantidade,
            input.unidadeMedida,
            input.origem,
            input.destino,
            input.responsavelTecnico
        )

        const cargaAtualizada = await this.cargaQuimicaRepository.atualizar(cargaEncontrada)

        if (!cargaAtualizada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrado durante a alteração`
            }, "ResourceNotFoundError");
        }

        return cargaAtualizada;
    }

}