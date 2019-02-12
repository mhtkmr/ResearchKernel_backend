module.exports= ({client,logger}) => async function authenticate(req, res, next) {
    const sid = await req.cookies['connect.sid'];
    const uid =await client.getAsync(sid);
    logger.info(`[Auth][module]-${sid},${uid}`);
    if((!sid||uid)||(sid||!uid)||(!sid||!uid)){
        return res.status(401).send({status: 401, message: 'Unauthorised'})
    }
    else if(sid&&uid){
        logger.info(`[Auth][module]- successful with ${sid}, ${uid}`);
        next();
    }
}