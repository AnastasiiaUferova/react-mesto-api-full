const allowedCors = [
    'localhost:3000',
    'https://mesto-front.u.nomoredomains.xyz/'
];

module.exports.cors = (req, res, next) => {
    const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
    // проверяем, что источник запроса есть среди разрешённых 
    if (allowedCors.includes(origin)); {
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
}; 


