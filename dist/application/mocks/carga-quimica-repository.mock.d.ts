import type { CargaQuimicaRepository } from "../ports/out/carga-quimica-repository.js";
export declare const registrarMock: import("jest-mock").Mock<(cargaQuimica: import("../../domain/entities/carga-quimica.js").CargaQuimica) => Promise<import("../../domain/entities/carga-quimica.js").CargaQuimica>>;
export declare const findAllMock: import("jest-mock").Mock<() => Promise<import("../../domain/entities/carga-quimica.js").CargaQuimica[]>>;
export declare const findByIdMock: import("jest-mock").Mock<(id: number) => Promise<import("../../domain/entities/carga-quimica.js").CargaQuimica | undefined>>;
export declare const alterarMock: import("jest-mock").Mock<(cargaQuimica: import("../../domain/entities/carga-quimica.js").CargaQuimica) => Promise<import("../../domain/entities/carga-quimica.js").CargaQuimica | undefined>>;
export declare const atualizarStatusMock: import("jest-mock").Mock<(cargaQuimica: import("../../domain/entities/carga-quimica.js").CargaQuimica) => Promise<import("../../domain/entities/carga-quimica.js").CargaQuimica | undefined>>;
export declare const cargaQuimicaRepositoryMock: CargaQuimicaRepository;
//# sourceMappingURL=carga-quimica-repository.mock.d.ts.map