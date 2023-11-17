import axios from 'axios';
export const GET_GAMES = 'GET_GAMES';
export const GET_GAME_NAME = 'GET_GAME_NAME';
export const GET_GAME_ID = 'GET_GAME_ID';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_GENRES = 'GET_GENRES';
export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';
export const SET_SELECTED_PLATFORM = 'SET_SELECTED_PLATFORM';
export const FILTER_GAMES = 'FILTER_GAMES';
export const SORT_GAMES_ASC = 'SORT_GAMES_ASC';
export const SORT_GAMES_DESC = 'SORT_GAMES_DESC';
export const FILTER_GAMES_BY_PRICE = 'FILTER_GAMES_BY_PRICE';
export const RESET_PLATFORM_FILTER = 'RESET_PLATFORM_FILTER';
export const RESET_GENRE_FILTER = 'RESET_GENRE_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_USER_DATA = 'SET_USER_DATA';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const ADD_COMMENT = 'ADD_COMMENT';
export const LOGOUT = 'LOGOUT';
export const DELETE_ITEM_CART = 'DELETE_ITEM_CART';
export const ADD_NEWS_PURCHASED = 'ADD_NEWS_PURCHASED';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_ITEM = 'DELETE_ITEM';
export const GET_USER='GET_USER';
export const SET_SELECTED_PRICE = 'SET_SELECTED_PRICE';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY';
export const TOP_FIVE='TOP_FIVE'
export const GET_PURCHASE='GET_PURCHASE'
export const USER_BY_ID='USER_BY_ID'
export const PURCHASE_BY_ID='PURCHASE_BY_ID'
export const UPDATE_ITEM='UPDATE_ITEM'
export const UPDATE_ISACTIVE_VG='UPDATE_ISACTIVE_VG'
export const CREATE_GAME='CREATE_GAME'
export const VG_ACTIVE_NOACTIVE='VG_ACTIVE_NOACTIVE'
export const DELETE_DETAIL = 'DELETE_DETAIL'


const { VITE_IS_LOCAL } =import.meta.env
const URL_DEPLOY = 'https://back-arcade-world-pf-henry.onrender.com';
const urlLocal = 'http://localhost:3001';
const BD_URL =  VITE_IS_LOCAL === 'true' ? urlLocal : URL_DEPLOY
console.log(BD_URL);

export const getGames = ()=>{ 
  return async function(dispatch) {
  try {
   const dataGm = (await axios.get(`${BD_URL}/videogame`)).data;
   localStorage.setItem("allGames", JSON.stringify(dataGm));
   return dispatch({
      type: GET_GAMES, 
      payload: dataGm
    });
    
  } catch (error) {
    console.log(error.message)
  }
}
};

export const deleteGameDetail = () => {
  return function(dispatch) {
    return dispatch({
      type: DELETE_DETAIL,
      payload: null
    })
  }
}

export const gameByName = (name)=> {
return async function(dispatch) {
  try {
    const {data} = await axios.get(`${BD_URL}/videogame/?name=${name}`);
            
      return dispatch({
      type: GET_GAME_NAME, 
      payload: data 
    })
    
  } catch (error) {
    console.log(error.message)
  }
}
};
export const gameById = (id)=> {
return async function(dispatch) {
  try {
    const dataId = (await axios.get(`${BD_URL}/videogame/${id}`)).data;

      return dispatch({
      type: GET_GAME_ID,
      payload: dataId
     })

  } catch (error) {
    console.log(error.message)
  }
}
};
export const gamePlataforms = ()=> {
  return async function(dispatch) {
    try {
      const dataPl = (await axios.get(`${BD_URL}/platform` )).data;
      return dispatch({
        type: GET_PLATFORMS,
        payload: dataPl
      });
    } catch (error) {
      console.log(error.message)
    }
  }
};
export const gameGenres = ()=> {
  return async function(dispatch) {
    try {
      const dataGn = (await axios.get(`${BD_URL}/genre`)).data;
      return dispatch({
        type: GET_GENRES,
        payload: dataGn
      });
    } catch (error) {
      console.log(error.message)
    }
  }
};
export const getCountry = ()=>{ 
  return async function(dispatch) {
  try {
   const response  = (await axios.get('https://restcountries.com/v3.1/all')).data;
   const countries = response.map(country => country.name.common);
   const sortedCountries = countries.sort();
   console.log(sortedCountries); // Imprime el contenido de countries
   dispatch({
      type: GET_COUNTRIES, 
      payload: sortedCountries
    });
    
  } catch (error) {
    console.log(error.message)
  }
}
};
export const selectedCountry = (country) => {
  console.log(country);
  return {
    type: SET_SELECTED_COUNTRY,
    payload: country
  }
};
export const setSelectedGenre = (genre) => {
  return {
    type: SET_SELECTED_GENRE,
    payload: genre
  }
};
export const setSelectedPlatform = (platform) => {
  return {
    type: SET_SELECTED_PLATFORM,
    payload: platform
  }
};
export const setSelectedPrice = (price) => {
  return {
    type: SET_SELECTED_PRICE,
    payload: price
  }
};
export const filterGames = () => {
  return (dispatch, getState) => {
    const { allGames, selectedGenre, selectedPlatform, selectedPrice } = getState();
    let filteredGames = [...allGames]; // Crear una copia del array
    if (selectedGenre && selectedGenre !== "") {
      filteredGames = filteredGames.filter((game) =>
        game.genres.includes(selectedGenre)
      );
    }
    if (selectedPlatform && selectedPlatform !== "") {
      filteredGames = filteredGames.filter((game) =>
        game.platforms.includes(selectedPlatform)
      );
    }
    if (selectedPrice && selectedPrice !== "") {
      filteredGames = filteredGames.filter((game) =>
        game.price <= selectedPrice
      );
    }
    // Ordenar los juegos por precio de mayor a menor
    filteredGames.sort((a, b) => b.price - a.price);
    dispatch({
      type: FILTER_GAMES,
      payload: filteredGames,
    });
  };
};
export const sortGamesAsc = () => ({
  type: SORT_GAMES_ASC,
});

export const sortGamesDesc = () => ({
  type: SORT_GAMES_DESC,
});
export const filterGamesByPrice = (price) => ({
  type: FILTER_GAMES_BY_PRICE,
  payload: price,
});
export const resetPlatformFilter = () => {
  return {
    type: RESET_PLATFORM_FILTER,
  }
};
export const resetGenreFilter = () => {
  return {
    type: RESET_GENRE_FILTER,
  }
};
export const resetFilters = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_FILTERS,
    });
    dispatch(filterGames());
  };
};
export function postRegister(payload){
  return async function(){
    const data = await
    axios.post(`${BD_URL}/user/register` ,payload)
    return data
  }
}
export function postLogin(payload){
  return async function(){
    const data = await
    axios.post(`${BD_URL}/user/login`,payload)
    return data
  }
}
export function postFirebase(payload){
  return async function(){
    const data = await
    axios.post(`${BD_URL}/user/firebase`,payload)
    return data
  }
}
export function putProfile(payload){
  return async function(){
    const data = await
    axios.put(`${BD_URL}/user/update` ,payload)
    return data
  }
}
export function setUserData(userData) {
  return (dispatch) => {
    // Actualiza userData
    dispatch({
      type: SET_USER_DATA,
      payload: userData,
    });

    // Si userData tiene favoritos, los agrega al estado global
    if (userData && userData.user && userData.user.favorites) {
      userData.user.favorites.forEach(game => {
        dispatch(addToFavorites(game));
      });
    }

    // Si userData tiene reviews, los agrega al estado global
    if (userData && userData.user && userData.user.reviews) {
      userData.user.reviews.forEach(review => {
        dispatch(addComments(review));
      });
    }
  };
}
export function setAuthenticated(isAuthenticated) {
  return {
    type: SET_AUTHENTICATED,
    payload: isAuthenticated,
  };
}

export const addToFavorites = (game) => ({
  type: ADD_TO_FAVORITES,
  payload: game,
});
export const removeFromFavorites = (id) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id,
});
export const addComments = (gameComment) => ({
  type: ADD_COMMENT,
  payload: gameComment,
});
export const logout = (payload) => async dispatch => {
  try {
    console.log(payload);
    const response = await axios.put(`${BD_URL}/user/logout`, payload[0]);
    console.log(response);
    dispatch({
      type: LOGOUT
    });
    console.log('Llenado de deslogueo completo')
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
  }
};
export const deleteItemCart = (gamesIds) => {
  return {
    type: DELETE_ITEM_CART,
    payload: gamesIds,
  };
}

export const addPurchades = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_NEWS_PURCHASED,
        payload
      });
    } catch (error) {
      console.log(error.message)
      
    }
  };
};

export const addToCart = (item) => {
  return (dispatch)=> {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart,item ];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
          dispatch({
        type: ADD_TO_CART,
        payload: item
      });
     };
};
export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
}
export function GetUser(){
  return async function(dispatch){
   try {
    const {data}= await axios.get('http://localhost:3001/user')
    console.log(data);
    return dispatch({
      type:GET_USER,
      payload:data
    })
   } catch (error) {
    console.log(error.message)
   }
  }
}
export function purchaseSuccess(payload){
  return async function(dispatch){
   try {
    const response = await axios.post(`${BD_URL}/cart/success`, payload);
        return dispatch({
        type:PURCHASE_SUCCESS,
        payload:response.data
      });
    
   } catch (error) {
    console.log(error.message)
   }
  }
}
export function GetPuchase(){
  return async function(dispatch){
    try {
      const {data}=await axios.get(`${BD_URL}/purchase`)
      return dispatch({
        type:GET_PURCHASE,
        payload:data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}
export function UserById(id){
  return async function(dispatch){
   const {data} = await axios.get(`${BD_URL}/user/${id}`)
   return dispatch({
    type:USER_BY_ID,
    payload:data
   })
  }
}
export function PurchaseById(id){
  return async function(dispatch){
    const {data}=await axios.get(`${BD_URL}/purchase/${id}`) 
    return dispatch({
      type:PURCHASE_BY_ID,
      payload:data
    })
  }
}
export const updateItem = (newData) => {

  return async (dispatch) => {
    try {
      const {data}= await axios.put(`http://localhost:3001/user/update`,newData);

           return dispatch({
            type:UPDATE_ITEM,
            payload:data
           })
    } catch (error) {
     console.log({error:error.message})
    }
  };
};

export const UpdateActiveVG=(newData)=>{
  return async function(dispatch){
  try {
    const {data} =await axios.put('http://localhost:3001/videogame/update',newData)
    console.log(data)
    return dispatch({
      type:UPDATE_ISACTIVE_VG,
      payload:data
    })
  } catch (error) {
    console.log({error:error.message})
  }
   
 }
}
export const createVideogame = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${BD_URL}/videogame`,
        payload
      );
      const createdProduct = response.data;
      
      dispatch({
        type: CREATE_GAME,
        payload: createdProduct,
      })
      
    } catch (error) {
      console.log("Error: createVideogame", error);
      
    }
  };
};

export const VGactive=()=>{
  return async function (dispatch){
    try{
      const {data}= await axios.get(`${BD_URL}/videogame/admin`)
      return dispatch({
        type:VG_ACTIVE_NOACTIVE,
        payload:data
      })
    }catch(error){
      console.log({error:error.message})
    }
  }
}
