const express = require('express');
const router = express.Router(); // express.Router() because the file is routeing
const Joi = require('joi');



let courses = [
    { id: 1, name: 'javascript' },
    { id: 2, name: 'HTML5' },
    { id: 3, name: 'CSS3' },
    { id: 4, name: 'NodeJS' },
]

// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//   })

router.get('/', (req, res) => {
    res.send("Hi World");
})
// Get All courses
router.get('/courses', (req, res) => {
    res.send(courses)
});

// Get course For ID
router.get('/courses/:id', (req, res) => {
    let course = validateCourseById(req.params.id);
    if (!course) res.status(404).send("Not Found");
    else res.send(course);
});

// Delete course For ID
router.delete('/courses/:id', (req, res) => {
    let course = validateCourseById(req.params.id);
    if (!course) return res.status(404).send("This courses Is Not Found");
    courses.splice(courses.indexOf(course), 1);
    res.send(course);
});

// Post course
router.post('/courses', (req, res) => {
    // check the date valide

    let result = validateCourse(req.body);
    if (result.error)
        res.status(400).send(result.error.details[0].message)

    // if(!req.body.name || req.body.name.length < 3){   
    // res.status(400).send("the name of course is require and min length is 3")
    // }

    // 1 : Create course
    else {
        let course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        res.send(course);
    }
});

// Pudate courses
router.put('/courses/:id', (req, res) => {
    // 1 Look Up (find) The course
    // 2 If Not exisiting, Return 400 (Not Found)
    let course = validateCourseById(req.params.id);
    if (!course) res.status(404).send("The courses Not Found");

    // 3 validate ===> if invalid ===> Return 400 (Bad Request)

    let result = validateCourse(req.body);
    if (result.error) res.status(400).send(result.error.details[0].message)
    // 4 Update The course
    else course.name = req.body.name;
    // 5 Return The Update course
    res.send(course);
});

// Functions For APIs
function validateCourseById(Pid) {
    return courses.find(p => p.id === parseInt(Pid));
}

function validateCourse(course) {
    let schema = {
        name: Joi.string().min(5).required()
    }
    return Joi.validate(course, schema);
}

 module.exports.router;