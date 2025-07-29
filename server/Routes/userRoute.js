const router = require('express').Router();
const {createUser, getUser, deleteUser, updateUser, login } = require('../Controllers/userController');
const upload = require('../Config/multerConfig');
// create user route 
// router.post('/create', upload.single('image'), createUser);
router.post("/create", upload.single("image"), createUser);
// get all user route
router.get('/get', getUser);
// delete user 
router.delete('/delete/:id', deleteUser);
// update user route
router.put("/update/:id", upload.single("image"), updateUser);

// login api

router.post("/login", login)

module.exports = router;


