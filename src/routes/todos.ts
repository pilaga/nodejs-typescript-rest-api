import { Router } from 'express';
import { Todo } from '../models/todo';

let todos: Todo[] = [];
type RequestBody = {
    text: string;
}
type RequestParam = {
    todoId: string;
}

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = { 
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ 
        message: 'added todo!',
        todo: newTodo
     });
});

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody;
    const params = req.params as RequestParam;
    const id = params.todoId;
    const todoIndex = todos.findIndex(item => item.id === id);
    if(todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        };        
        return res.status(200).json({ message: 'updated todo!' });
    }
    res.status(404).json({ message: 'update error: could not find todo for this id' });
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParam;
    todos = todos.filter(item => item.id !== params.todoId);
    return res.status(200).json({ message: 'deleted todo!' });
});

export default router;