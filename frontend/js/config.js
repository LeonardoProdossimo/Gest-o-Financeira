// Configuração da API baseada no ambiente
const API_CONFIG = {
    // Detecta automaticamente se está em produção ou desenvolvimento
    getBaseUrl: function() {
        // Se estiver em produção (Render.com), usa a URL do deploy
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            // URL do seu deploy no Render.com - SUBSTITUA pela sua URL real
            return 'https://gest-o-financeira-2.onrender.com';
        }
        // Se estiver em desenvolvimento local
        return 'http://127.0.0.1:3333';
    },
    
    // Endpoints da API
    endpoints: {
        financeiro: '/financeiro/financeiro',
        financeiroEditar: '/financeiro/financeiroeditar',
        categorias: '/categorias/categoria',
        componentes: {
            categoria: '/componente/categoria',
            tipo: '/componente/tipo'
        }
    }
};

// Função helper para construir URLs completas
function getApiUrl(endpoint) {
    return API_CONFIG.getBaseUrl() + endpoint;
} 