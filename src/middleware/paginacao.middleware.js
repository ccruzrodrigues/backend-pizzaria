module.exports = (req, res, next) => {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    !limit  ?  limit = 5 : null;
    !offset ? offset = 0 : null;

    req.query.limit = limit;
    req.query.offset = offset;

    return next();

}