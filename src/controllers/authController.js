// backend/src/controllers/authController.js
const crypto      = require('crypto');
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
// ← вот здесь: ../../models, а не ../models
const { User }    = require('../../models');    
const { sendMail }= require('../utils/mail.js');

const SALT_ROUNDS = 10;

async function register(req, res) { /*…*/ }
async function verifyEmail(req, res) { /*…*/ }
async function login(req, res) { /*…*/ }
async function forgotPassword(req, res) { /*…*/ }
async function resetPassword(req, res) { /*…*/ }

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
};
