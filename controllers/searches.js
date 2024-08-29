const { response } = require('express');

const getAll = (req, res = response ) => {

    const search = req.params.search;

    res.json({
        ok: true,
        msg: 'getAll',
        search
    })
}



module.exports = {
getAll
}