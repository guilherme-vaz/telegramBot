const prisma = require("../prisma/client");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretKey = "secret";

const AdminController = {

    createAdmin: async (req, res) => {
        const { email, password } = req.body;

        try {
            //Verificando se usuário existe
            const existingUser = await prisma.admin.findUnique({
                where: { email }
            });

            if (existingUser) {
                return res.status(400).json({ message: "O usuário já existe" });
            }

            //Criptografando senha
            const hashPassword = await bcrypt.hash(password, 8);
            const newAdmin = await prisma.admin.create({
                data: {
                    email,
                    password: hashPassword
                }
            });

            return res.status(201).json(newAdmin);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar o admin" });
        }

    },

    loginAdmin: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Verificando se o admin existe
            const admin = await prisma.admin.findUnique({
                where: { email }
            });

            if (!admin) {
                return res.status(401).json({ message: "Email inválido" });
            }

            // Verificando a senha
            const passwordMatch = await bcrypt.compare(password, admin.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Senha inválida" });
            }

            // Gerando um token JWT
            const token = jwt.sign({ admin }, secretKey, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao fazer login" });
        }
    }
}

module.exports = AdminController;

