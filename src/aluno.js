import conexao from "./banco.js";  //importando a conexao com o banco de dados

/* CRIANDO FUNÇÕES */
//Função ler: vai ler os alunos do bancode dados (no momento inicial não temos nenhum);
function ler (res){
    const sql = "SELECT * FROM alunos ORDER BY nome";
    conexao.query(sql, (erro, resultados) =>{

        //verificando se ha erro, e caso positivo apresenta o erro. define o status para 400 (bad request)
        //e apresenta o codigo do erro no formato json
       if (erro) {
            res.status(404).json(erro.code);
            return;
       } 

       //verifica se tem registro no banco de dados caso nao tenha, define o status para 204(sem conteudo)
       if(resultados === 0){
        res.status(204).end();
        return;
       }
       //defie o status como 200 (OK) e exibe os resultados 
       res.status(200).json(resultados);
    })
}

//inserir alunos no banco de dados
function inserir(aluno, res){
    const sql = "INSERT INTO alunos SET ?";  //O MySql2 com o "SER ?" faz com que o mysql entenda todos os dados recebidos
                                             // serão atribuidos na ordem enviada, aos campos da tabela alunos
    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code);
        } else{
            res.status(201).json({"status" : "aluno inserido"}) /* alem de responder com status 201, adicionamos uma mensagem para confirmar o usuario
                                                                   foi inserido no banco de dados */
        }
    })
}

//exibindo UM aluno
function lerUm(id, res){
    const sql = "SELECT * FROM alunos WHERE id= ?";

    conexao.query(sql, id, () => {
        
    })
}

function atualizar(id, aluno, res){
    const sql = "UPDATE alunos SET ? WHERE id = ?";
    
    /*  como estamos passando 2 parametros - pela primeira vez - precisa ser dentro de uma array.
    A ordem importa, precisamos resaltar a ordem da linha sql acima. */
    conexao.query(sql, [aluno, id], (erro, resultados) =>{
        if(erro){
            res.status(400).json(erro.code);
        }else {
            res.status(200).json({"status" : "aluno atualizado com sucesso"});
        }
    });

}

function excluir(id, res){
    const sql = "DELETE FROM alunos WHERE id = ?";
    
    conexao.query(sql, id, (erro, resultados) =>{
        if(erro){
            res.status(400).json(erro.code);
        }else {
            res.status(200).json({"status" : "estudante excluido com sucesso"})
        }
    })

}

export {ler, inserir, lerUm, atualizar, excluir};


