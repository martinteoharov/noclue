const express = require('express');
const router = express.Router();
const userService = require('./user.service.js');


const authenticate = (req, res, next) => {
	userService.authenticate(req.body)
	        .then(token => token ? res.json(token) : res.status(400).json({ success: false }))

		.catch(err => next(err));
}
const signUp = (req, res, next) => {
	userService.signUp(req.body)
	        .then(token => token ? res.json(token) : res.status(400).json({ success: false }))
		.catch(err => next(err));
}

const getAll = (req, res, next) => {
	userService.getAll()
		.then(users => console.log(users))
		.catch(err => next(err));
}
// routes
router.post('/authenticate', authenticate);
router.post('/signUp', signUp);
router.get('/', getAll);

module.exports = router;
