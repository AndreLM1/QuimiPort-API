import type { CargaQuimica  } from "@/domain/entities/carga-quimica.js"; 

export interface CargaQuimicaRepository{
   // Método para registrar uma carga
   registrar(cargaQuimica: CargaQuimica):Promise<CargaQuimica>;
   findAll(): Promise<CargaQuimica[]>;
   findById(id: number): Promise<CargaQuimica | undefined>;
   atualizar(cargaQuimica: CargaQuimica): Promise<CargaQuimica | undefined>;
   atualizarStatus(cargaQuimica: CargaQuimica): Promise<CargaQuimica | undefined>;
}