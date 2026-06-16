const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'tasks.json');
const date = new Date();
const today = date.getMonth() + '/' + date.getDate();


// Verifica se o arquivo de tarefas existe, caso contrário, cria um novo arquivo vazio.
if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, '[]');
}

// As funções para manipular as tarefas são definidas aqui.
function addTask(task) {
    // Lê a lista atual de tarefas, adiciona a nova tarefa e salva novamente.
    const list = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    list.push(task);
    fs.writeFileSync(filepath, JSON.stringify(list, null, 2));
}

function deleteTask(id) {
    // Lê a lista atual de tarefas, filtra a tarefa a ser deletada e salva novamente.
    const list = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    const updatedList = list.filter(task => task.id !== id);
    fs.writeFileSync(filepath, JSON.stringify(updatedList, null, 2));
}

function updateTask(id, newTitle) {
    // Lê a lista atual de tarefas, encontra a tarefa a ser atualizada e salva novamente.
    const list = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    const taskIndex = list.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        console.log(`Tarefa com ID ${id} não encontrada.`);
        return;
    }
    list[taskIndex].title = newTitle;
    list[taskIndex].updatedAt = today;
    fs.writeFileSync(filepath, JSON.stringify(list, null, 2));
}

function markTask(id, status) {
    // Lê a lista atual de tarefas, encontra a tarefa a ser marcada e salva novamente.
    const list = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    const taskIndex = list.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        console.log(`Tarefa com ID ${id} não encontrada.`);
        return;
    }
    list[taskIndex].status = status;
    list[taskIndex].updatedAt = today;
    fs.writeFileSync(filepath, JSON.stringify(list, null, 2));
}

module.exports = {
    addTask,
    deleteTask,
    updateTask,
    markTask,
    filepath,
    today
};