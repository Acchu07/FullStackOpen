import jwt from "jsonwebtoken";

function getTokenFrom(request, response, next) {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '');
    } else {
        request.token = null;
    }
    next();
};

function getUserFromToken(request, response, next) {
    if (!(request.token)) {
        response.status(401).send('No token provided');
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'});
    }
    request.id = decodedToken.id;
    request.username = decodedToken.username;
    next();
}

export {getTokenFrom, getUserFromToken};