const path = require('path');
const fs = require('fs');
import express from 'express';
const router = express.Router();
import { getAllTask ,UpdateAllTasks } from '../services/tasks.controller';

router.get('/', getAllTask); 
router.put('/',UpdateAllTasks);


module.exports =router;