const Financeiro = require('../../../model/Financeiro');

describe('Modelo Financeiro', () => {
    test('deve criar uma instância válida do Financeiro', () => {
        const financeiro = new Financeiro(1, 'Salário', '2024-01-15', 1, 'ENTRADA', 5000.00, '2024-01-15');
        
        expect(financeiro.idfinanceiro).toBe(1);
        expect(financeiro.descricao).toBe('Salário');
        expect(financeiro.data).toBe('2024-01-15');
        expect(financeiro.idcategoria).toBe(1);
        expect(financeiro.tipo).toBe('ENTRADA');
        expect(financeiro.valor).toBe(5000.00);
        expect(financeiro.dataalteracao).toBe('2024-01-15');
    });

    test('deve criar uma instância com valores nulos', () => {
        const financeiro = new Financeiro(null, null, null, null, null, null, null);
        
        expect(financeiro.idfinanceiro).toBeNull();
        expect(financeiro.descricao).toBeNull();
        expect(financeiro.data).toBeNull();
        expect(financeiro.idcategoria).toBeNull();
        expect(financeiro.tipo).toBeNull();
        expect(financeiro.valor).toBeNull();
        expect(financeiro.dataalteracao).toBeNull();
    });

    test('deve criar uma instância com valores zerados', () => {
        const financeiro = new Financeiro(0, '', '2024-01-01', 0, 'SAIDA', 0, '2024-01-01');
        
        expect(financeiro.idfinanceiro).toBe(0);
        expect(financeiro.descricao).toBe('');
        expect(financeiro.data).toBe('2024-01-01');
        expect(financeiro.idcategoria).toBe(0);
        expect(financeiro.tipo).toBe('SAIDA');
        expect(financeiro.valor).toBe(0);
        expect(financeiro.dataalteracao).toBe('2024-01-01');
    });
}); 