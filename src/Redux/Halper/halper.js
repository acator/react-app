

const halper = (users, ourId, bool) => {
    return users.map((u) => {
        if (u.id === ourId) {
            return { ...u, ...bool }
        }
        return u
    })
}
export default halper