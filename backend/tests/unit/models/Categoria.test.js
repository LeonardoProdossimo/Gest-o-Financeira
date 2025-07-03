const Categoria = require('../../../model/Categoria');

describe('Modelo Categoria', () => {
    test('deve criar uma instância válida da Categoria com ativo true', () => {
        const categoria = new Categoria(1, 'Alimentação', '#FF0000', 1);
        
        expect(categoria.idcategoria).toBe(1);
        expect(categoria.descricao).toBe('Alimentação');
        expect(categoria.cor).toBe('#FF0000');
        expect(categoria.ativo).toBe('true');
    });

    test('deve criar uma instância válida da Categoria com ativo false', () => {
        const categoria = new Categoria(2, 'Transporte', '#00FF00', 0);
        
        expect(categoria.idcategoria).toBe(2);
        expect(categoria.descricao).toBe('Transporte');
        expect(categoria.cor).toBe('#00FF00');
        expect(categoria.ativo).toBe('false');
    });

    test('deve criar uma instância com valores nulos', () => {
        const categoria = new Categoria(null, null, null, null);
        
        expect(categoria.idcategoria).toBeNull();
        expect(categoria.descricao).toBeNull();
        expect(categoria.cor).toBeNull();
        expect(categoria.ativo).toBe('false');
    });

    test('deve converter ativo 1 para string true', () => {
        const categoria = new Categoria(1, 'Teste', '#000000', 1);
        expect(categoria.ativo).toBe('true');
    });

    test('deve converter ativo 0 para string false', () => {
        const categoria = new Categoria(1, 'Teste', '#000000', 0);
        expect(categoria.ativo).toBe('false');
    });
}); 