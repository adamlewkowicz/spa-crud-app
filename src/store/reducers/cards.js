import {
  CARDS_FETCH_REQUESTED,
  CARDS_POPULAR_LIKED,
  CARDS_MORE_FETCH_SUCCEEDED,
  CARDS_FETCH_SUCCEEDED,
  CARDS_POPULAR_SKIPPED,
  CARDS_LIKED_REMOVED,
  CARD_LIKED,
  CARDS_FETCH_MORE_REQUESTED,
} from '../consts';

const initialState = {
  isLoading: false,
  isLastPage: false,
  popular: [],
  liked: []
}

export function cardsReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case CARDS_FETCH_MORE_REQUESTED: return {
      ...state,
      isLoading: true
    }
    case CARDS_FETCH_REQUESTED: return {
      ...state,
      isLastPage: false,
      isLoading: true,
      page: action.meta
        ? action.meta.page
        : state.page
    }
    case CARDS_FETCH_SUCCEEDED: return {
      ...state,
      [action.meta.target]: action.payload,
      isLastPage: action.meta.pagination.count === 0,
      isLoading: false
    }
    case CARDS_MORE_FETCH_SUCCEEDED: return {
      ...state,
      [action.meta.target]: action.payload,
      page: state.page + 1,
      isLoading: false
    }
    case CARDS_POPULAR_SKIPPED:
      const [skippedCard, ...popular] = state.popular;
      return { ...state, popular }
    case CARD_LIKED:
    case CARDS_POPULAR_LIKED:
      const likedCardIndex = state.popular.findIndex(card =>
        card.id === action.meta.id
      );
      const popularCards = [...state.popular];
      const likedCard = popularCards.splice(likedCardIndex, 1);
      const likedCards = [...state.liked, likedCard];
      return {
        ...state,
        popular: popularCards,
        liked: likedCards
      }
    case CARDS_LIKED_REMOVED: return {
      ...state,
      liked: state.liked.filter(card => card.id !== action.meta.id)
    }
    default: return state;
  }
}