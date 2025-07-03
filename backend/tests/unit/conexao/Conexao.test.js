const Conexao = require('../../../conexao/Conexao');

// Mock do mysql2
jest.mock('mysql2/promise', () => ({
    createConnection: jest.fn()
}));

describe('Conexao', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('deve ser um singleton', () => {
        const conexao1 = require('../../../conexao/Conexao');
        const conexao2 = require('../../../conexao/Conexao');
        
        expect(conexao1).toBe(conexao2);
    });

    test('deve ter método getConnection', () => {
        const conexao = require('../../../conexao/Conexao');
        
        expect(typeof conexao.getConnection).toBe('function');
    });

    test('deve ter método initConnection', () => {
        const conexao = require('../../../conexao/Conexao');
        
        expect(typeof conexao.initConnection).toBe('function');
    });
}); 