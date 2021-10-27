const dotenv = require('dotenv').config({path: "../.env"});
let express = require("express");
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({extended: false});
const UserDao = require("./dao/UserDao");
const AdminDao = require("../src/dao/adminDao");
const EventDao = require("../src/dao/eventDao");
let secret = require("./config.json");
let multer = require("multer");
let uuid = require("uuid");
const debug = require('debug')('myapp:server');
let path = require("path");
let Mail = require("./sendMail");
const serveIndex = require("serve-index");
let bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


/**
 * @file server.js is the root file for this express app
 * @author Team 5
 * @see <a href="http://localhost:3000">Harmoni</a>
 */

/**
 * @type {Object}
 */
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../files/uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + uuid.v4() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 10   // 10 MB
    }
});

let pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    debug: false,
    charset: 'utf8mb4_general_ci'
});


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/ftp', express.static('../../files/uploads'), serveIndex('files', {'icons': true}));
app.use(bodyParser.json()); // for å tolke JSON


// Prevents CORS-policy issues
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
});


const userDao = new UserDao(pool);
const adminDao = new AdminDao(pool);
const eventDao = new EventDao(pool);

const mail = new Mail();
const privateKey = (publicKey = secret.secret);


/**
 * Get categories - Retrieves all categories
 * @function get - All categories
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} Promise object resolving in either an error or all categories
 */
app.get("/categories", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getCategories((status, data) => {
                res.status(status);
                res.json(data)
            })
        }
    });

});


/**
 * GET category by id
 * @function get - Category by id
 * @param {int} id - Unique category identifier
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} Promise object resolving in either an error status or a category object
 */
app.get("/category/:id", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getCategoryFromEvent(req.params.id, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});


//CONTACTINFO

/**
 *Posts contact info provided in request body
 * @function post - Contact info
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post("/contactinfo", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addContactInfo(req.body, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


/**
 * Retrieves contact info based on id specified in the url.
 * @function get - Contact info
 * @param {int} id - Unique contact info identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} Promise resolving in an error or res object containing contact info requested.
 */
app.get("/contactinfo/:id", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getContactInfoForEvent(req.params.id, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


//EVENT

/**
 * Posts an event with all its parameters
 * @function post - Event
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} Promise resolving in an error or res object containing contact info requested.
 */
app.post("/event", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addEvent(req.body, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


/**
 * Retrieves all events
 * @function get - All events
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Promise resolving in either an error or an object containing all event objects in the database
 */
app.get("/event/all", (req, res) => {
    eventDao.getAllEvents((status, data) => {
        res.status(status);
        res.json(data);
    });
});


/**
 * Retrieves all events with status archived
 * @function get - Archived events
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express reponse object
 * @returns {Object} Promise resolving in either an error status or an object containing all archived event objects
 */
app.get("/event/archived", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log("/event fikk request fra klient");
            eventDao.getAllArchived((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});


/**
 * Retrieves all active events
 * @function get - Active events
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns Promise object resolving in either an error or an object containing all event objects that are marked as active
 */
app.get("/event/active", (req, res) => {
    eventDao.getAllActive((status, data) => {
        res.status(status);
        res.json(data);
    });
});


/**
 * Retrieves all cancelled events
 * @function get - Cancelled events
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns Promise object resolving in either an error or an object containing all event objects that are marked as cancelled
 */
app.get("/event/cancelled", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    let token = req.token;
    jwt.verify(token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log(authData);
            eventDao.getAllCancelled((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });
});


/**
 * Retrieves all non-filed/non-archived events
 * @function get - Non-filed events
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns Promise object resolving in either an error or an object containing all event objects that are not marked as filed.
 */
app.get("/event/nonFiled", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getNonFiledEvents((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});

/**
 * Retrieves an event based on the id provided in the URL
 * @function get - Event
 * @param {int} eventID - Unique event identifier
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise} Promise object resolving in either an error or an object containing the specified event
 */
app.get("/event/:eventID", (req, res) => {
    eventDao.getEventByID(req.params.eventID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});


/**
 * Updates an events archived status
 * @function put - Event archived status
 * @param {int} eventID - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express respnse object
 */
app.put('/event/:eventID/archived', stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.updateFiled(req.params.eventID, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});


/**
 * Updates an events cancelled status
 * @function put - Event cancelled status
 * @param {int} eventID - Unique identifier for an event
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put('/event/:eventID/cancel', stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.updateCancel(req.params.eventID, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});


/**
 * Updates an events pending status
 * @function put - Event pending status
 * @param {int} eventID - Unique identifier for an event
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put('/event/:eventID/pending', stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.updatePending(req.params.eventID, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

})

/**
 * Deletes the specified event
 * @function delete - Event
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns Promise resolving in either an error
 */
app.delete('/event/:id', stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.deleteEvent(parseInt(req.params.id), (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });
});


/**
 * Deletes the specified events details
 * @function delete - Event details
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.delete('/event/:id/details', stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.deleteEventDetails(parseInt(req.params.id), (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });
});

/**
 * Deletes all comments for the specified event
 * @function delete - Event comments
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.delete('/event/:id/comments', stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.deleteEventComments(parseInt(req.params.id), (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });
});

/**
 * Updates an event with provided changes
 * @function put - Event
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put("/event/:id/edit", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.updateEvent(req.params.id, req.body, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });
});


/**
 * Updates contact info related to specified event
 * @function put - Contact info for specified event
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put("/event/contactinfo/:id", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.updateContactInfo(req.params.id, req.body, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


/**
 * Deletes tickets for the specified event
 * @function delete - Tickets
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.delete("/event/tickets/:id", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.deleteTicketsForEvent(req.params.id, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


/**
 * Retrieves all tickets for the specified event
 * @function get - Event tickets
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} Returns a promise object resolving with either an error status or an object containing all events for the event
 */
app.get("/event/tickets/:id", (req, res) => {
    eventDao.getTicketFromEvent(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


/**
 * Posts a comment for the event specified in the req.body
 * @function post - Event comment
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post("/event/comments", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addComment(req.body, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


/**
 * Retrieves all comments related to the specified event
 * @function get - Event comments
 * @param {int} id - Unique event identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise resolving in either an error status or an object containing all comments related to the event
 */
app.get("/event/comments/:id", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getComments(req.params.id, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


//PROFILE

/**
 * Updates specified user with provided changes from req.body
 * @function put - User
 * @param {int} id - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put("/profile/:userId/edit", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            userDao.updateProfile(req.body, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});
/**
 * Updates specified user with provided changes from req.body
 * @function put - User
 * @param {int} id - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

app.put("/admin/:userId/edit", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.updateUser(req.body, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});





// ROLES

/**
 * Retrieves all roles
 * @function get - Roles
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error status or an object containing all roles
 */
app.get("/roles", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getRoles((status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


/**
 * Retrieves the role specified by id
 * @function get - Role
 * @param {int} roleID - Unique role identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error status or an object containing the specified role
 */
app.get("/role/:roleID", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getRoleById(req.params.roleID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


/**
 * Retrieves the role specified by a string
 * @function get - Role
 * @param {String} role - String identifying a role
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error status or an object containing the specified role
 */
app.get("/roles/:role", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getRole(req.params.role, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


//TICKETS

/**
 * Adds tickets to event specified in req.body
 * @function post - Tickets for event
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post("/tickets", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addTicket(req.body, (status, data) => {
                res.status(status);
                res.json(data)
            })
        }
    });

});


/**
 * Retrieves tickets for the event specified in req.body
 * @function get - Tickets
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error status or an object containing the tickets for the event
 */
app.get("/tickets", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getTicket((status, data) => {
                res.status(status);
                res.json(data)
            })
        }
    });
});


/**
 * Retrieves name of the ticket specified by id
 * @function get - Ticket name
 * @param {int} id - Unique ticket identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error status or an object containing the ticket requested
 */
app.get("/tickets/:id", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getTicketById(req.params.id, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

//UPLOAD

/**
 * Posts an image file
 * @function post - File (image)
 * @param {Object} file - File object (image)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object containing a success boolean, true/false and a filePath
 */
app.post('/upload', stripToken, upload.single('file'), function (req, res) {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.send({
                success: false
            });
        } else {
            if (!req.file) {
                return res.send({
                    success: false
                });
            } else {
                if (req.file.mimetype.split("/")[0] !== "image") { //Not an image
                    return res.send({
                        success: false,
                        error: "Only images are allowed"
                    })
                } else {
                    return res.send({
                        filePath: req.file,
                        success: true
                    });
                }

            }
        }

    });
});


/**
 * Posts a text or pdf file
 * @function post - File (text/pdf)
 * @param {Object} - File object (text/pdf)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an object containing an error message or containing a filePath and a boolean = true
 */
app.post("/uploadFile", stripToken, upload.single("file"), (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.send({
                success: false
            })
        } else {
            if (req.file.mimetype !== "text/plain" && req.file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && req.file.mimetype !== "application/pdf") { //Not an image
                return res.send({
                    success: false,
                    error: "Only text-files or pdf are allowed"
                })
            } else {
                return res.send({
                    filePath: req.file,
                    success: true
                });
            }
        }
    });
});


/**
 * Posts several files
 * @function post - Files
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in an object containing either an error message or the file paths for the uploaded files as well as a boolean = true
 */
app.post("/uploadFiles", stripToken, upload.array("files", 5), (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.send({
                success: false
            })
        } else {
            if (!req.files) {
                console.log("No file received");
                return res.send({
                    success: false
                });
            } else {
                console.log(req.files);
                console.log("File received");
                //Check for application type, must be either a plain text, word-doc or pdf
                //If at least one of the elements are not plain text and not word-doc and not pdf the files will not be uploaded

                if (!req.files.some(element => element.mimetype.split("/")[0] !== "image" && element.mimetype !== "text/plain" && element.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && element.mimetype !== "application/pdf")) {
                    return res.send({
                        filePath: req.files,
                        success: true
                    })
                } else {
                    return res.send({
                        success: false,
                        error: "You have uploaded some files which are not allowed"
                    })
                }
            }
        }
    });

});


/**
 * Retrieves an image
 * @function get - File (image)
 * @param {String} imagePath - Path to the desired image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in an object containing the requested file
 */
app.get('/image/:imagePath', (req, res) => {
    res.sendFile(path.join(__dirname, '../../files/uploads/' + req.params.imagePath));
});


//USER

/**
 * Requests a change in password and sends the new one to the specified users email
 * @function post - Change password request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error object or an object containing the result
 */
app.post("/users/reset_password", (req, res) => {
    userDao.getUser(req.body.email, (status, data) => {
        if (data.length > 0) {
            let newPass = makeid(8);
            userDao.changePassword({user_id: data[0].user_id, password: newPass}, (statusCode, result) => {
                res.status(statusCode);
                res.json(result);
                mail.sendResetPasswordMail(data[0], newPass);
            });
        } else {
            res.json({error: "User does not exist"})
        }
    })
});


/**
 * Changes user password
 * @function put - Password
 * @param {int} userID - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put("/users/:userID/edit/password", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            // Check if user with pw entered exists, if so -> change their pw.
            userDao.getApprovedUser(req.body.email, (status, data) => {
                if (data.length > 0) {
                    /**
                     * Interpret hashed pasword and compare the password passed by the user to this one.
                     */
                    let passwordHash = JSON.stringify(data[0].password_hash).slice(1, -1);
                    bcrypt.compare(req.body.password, passwordHash, function (err, response) {
                        if (err) {
                            res.status(401);
                            console.error(err);
                        }
                        if (response) { // If response is true <=> If the passwords are equal
                            userDao.changePassword({
                                user_id: parseInt(req.params.userID),
                                password: req.body.newPassword
                            }, (statusCode, result) => {
                                console.log("Status-code: " + statusCode);
                                res.status(statusCode);
                                res.json(result);
                            });
                        } else { // Passwords are not equal -> The user should not have permission to change this password
                            res.json({error: "Not authorized"});
                            res.status(401);
                        }
                    });
                }
            });
        }
    });

});


/**
 * Retrieves a user object with all its attributes
 * @function get - User
 * @param {int} userID - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error object or and object containing the specified user
 */
app.get("/users/:userID", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


/**
 * Retrieves all users
 * @function get - Users
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise resolving in either an error object or an object containing all the user objects.
 */
app.get("/users", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getUsers((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});


/**
 * Posts a user with attributes specified in req.body and sends a mail to the email given.
 * @function post - User
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post("/users", (req, res) => {
    userDao.registerUser(req.body, (status, data) => {
        if (status === 200) {
            mail.sendMail(req.body);
        }
        res.status(status);
        res.json(data);
    });
});


/**
 * Changes the specified users attributes
 * @function put - User
 * @param {int} userID - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put("/users/:userID", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.approveUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


/**
 * Assigns a role to the specified user
 * @function post - User-role
 * @param {int} userID - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post("/users/:userID/role", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.assignRole(req.params.userID, req.body.roleID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


/**
 * Deletes the specified user identified by userID
 * @function delete - User
 * @param {int} userID - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.delete("/users/:userID/", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.deleteUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});


/**
 * Changes specified users approval status
 * @function put - User, approve
 * @param {int} userID - Unique user identifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put("/users/:userID/approve", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.approveUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


/**
 * Updates the users approved status
 * @function put - User, disapprove
 * @param {int} userID - Unique user indentifier
 * @param {function} stripToken - Function to verify/prepare tokens for verification. @see {@link stripToken}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put("/users/:userID/disapprove", stripToken, (req, res) => {
    /**
     * verification using JWT (JSON Web Tokens)
     * [Link](https://jwt.io/)
     */
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.disapproveUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


//VALIDATE

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/*app.all("*", function(req, res, next) {
    //get auth header value
    console.log("Step 1")
    if(req.path !== "/validate" && req.path !== "/user"){
        console.log("Step 2")
        const bearerHeader = req.headers["authorization"];
        console.log(bearerHeader);

        if (typeof bearerHeader !== "undefined") {
            console.log("Step 3")
            //split at the space
            const bearer = bearerHeader.split(' '); //Removes Bearer before token
            const token = bearer[1];
            console.log(token)

            jwt.verify(token, publicKey, (err, decoded) => {
                if (err) {
                    console.log("Token IKKE ok");
                    res.json({ error: "Not authorized" });
                } else {
                    console.log("Token ok: " + decoded.username);
                    next();
                }
            });
        } else {
            console.log("heyhey :(");
        }
    }
    next();
});*/


/**
 * Checks password and email up against the ones stored in the DB. If okay -> create a token and return it.
 * @function post - Validate
 * @param {String} req.body.password - Password provided by the user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {promise} - Returns a promise object resolving in either an error or an object containing a signed jwt-token
 */
app.post("/validate", (req, res) => {

    userDao.getApprovedUser(req.body.email, (status, data) => {
        if (data.length > 0) {
            let passwordHash = JSON.stringify(data[0].password_hash).slice(1, -1);
            let role = JSON.stringify(data[0].role);
            let approved = JSON.stringify(data[0].approved);
            let id = JSON.stringify(data[0].user_id);

            /**
             * Using the bcrypt module to compare the hash from the DB to the password sent by the user
             * @see [link](https://github.com/kelektiv/node.bcrypt.js#readme)
             */
            bcrypt.compare(req.body.password, passwordHash, function (err, response) {
                if (err) {
                    console.error(err);
                }
                if (response) {
                    let token = jwt.sign({
                        email: req.body.email,
                        role: role,
                        approved: approved,
                        user_id: id
                    }, privateKey, {
                        expiresIn: '1d'
                    });
                    res.json({jwt: token});
                } else {
                    res.status(401);
                    res.json({error: "Not authorized"});
                }
            });
        } else {
            res.status(401);
            res.json({error: "User noes not exists"})
        }
    });
});


/**
 * Middleware function!
 Strips token and splits it in two. The token: "Bearer: skdfid342342Q4kaSDAkfjfsdfkeEi" would be split into an array. The function sends the second part for later use. This is done by setting the req.token attribute to bearerToken = "skdfid342342Q4kaSDAkfjfsdfkeEi". Then express.next() is called.
 * @function stripToken - Strips and splits token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @function express.next() - Passes execution on to the next method.
 */
function stripToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        //split at the space
        const bearer = bearerHeader.split(' '); //Removes Bearer before token
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


let server = app.listen(8080);