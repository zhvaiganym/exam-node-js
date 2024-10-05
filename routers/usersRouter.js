const express = require("express");
const prisma = require("../prisma/db");
const router = express.Router();

//Получить всех пользователей
router.get("/", (req, res) => {
    try {
        prisma.user.findMany()
        .then((data) => {
            res.status(200).send(data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Получить пользователя по id
router.get("/:id", (req, res) => {
    try {
        const id = +req.params.id;
        prisma.user.findFirst({
            where: {
                id: id
            }
        })
        .then((data) => {
            res.status(200).send(data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Добавить пользователя
router.post("/", (req, res) => {
    try {
        const userInfo = req.body;
        prisma.user.create ({
            data: {
                fullname: userInfo.fullname,
                login: userInfo.login,
                password: userInfo.password,
                roleId: userInfo.roleId
            }
        })
        .then(() => {
            res.status(201).send("User created");
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Изменить данные пользователя
router.put("/:id", (req, res) => {
    try {
        const id = +req.params.id;
        const userInfo = req.body;
        prisma.user.update ({
            where: {
                id: id
            },
            data: userInfo
        })
        .then(() => {
            res.status(200).send("User changed");
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Удалить пользователя
router.delete("/:id", (req, res) => {
    try {
        const id = +req.params.id;
        prisma.user.delete({
            where: {
                id: id
            }
        })
        .then((data) => {
            res.status(200).send("User deleted");
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});



module.exports = router;