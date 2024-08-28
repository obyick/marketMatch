require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3001;

// Configuração do CORS para permitir qualquer origem
app.use(cors());

// Conexão com o PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

// Modelo para a tabela 'Market'
const Market = sequelize.define('Market', {
    cnpj: {
        type: DataTypes.STRING(18),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    postcode: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {
    tableName: 'Market',
    timestamps: false
});

// Modelo para a tabela 'products'
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: false
});

// Modelo para a tabela 'users'
const User = sequelize.define('User', {
    cpf: {
        type: DataTypes.STRING(11),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    keyword: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: false
});

// Modelo para a tabela 'prices'
const Price = sequelize.define('Price', {
    cnpj_Market: {
        type: DataTypes.STRING(18),
        references: {
            model: Market,
            key: 'cnpj'
        },
        primaryKey: true
    },
    id_products: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        },
        primaryKey: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'prices',
    timestamps: false
});

// Modelo para a tabela 'product_lists'
const ProductList = sequelize.define('ProductList', {
    cpf_users: {
        type: DataTypes.STRING(11),
        references: {
            model: User,
            key: 'cpf'
        },
        primaryKey: true
    },
    id_products: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        },
        primaryKey: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'product_lists',
    timestamps: false
});

// Definindo as associações
Market.hasMany(Price, { foreignKey: 'cnpj_Market' });
Price.belongsTo(Market, { foreignKey: 'cnpj_Market' });

Product.hasMany(Price, { foreignKey: 'id_products' });
Price.belongsTo(Product, { foreignKey: 'id_products' });

User.hasMany(ProductList, { foreignKey: 'cpf_users' });
ProductList.belongsTo(User, { foreignKey: 'cpf_users' });

Product.hasMany(ProductList, { foreignKey: 'id_products' });
ProductList.belongsTo(Product, { foreignKey: 'id_products' });

module.exports = {
    Market,
    Product,
    User,
    Price,
    ProductList
};

app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Rota para buscar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Rota para buscar todos os products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar products:', error);
        res.status(500).json({ error: 'Erro ao buscar products' });
    }
});

// Rota para cadastrar um novo usuário
app.post('/cadastro', async (req, res) => {
    const { name, email, senha } = req.body;

    try {
        // Verificar se o email já está cadastrado
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Gerar o hash da senha
        const hashSenha = await bcrypt.hash(senha, 10);

        // Criar um novo usuário
        const novoUsuario = await Usuario.create({
            name: name.trim(),
            email: email.trim(),
            senha: hashSenha,
        });

        // Retornar uma resposta de sucesso
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

// Rota de autenticação
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    console.log('Requisição de login recebida');
    console.log('Email recebido:', email);

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        console.log('Usuário encontrado:', usuario);

        if (!usuario) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Removendo espaços em branco do início e fim da senha
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha.trim());

        console.log('Senha fornecida:', senha);
        console.log('Senha armazenada (hash):', usuario.senha.trim());
        console.log('Senha correta:', senhaCorreta);

        if (!senhaCorreta) {
            console.log('Senha inválida');
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Autenticação bem-sucedida
        console.log('Login bem-sucedido');
        res.json({ message: 'Login bem-sucedido', usuario: { id_usuario: usuario.id_usuario, name: usuario.name.trim(), email: usuario.email.trim() } });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
});

app.get('/calcular-preco', async (req, res) => {
    const { productsSelecionados } = req.query;
    console.log('Produtos Selecionados:', productsSelecionados);

    try {
        const products = await Price.findAll({
            where: { id_products: productsSelecionados.split(',') },
            include: [{ model: Market }]
        });

        console.log('Produtos Encontrados:', products);

        const MarketPrices = {};

        products.forEach(item => {
            const cnpj = item.Market.cnpj;
            const name = item.Market.name;
            if (!MarketPrices[cnpj]) {
                MarketPrices[cnpj] = { name, total: 0 };
            }
            MarketPrices[cnpj].total += item.price;
        });

        console.log('MarketPrices:', MarketPrices);

        const MarketMaisBarato = Object.keys(MarketPrices).reduce((a, b) =>
            MarketPrices[a].total < MarketPrices[b].total ? a : b
        );

        if (MarketMaisBarato) {
            const menorPreco = MarketPrices[MarketMaisBarato].total;
            const nameMarket = MarketPrices[MarketMaisBarato].name;
            console.log('Market Mais Barato:', nameMarket, 'Preço:', menorPreco);

            res.json({ MarketMaisBarato: nameMarket, menorPreco });
        } else {
            res.json({ MarketMaisBarato: null, menorPreco: null });
        }
    } catch (error) {
        console.error('Erro ao calcular o preço total:', error);
        res.status(500).json({ error: 'Erro ao calcular o preço total' });
    }
});


// Sincronize o modelo com o banco de dados
sequelize.authenticate().then(() => {
    console.log('Conectado ao banco de dados!');
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});