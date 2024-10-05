const express = require("express");
const prisma = require("../prisma/db");
const router = express.Router();

//Получить список курсов
router.get("/", (req, res) => {
    try {
        prisma.course.findMany()
        .then((data) => {
            res.status(200).send(data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Получить список студентов этого курса
router.get("/:id/students", async (req, res) => {
    try {
        const courseId = +req.params.id; 

        const students = await prisma.user.findMany({
            where: {
                enrollments: { 
                    some: { 
                        courseId: courseId 
                    },
                },
            },
            select: {
                fullname: true,
                roleId: true
            },
        });
        res.status(200).send(students);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Получить список записанных на курсы
router.get("/enroll", (req, res) => {
    try {
        prisma.courseEnrollment.findMany()
        .then((data) => {
            res.status(200).send(data);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Получить все курсы, владельцем которого является определенный пользователь
router.get("/user/:userId", async (req, res) => {
    try {
        const userId = +req.params.userId;
        const courses = await prisma.course.findMany({
            where: {
                ownerId: userId
            },
        })
        res.status(200).send(courses);
    
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Добавить курсы
router.post("/", (req, res) => {
    try {
        const courseInfo = req.body;
        prisma.course.create ({
            data: {
                title: courseInfo.title,
                ownerId: courseInfo.ownerId,
                description: courseInfo.description
            }
        })
        .then(() => {
            res.status(201).send("Course created");
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Записать студентов на курсы
router.post("/enroll", (req, res) => {
    try {
        const courseEnrollmentInfo = req.body;
        prisma.courseEnrollment.create ({
            data: {
                studentId: courseEnrollmentInfo.studentId,
                courseId: courseEnrollmentInfo.courseId
            }
        })
        .then(() => {
            res.status(201).send("Enrolled in the course");
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Изменить курсы
router.put("/:id", (req, res) => {
    try {
        const id = +req.params.id;
        const courseInfo = req.body;
        prisma.course.update ({
            where: {
                id: id
            },
            data: courseInfo,
        })
        .then(() => {
            res.status(200).send("Course changed");
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});


//Удалить курсы
router.delete("/:id", (req, res) => {
    try {
        const id = +req.params.id;
        prisma.course.delete({
            where: {
                id: id
            }
        })
        .then((data) => {
            res.status(200).send("Course deleted");
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try later");
    }
});



module.exports = router;