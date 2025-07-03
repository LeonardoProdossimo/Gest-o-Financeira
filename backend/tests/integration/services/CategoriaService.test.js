const CategoriaService = require('../../../service/CategoriaService');

// Mock da conexão
jest.mock('../../../conexao/Conexao', () => ({
    getConnection: jest.fn()
}));

// Mock do logger
jest.mock('../../../logger/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warning: jest.fn()
}));

describe('CategoriaService - Integração', () => {
    let mockConnection;

    beforeEach(() => {
        // Mock da conexão
        mockConnection = {
            query: jest.fn(),
            end: jest.fn()
        };
        
        const Conexao = require('../../../conexao/Conexao');
        Conexao.getConnection.mockResolvedValue(mockConnection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST - Criar categoria', () => {
        test('deve criar uma categoria válida', async () => {
            const categoria = {
                descricao: 'Alimentação',
                cor: '#FF0000',
                ativo: true
            };

            mockConnection.query.mockResolvedValue([{ insertId: 1 }]);

            const req = { body: categoria };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await CategoriaService.post(req, res);

            expect(mockConnection.query).toHaveBeenCalledWith(
                'INSERT INTO fn_categoria (descricao, cor, ativo) VALUES (?, ?, ?)',
                ['Alimentação', '#FF0000', 0]
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: 'ok'
            }));
        });

        test('deve retornar erro quando descrição está faltando', async () => {
            const categoria = {
                cor: '#FF0000',
                ativo: true
            };

            const req = { body: categoria };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CategoriaService.post(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Descrição, cor e ativo são obrigatórios.'
            }));
        });

        test('deve retornar erro quando cor está faltando', async () => {
            const categoria = {
                descricao: 'Alimentação',
                ativo: true
            };

            const req = { body: categoria };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CategoriaService.post(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Descrição, cor e ativo são obrigatórios.'
            }));
        });
    });

    describe('GET - Buscar categorias', () => {
        test('deve buscar todas as categorias', async () => {
            const mockRows = [
                { idcategoria: 1, descricao: 'Alimentação', cor: '#FF0000', ativo: 1 },
                { idcategoria: 2, descricao: 'Transporte', cor: '#00FF00', ativo: 1 }
            ];

            mockConnection.query.mockResolvedValue([mockRows]);

            const req = { query: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CategoriaService.get(req, res);

            expect(mockConnection.query).toHaveBeenCalledWith(
                'SELECT * FROM fn_categoria WHERE 1=1',
                []
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: expect.arrayContaining([
                    expect.objectContaining({
                        idcategoria: 1,
                        descricao: 'Alimentação',
                        cor: '#FF0000',
                        ativo: 'true'
                    }),
                    expect.objectContaining({
                        idcategoria: 2,
                        descricao: 'Transporte',
                        cor: '#00FF00',
                        ativo: 'true'
                    })
                ])
            }));
        });

        test('deve filtrar categorias por descrição', async () => {
            const mockRows = [
                { idcategoria: 1, descricao: 'Alimentação', cor: '#FF0000', ativo: 1 }
            ];

            mockConnection.query.mockResolvedValue([mockRows]);

            const req = { query: { descricao: 'Alimentação' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CategoriaService.get(req, res);

            expect(mockConnection.query).toHaveBeenCalledWith(
                'SELECT * FROM fn_categoria WHERE 1=1 AND descricao LIKE ?',
                ['%Alimentação%']
            );
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('deve filtrar categorias por ativo', async () => {
            const mockRows = [
                { idcategoria: 1, descricao: 'Alimentação', cor: '#FF0000', ativo: 1 }
            ];

            mockConnection.query.mockResolvedValue([mockRows]);

            const req = { query: { ativo: 'true' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CategoriaService.get(req, res);

            expect(mockConnection.query).toHaveBeenCalledWith(
                'SELECT * FROM fn_categoria WHERE 1=1 AND ativo = ?',
                [1]
            );
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
}); 