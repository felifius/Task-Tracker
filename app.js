#!/usr/bin/env node
const fs = require('fs');
const {addTask, deleteTask, updateTask, markTask, dir, filepath, today} = require('./funcs.js');

function main(){
    // Lê os comandos passados pelo terminal e executa a função correspondente.
    const commands = process.argv.slice(2);
    const command = commands[0];

    switch(command){
        case 'add':
            if (!commands[1]) {
                console.log('Por favor, forneça um título para a tarefa. Exemplo: "task-cli add "Minha nova tarefa""');
                return;
            }
            const contagem = JSON.parse(fs.readFileSync(filepath, 'utf-8')).length + 1;
            const task = {
                id : contagem,
                title : commands[1].toUpperCase(),
                description : commands.slice(2).join(' ') || 'Sem descrição',
                status : 'todo',
                createdAt : today,
                updatedAt : today
            };
            addTask(task);
            break;
        case 'list':
            const list = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
            console.log(list.map(task => `\nID: ${task.id}| Nome:${task.title} -- ${task.description} \nStatus: ${task.status}\nData de criação: ${task.createdAt} | Data de atualização: ${task.updatedAt} `).join('\n'));
            break;
        case 'delete': 
            deleteTask(parseInt(commands[1]));
            break;
        case 'update':
            if (!commands[1] || !commands[2]) {
                console.log('Por favor, forneça o id e o novo título para a tarefa. Exemplo: "task-cli update 1 "Título atualizado""');
                return;
            }
            updateTask(parseInt(commands[1]), commands[2]);
            break;
        case 'mark-done':
            if (!commands[1]) {
                console.log('Por favor, forneça o id da tarefa. Exemplo: "task-cli mark-done 1"');
                return;
            }
            markTask(parseInt(commands[1]), 'done');
            break;
        case 'mark-todo':
            if (!commands[1]) {
                console.log('Por favor, forneça o id da tarefa. Exemplo: "task-cli mark-todo 1"');
                return;
            }
            markTask(parseInt(commands[1]), 'todo');
            break;
        case 'mark-in-progress':
            if (!commands[1]) {
                console.log('Por favor, forneça o id da tarefa. Exemplo: "task-cli mark-in-progress 1"');
                return;
            }
            markTask(parseInt(commands[1]), 'in-progress');
            break;
        default:
            console.log('Comando não reconhecido. Use "add", "list", "delete" ou "update".');
    }
}
main();