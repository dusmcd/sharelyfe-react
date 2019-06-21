import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORIES_POSTS = 'GET_CATEGORIES_POSTS'
const GET_CATEGORY_INFO = 'GET_CATEGORY_INFO'

const getCategoriesAction = categories => {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

const getCategoriesPostsAction = categories => {
  return {
    type: GET_CATEGORIES_POSTS,
    categories,
  }
}

const getCategoryInfoAction = category => {
  return {
    type: GET_CATEGORY_INFO,
    category,
  }
}

export const getCategoriesPostsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/categories/posts')
      .then(res => {
        return dispatch(getCategoriesPostsAction(res.data))
      })
      .catch(err => console.error(err.message))
  }
}

export const getCategoriesThunk = () => {
  return dispatch => {
    return axios
      .get('/api/categories')
      .then(res => dispatch(getCategoriesAction(res.data)))
      .catch(err => console.error(err.message))
  }
}

export const getCategoryInfoThunk = categoryId => {
  return dispatch => {
    return axios
      .get(`/api/categories/${categoryId}/posts`)
      .then(res => dispatch(getCategoryInfoAction(res.data)))
      .catch(err => console.error(err.message))
  }
}

const initialState = {
  categories: [],
  categoryInfo: {},
}

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.categories }
    case GET_CATEGORIES_POSTS:
      return { ...state, categories: action.categories }
    case GET_CATEGORY_INFO:
      return { ...state, categoryInfo: action.category }
    default:
      return state
  }
}
