const allowedCors = [
    'localhost:3000',
    'htpps:localhost:3000',
    'https://mesto-front.u.nomoredomains.xyz/signup',
    'https://mesto-front.u.nomoredomains.xyz/sigin',
    'http://mesto-front.u.nomoredomains.xyz/signup',
    'http://mesto-front.u.nomoredomains.xyz/signin',
    'http://mesto-back.u.nomoredomains.xyz/signup',
    'https://mesto-back.u.nomoredomains.xyz/signin',
    'https://mesto-front.u.nomoredomains.xyz/signup'

];

module.exports.cors = (req, res, next) => {
    const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
    // проверяем, что источник запроса есть среди разрешённых 
    if (allowedCors.includes(origin)); {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true)
    }

    const { method } = req; 
    const requestHeaders = req.headers['access-control-request-headers'];
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; 
    if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
} 
    next();
}; 


