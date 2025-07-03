const Response = require('../../../model/Response');

describe('Modelo Response', () => {
    test('deve criar uma resposta de sucesso', () => {
        const response = new Response(true, 'Operação realizada com sucesso');
        
        expect(response.success).toBe(true);
        expect(response.message).toBe('Operação realizada com sucesso');
    });

    test('deve criar uma resposta de erro', () => {
        const response = new Response(false, 'Erro na operação');
        
        expect(response.success).toBe(false);
        expect(response.message).toBe('Erro na operação');
    });

    test('deve criar uma resposta com mensagem vazia', () => {
        const response = new Response(true, '');
        
        expect(response.success).toBe(true);
        expect(response.message).toBe('');
    });

    test('deve criar uma resposta com valores nulos', () => {
        const response = new Response(null, null);
        
        expect(response.success).toBeNull();
        expect(response.message).toBeNull();
    });
}); 