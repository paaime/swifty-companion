export interface IToken {
  access_token: string
  created_at: number
  expires_in: number
  refresh_token: string
  scope: string
  secret_valid_until: number
  token_type: string
}

export interface IUserSearch {
  id: number
  email: string
  login: string
  first_name: string
  last_name: string
  usual_full_name: string
  usual_first_name: string | null
  url: string
  phone: string
  displayname: string
  kind: string
  image: {
    link: string
    versions: {
      large: string
      medium: string
      small: string
      micro: string
    }
  }
  staff?: boolean
  correction_point: number
  pool_month: string
  pool_year: string
  location: string | null
  wallet: number
  anonymize_date: string
  data_erasure_date: string
  created_at: string
  updated_at: string
  alumnized_at: string | null
  alumni?: boolean
  active?: boolean
}

export interface IUser {
  id: number
  email: string
  login: string
  first_name: string
  last_name: string
  usual_full_name: string
  usual_first_name: string | null
  url: string
  phone: string | null
  displayname: string
  kind: string
  image: {
    link: string
    versions: {
      large: string
      medium: string
      small: string
      micro: string
    }
  }
  staff?: boolean
  correction_point: number
  pool_month: string
  pool_year: string
  location: string | null
  wallet: number
  anonymize_date: string
  data_erasure_date: string | null
  alumni?: boolean
  active?: boolean
  groups: [] // Replace with the appropriate type if known
  cursus_users: ICursus[]
  projects_users: IProject[]
  languages_users: {
    id: number
    language_id: number
    user_id: number
    position: number
    created_at: string
  }[]
  achievements: [] // Replace with the appropriate type if known
  titles: [] // Replace with the appropriate type if known
  titles_users: [] // Replace with the appropriate type if known
  partnerships: [] // Replace with the appropriate type if known
  patroned: {
    id: number
    user_id: number
    godfather_id: number
    ongoing: boolean
    created_at: string
    updated_at: string
  }[]
  patroning: [] // Replace with the appropriate type if known
  expertises_users: {
    id: number
    expertise_id: number
    interested: boolean
    value: number
    contact_me: boolean
    created_at: string
    user_id: number
  }[]
  roles: [] // Replace with the appropriate type if known
  campus: {
    id: number
    name: string
    time_zone: string
    language: {
      id: number
      name: string
      identifier: string
      created_at: string
      updated_at: string
    }
    users_count: number
    vogsphere_id: number
  }[]
  campus_users: {
    id: number
    user_id: number
    campus_id: number
    is_primary: boolean
  }[]
}

export interface IProject {
  id: number
  occurrence: number
  final_mark: number | null
  status: string
  'validated?': boolean | null
  current_team_id: number
  project: {
    id: number
    name: string
    slug: string
    parent_id: number | null
  }
  cursus_ids: number[]
  marked_at: string | null
  marked: boolean
  retriable_at: string | null
  created_at: string
  updated_at: string
}

export interface ICursus {
  id: number
  begin_at: string
  end_at: string | null
  grade: string | null
  level: number
  skills: [] // Replace with the appropriate type if known
  cursus_id: number
  has_coalition: boolean
  user: {
    id: number
    login: string
    url: string
  }
  cursus: {
    id: number
    created_at: string
    name: string
    slug: string
  }
}
