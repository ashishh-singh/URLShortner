const sessionIdtouser = new Map();
function setUser(id, user){
    sessionIdtouser.set(id, user);
}

function getUser(id){
    return sessionIdtouser.get(id);
}


module.exports = {
    getUser,
    setUser,
}