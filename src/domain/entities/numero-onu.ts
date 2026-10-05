export class NumeroOnu{
    
    constructor(public  codigo: string ){    
        const apenasNumero = new RegExp('^[0-9]{4}$');
        /**
            ^ → início da string
            [0-9] → permite apenas dígitos de 0 a 9
            {4} → exige exatamente 4 ocorrências
            $ → fim da string
         */
        if(!apenasNumero.test(codigo) ){
            throw Error("Código Onu deve conter 4 digitos numéricos")
        }    
    }
}

