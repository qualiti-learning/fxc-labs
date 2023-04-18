class Rest {
    #api = ''
    
    constructor(api) {
        this.#api = api
    }

    create(data) {
        console.log("Create...", data)
    }
  
    update(data, id) {
        console.log("Update...", data, id)
    }
  
    delete(id) {
        console.log("Delete...", id)
    }
  
    get() {
        console.log("GetAll...")
    }
}

class User extends Rest {
    #currentDate = new Date()
    #name = ''

    static PermissionAPI = 'https://api.github.com/users'
    
    constructor(name) {
        super('user')

        this.#name = name;
    }

    getCurrentDate() {
        return this.#currentDate
    }

    getName() {
        return this.#name;
    }

    create(data) {
        if (data.name !== undefined) {
            super.create(data)
        } else {
            console.log("Name is missing")
        }
    }
}

const user = new User("Keven Leone")

user.create({lastname: "Keven"})

