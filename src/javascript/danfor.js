const readline = require('readline');

let saldo = 1000.00;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function verSaldo() {
    console.log(`Saldo Atual: ${formatarMoeda(saldo)}`);
    exibirMenu();
}

function depositar(valor) {
    if (valor > 0) {
        saldo += valor;
        console.log(`\nDepósito de ${formatarMoeda(valor)} realizado com sucesso!`);
        verSaldo();
    } else {
        console.log('\nERRO: O valor do depósito deve ser positivo.');
        solicitarDeposito();
    }
}

function sacar(valor) {
    if (valor <= 0) {
        console.log('\nERRO: O valor do saque deve ser positivo.');
    } else if (valor > saldo) {
        console.log(`\nSaldo Insuficiente! Você tentou sacar ${formatarMoeda(valor)}, porém seu saldo é de ${formatarMoeda(saldo)}.`);
    } else {
        saldo -= valor;
        console.log(`\nSaque de ${formatarMoeda(valor)} realizado com sucesso!`);
    }
    exibirMenu();
}

function solicitarDeposito() {
    rl.question('Quanto você deseja DEPOSITAR? R$ ', (entrada) => {
        const valor = parseFloat(entrada.replace(',', '.'));
        
        if (isNaN(valor)) {
            console.log('\nEntrada Inválida. Digite um número.');
            solicitarDeposito();
        } else {
            depositar(valor);
        }
    });
}

function solicitarSaque() {
    rl.question('Quanto você deseja SACAR? R$ ', (entrada) => {
        const valor = parseFloat(entrada.replace(',', '.'));

        if (isNaN(valor)) {
            console.log('\nEntrada Inválida. Digite um número.');
            solicitarSaque();
        } else {
            sacar(valor);
        }
    });
}

function exibirMenu() {
    console.log('---------------- DANFOR ELETRÔNICO -----------------');
    console.log('1. Saldo');
    console.log('2. Depositar');
    console.log('3. Sacar');
    console.log('4. Sair');
    console.log('------------------------------------------------------');

    rl.question('Escolha uma opção (1-4): ', (opcao) => {
        switch (opcao.trim()) {
            case '1':
                verSaldo();
                break;
            case '2':
                solicitarDeposito();
                break;
            case '3':
                solicitarSaque();
                break;
            case '4':
                console.log('\nObrigado por utilizar nosso caixa eletrônico. A DANFOR agradece!\n');
                rl.close();
                break;
            default:
                console.log('\nOpção inválida. Escolha 1, 2, 3 ou 4.');
                exibirMenu();
                break;
        }
    });
}
exibirMenu();