const request = require('supertest');
const express = require('express');
const CadastroFinanceiroService = require('../../../service/CadastroFinanceiroService');

// Mock da conexão
jest.mock('../../../conexao/Conexao', () => ({
    getConnection: jest.fn()
}));

// Mock do logger
jest.mock('../../../logger/Logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warning: jest.fn()
}));

describe('CadastroFinanceiroService - Integração', () => {
    let app;
    let mockConnection;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        
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

    describe('POST - Criar transação financeira', () => {
        test('deve criar uma transação válida', async () => {
            const transacao = {
                descricao: 'Salário',
                data: '2024-01-15',
                idcategoria: 1,
                tipo: 'ENTRADA',
                valor: 5000.00
            };

            mockConnection.query.mockResolvedValue([{ insertId: 1 }]);

            const req = { body: transacao };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CadastroFinanceiroService.post(req, res);

            expect(mockConnection.query).toHaveBeenCalledWith(
                'INSERT INTO fn_financeiro (descricao, data, idcategoria, tipo, valor) VALUES (?, ?, ?, ?, ?)',
                ['Salário', '2024-01-15', 1, 'ENTRADA', 5000.00]
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: 'ok'
            }));
        });

        test('deve retornar erro quando descrição está faltando', async () => {
            const transacao = {
                data: '2024-01-15',
                idcategoria: 1,
                tipo: 'ENTRADA',
                valor: 5000.00
            };

            const req = { body: transacao };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CadastroFinanceiroService.post(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Descrição, data, idcategoria, tipo e valor são obrigatórios.'
            }));
        });

        test('deve retornar erro quando valor está faltando', async () => {
            const transacao = {
                descricao: 'Salário',
                data: '2024-01-15',
                idcategoria: 1,
                tipo: 'ENTRADA'
            };

            const req = { body: transacao };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CadastroFinanceiroService.post(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Descrição, data, idcategoria, tipo e valor são obrigatórios.'
            }));
        });
    });

    describe('DELETE - Excluir transação financeira', () => {
        test('deve excluir uma transação válida', async () => {
            const req = { body: { idfinanceiro: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            mockConnection.query.mockResolvedValue([{ affectedRows: 1 }]);

            await CadastroFinanceiroService.delete(req, res);

            expect(mockConnection.query).toHaveBeenCalledWith(
                'DELETE FROM fn_financeiro WHERE idfinanceiro = ?',
                [1]
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: 'ok'
            }));
        });

        test('deve retornar erro quando idfinanceiro está faltando', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await CadastroFinanceiroService.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'idfinanceiro é obrigatório.'
            }));
        });
    });
}); 