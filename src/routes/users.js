import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { username, email } = req.query;
        const users = await getUsers(username, email);

        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newUser = await createUser(username, password, name, email, phoneNumber, profilePicture);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const updatedUser = await updateUserById(id, { username, password, name, email, phoneNumber, profilePicture });

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUserId = await deleteUser(id);

        res.status(200).json({
            message: `User with id ${deletedUserId} was deleted.`
        });
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

export default router;
