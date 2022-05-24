
//Middleware function for Routes that do not exist.
const notFound = (req, res) => {
    res.status(404).json({"Message": "The route requested does not exist."})
}

module.exports = {notFound};