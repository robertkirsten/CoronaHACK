import Repository from "../repository";

const resource = "/contactPersons";

export default ({

  postInfection(user, contacted){
    return Repository.post(`${resource}/infected`, {user})
  }

})