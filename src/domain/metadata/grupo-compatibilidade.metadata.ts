import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";

export const  GrupoCompatibilidadeDescricoes: Record<GrupoCompatibilidade, string> ={
    [GrupoCompatibilidade.x]: "Carregamento conjunto compatível",
    [GrupoCompatibilidade.a]: "Carregamento conjunto compatível com materiais e artigos 1.4 S",
    [GrupoCompatibilidade.b]: "Carregamento conjunto compatível entre produtos da Classe 1 e dispositivos salva vidas da Classe 9 (Nºs ONU 2990, 3072) e de segurança da Classe 9 (Nº ONU 3268).",
    [GrupoCompatibilidade.c]: "Carregamento conjunto compatível entre os dispositivos de segurança pirotécnicos da subclasse 1.4, o grupo de compatibilidade G (Nº ONU 0503) e os dispositivos de segurança de acionamento elétrico da classe 9 (Nº 3268)",
    [GrupoCompatibilidade.d]: "Carregamento conjunto compatível entre explosivos de demolição (com exceção do ONU " +
        " 0083, explosivos de demolição, tipo C) e nitrato de amônio (Nº. ONU 1942) e nitrato de amônio," +
        " fertilizante (nº ONU 2067), suspensão ou gel (nº ONU nº 3375) e nitrato de metais alcalinos e " +
        " nitratos de metais alcalinos-terrosos com a condição de que o conjunto seja considerado como " +
        " consistindo de explosivos de demolição da Classe 1 no que diz respeito à sinalização," +
        " separação, carregamento e carga máxima admissível. Os nitratos de metal alcalino incluem" +
        " nitrato de césio (ONU 1451), nitrato de lítio (ONU 2722), nitrato de potássio (ONU 1486)," + 
        " nitrato de rubídio (ONU 1477) e nitrato de sódio (ONU 1498). Os nitratos metálicos alcalinosterrosos incluem nitrato de bário (ONU 1446), nitrato de berílio (ONU 2464), nitrato de cálcio " +
        " (ONU 1454), nitrato de magnésio (ONU 1474) e nitrato de estrôncio (ONU 1507)."
}