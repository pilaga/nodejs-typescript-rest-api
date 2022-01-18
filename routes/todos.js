"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
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
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        };
        return res.status(200).json({ message: 'updated todo!' });
    }
    res.status(404).json({ message: 'update error: could not find todo for this id' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    todos = todos.filter(item => item.id !== req.params.todoId);
    return res.status(200).json({ message: 'deleted todo!' });
});
exports.default = router;
