const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('../schemas/UserSchema');

const app = express();
const router = express.Router();

router.get("/:id", (req, res, next) => {

    const payload = {
        pageTitle: "Окно поста",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        postId: req.params.id
    }

    res.status(200).render("postPage.pug", payload);
})

module.exports = router;