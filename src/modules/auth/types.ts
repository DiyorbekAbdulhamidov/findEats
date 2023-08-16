export namespace IEntity {

  export interface User {
  }

  export interface Tokens {
    access: string
    refresh: string
  }

}

export namespace IContext {
  export interface Auth {
    isAuthenticated: boolean
    user: IEntity.User | null
    methods: {
      login: (user: IEntity.User) => void
      logout: () => void
    }
  }
}