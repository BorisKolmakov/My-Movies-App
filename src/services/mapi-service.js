export default class MapiService {
  _apiBase = new URL('https://api.themoviedb.org/3/')

  _apiKey = 'b27e64c3abda1421b4b3926dd62ceefe'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjdlNjRjM2FiZGExNDIxYjRiMzkyNmRkNjJjZWVmZSIsInN1YiI6IjY0ZWMyNjZmNTk0Yzk0MDBhY2IxMjc3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1D1RS3gKPKxkkdev_yZcZQ9fPCbeJg4kUKEh7oTHcY',
    },
  }

  getSource = async (url) => {
    const result = await fetch(url, this.options)
    if (!result.ok) {
      throw new Error(`Error ${url}, status: ${result.status}`)
    }
    const body = await result.json()
    return body
  }

  getPopular = async (page) => {
    const url = new URL('movie/popular?', this._apiBase)
    url.searchParams.set('page', page)
    const result = await this.getSource(url, this.options)
    return result
  }

  getSearch = async (query, page) => {
    const url = new URL('search/movie?', this._apiBase)
    url.searchParams.set('query', query)
    url.searchParams.set('page', page)
    const result = await this.getSource(url, this.options)
    return result
  }

  getGenres = async () => {
    const url = new URL('genre/movie/list', this._apiBase)
    url.searchParams.set('api_key', this._apiKey)
    const result = await this.getSource(url, this.options)
    return result
  }

  createGuestSession = async () => {
    const url = new URL('authentication/guest_session/new?', this._apiBase)
    url.searchParams.set('api_key', this._apiKey)
    const result = await this.getSource(url, this.options)
    return result
  }

  rateMovie = async (guestSessionId, filmId, rateValue) => {
    const rate = {
      value: rateValue,
    }
    const url = new URL(`movie/${filmId}/rating?`, this._apiBase)
    url.searchParams.set('api_key', this._apiKey)
    url.searchParams.set('guest_session_id', guestSessionId)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(rate),
    })
    const result = await response.json()
    return result
  }

  getRatedMovies = async (guestSessionId, page) => {
    const url = new URL(`guest_session/${guestSessionId}/rated/movies?`, this._apiBase)
    url.searchParams.set('api_key', this._apiKey)
    url.searchParams.set('page', page)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.status)
    }
    return await response.json()
  }
}
