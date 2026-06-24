import alunos from "../data/alunos.js";

function validarId(id) {
  if(isNaN(id) || id === undefined || id === null){
    return false;
  }
  return Number.isInteger(id);
}

function listarAlunos(req, res) {
  res.status(200).json(alunos);
}

function listarMedias(req, res) {
  const medias = alunos.map(al => ({ nome: al.nome, media: (al.nota1 + al.nota2) / 2 }));
  res.status(200).json(medias); // faltava isso
}

function listarAprovados(req, res) {
  const medias = alunos.map(al => ({ nome: al.nome, media: (al.nota1 + al.nota2) / 2 }));
  const resultado = medias.map(al => ({ nome: al.nome, status: al.media >= 6 ? "aprovado" : "reprovado" }));
  res.status(200).json(resultado); // calcularMedia não existia
}



function buscarAlunoPorId(req, res) {
  const id = Number(req.params.id); // string vs number no find
  if (!validarId(id)) return res.status(400).json({"message": "id inválido" });
  const aluno = alunos.find(al => al.id === id);
  if (!aluno) return res.status(404).json({ "message": "aluno não encontrado" });
  res.status(200).json(aluno);
}

function validaAluno(aluno, res){
  if(!validarId(aluno.id)){
      res.status(400).json({"message":"falha ao criar aluno com id invalido"});
      return false;
    }
  if(aluno.nome === undefined || aluno.nome === null) {
    return false;
     res.status(400).json({"message":"falha ao criar aluno com nome invalido"});
  }
  if(aluno.ra === undefined || aluno.ra === null){ 
    return false;
    res.status(400).json({"message":"falha ao criar aluno com ra invalido"});
  }
  if(isNaN(aluno.nota1) || isNaN(aluno.nota1)) {
    return false;
     res.status(400).json({"message":"falha ao criar aluno com notas invalidas"});
  }
  if(typeof aluno.nota1 === 'string'){
    aluno.nota1 = parseFloat(aluno.nota1);
  }
  if(typeof aluno.nota2 === 'string'){
    aluno.nota2 = parseFloat(aluno.nota2);
  }
  return true;
}

function criarAluno(req, res) {
  const aluno = req.body;
  if(!validaAluno(aluno, res)) return;
  alunos.push(aluno);
  res.status(201).json(aluno);
}

function atualizarAluno(req, res) {
  const id = Number(req.params.id);
  let aluno = req.body;
  aluno = {"id":id, ...aluno};
  if(id != aluno.id){
    res.status(400).json({ message: "não é possivel mudar id de aluno" });
    return;
  }
  const alunoIndex = alunos.findIndex((al) => al.id === id);
  if (alunoIndex === -1) {
     res.status(404).json({ message: "aluno de id: " + id + " não encontrado" });
     return;
  }
  if (!validaAluno(aluno, res)) return;
  alunos[alunoIndex] = aluno;
  res.status(200).json(aluno);
}

function removerAluno(req, res) {
  const id = Number(req.params.id);
  if(!validarId(id)){
    res.status(400).json({"message":"id invalido"});
    return;
  }
  const indexAluno = alunos.findIndex((al)=> al.id === id);
  if(indexAluno === -1){
    res.status(404).json({"message":"falha ao deletar, aluno de id: "+ id +" não encontrado"});
    return;
  }
  alunos.splice(indexAluno, 1);
  res.status(200).json({"message":"aluno removido"});
  return;
}

// Exporta todas as funções do controlador para serem usadas nas rotas
// Não exporta funções auxiliares como validarId e calcularMedia, pois são internas ao controlador
export {
  listarAlunos,
  listarMedias,
  listarAprovados,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  removerAluno,
};
