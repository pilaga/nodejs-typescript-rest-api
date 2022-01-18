import { Router } from 'express';
import { Todo } from '../models/todo';

const todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = { 
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ 
        message: 'added todo!',
        todo: newTodo
     });
});

router.put('/todo/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    const todoIndex = todos.findIndex(item => item.id === id);
    if(todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        };        
        return res.status(200).json({ message: 'updated todo!' });
    }
    res.status(404).json({ message: 'could not find todo for this id' });
});

export default router;