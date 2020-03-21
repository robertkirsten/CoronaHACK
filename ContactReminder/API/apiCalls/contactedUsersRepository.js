import Repository from "../repository";

const resource = "/contacted";

export default ({
    postcontactedUsers(userId1, userId2)
    {
        return Repository.post(`${resource}`, {
                id1: `${userId1}`,
                id2: `${userId2}`,
            }
        )
    },
    getUsers(userId){
        //returns an array of persons which user contacted
        return Repository.get(`${resource}?id=${userId}`)

    }
});
