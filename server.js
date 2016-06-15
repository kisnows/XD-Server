const express = require('express')
const path = require('path')
const url = require('url')
const request = require('request')

const app = express();
const router = express.Router();
const cwd = process.cwd();