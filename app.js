//importando o express (instalando via terminal)
import express from 'express';
import {ler, inserir, lerUm, atualizar, excluir} from './src/aluno.js';

const app = express();
const porta = 3000;

//habilitando express para trabalhar com o formato JSON
app.use(express.json());

//habilitando express para trabalhar com o formato URL Encoded (formolario)
app.use(express.urlencoded({extended : true}) );

/*ROTAS */
//configurando para o inicio da aplicação 
app.get('/', function(req, res){
    res.send('API de alunos com nodeJS, express e MySQL')
}); 

// ROTA parta visuzalizar TODOS os alunos do banco
app.get('/alunos', (req, res) => {
    //res.send(`Dados de todos os alunos`)
    ler(res);
});

// ROTA/Endpoint para visualizar UM aluno
app.get('/alunos/:id', (req, res) =>{
    //res.send('Dados de um aluno qualquer')

    const id = parseInt (req.params.id);
   lerUm(id, res);
})

// Endpoint para inserir UM aluno no banco de dados
app.post('/alunos', (req, res) => {
     //res.send('Cadastrando um aluno.')

     //capturando os dados a partir do corpo da requisição (req)
     const novoAluno = req.body;
     inserir(novoAluno, res);
});

// Endpoint para ATUALIZAR TODOS OS DADOS de UM ALUNO
app.put('/alunos/:id', (req, res) => {
     res.send('Atualizando todos os dados de um aluno')
});

// Endpoint para ATUALIZAR ALGUNS OS DADOS de UM ALUNO
app.patch('/alunos/:id', (req, res) => {
    //res.send('Atualizar alguns dados de um aluno')
    const id = parseInt(req.params.id);
    const aluno = req.body;
    atualizar(id, aluno, res);
});

// Endpoint para DELETAR UM ALUNO 
app.delete('/alunos/:id', (req, res) => {
    //res.send('Deletar dados de um aluno')
    const id = parseInt(req.params.id);
    excluir(id,res);
});

/* SERVIDOR */
app.listen(porta, () =>{
    console.log(`Servidor ouvindo na porta ${porta}`); 
})



