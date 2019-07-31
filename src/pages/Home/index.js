import React from 'react';
import { useDispatch } from 'react-redux';
import css from './style.scss';
import * as Actions from '../../store/actions';
import { Helmet } from 'react-helmet';

import { Deck } from '../../components/SwipeableCards';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { useCardsFetcher } from '../../common/hooks';

export const Home = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    isDataEmpty,
  } = useCardsFetcher('popular');


  const handleCardLike = (card) => {
    dispatch(Actions.cardsPopularLike(card));
  }

  const handleCardSkip = (cardId) => {
    dispatch(Actions.cardsPopularSkipped(cardId));
  }

  if (isLoading) {
    return 'Trwa ładowanie...';
  }

  return (
    <>
      <Helmet>
        <title>Strona główna</title>
      </Helmet>
      <section className={css.section}>
        <Heading
          title="Przegladaj karty"
          paragraph="Przesuwaj karty aby je polubić lub pominąć"
        />
        <Deck cards={data} />
      </section>
      <section className={css.section}>
        <Heading
          title="Najpopularniejsze karty"
          paragraph="Karty z największą ilością polubień"
        />
        {isDataEmpty && (
          <p className={css.not_found_message}>
            Nie znaleziono więcej kart.
          </p>
        )}
        {!isDataEmpty && (
          <ul className={css.cards_list}>
            {data.map(card => (
              <li
                className={css.cards_item}
                key={card.id}
                data-testid="Home__cards-list"
              >
                <Card
                  card={card}
                  onLiked={() => handleCardLike(card)}
                  onSkipped={() => handleCardSkip(card.id)}
                  data-testid="Home__cards-item"
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}