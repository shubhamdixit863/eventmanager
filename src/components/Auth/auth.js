import jwt_decode from "jwt-decode";


class Auth
{

constructor()
{
    this.authenticated=false;
}




isAuthenticated()
{

let token=localStorage.getItem("token");

if(!token)
{

    return false;
}
else{

    //let decoded = jwt_decode(token);



      return true;
}




}


checkRole(expectedRole)
{
if (localStorage.getItem("role")==expectedRole) {
    return true;
}
return false;
}
}

export default new Auth();