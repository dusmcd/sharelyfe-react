import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORIES_POSTS = 'GET_CATEGORIES_POSTS'

const getCategoriesAction = categories => {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

const getPostsByCategoryAction = categories => {
  return {
    type: GET_CATEGORIES_POSTS,
    categories,
  }
}

export const getCategoriesPostsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/categories/posts')
      .then(res => {
        return dispatch(getPostsByCategoryAction(res.data))
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

const initialState = {
  categories: [],
}

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.categories }
    case GET_CATEGORIES_POSTS:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}
