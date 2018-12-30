import { Card } from "../models";
import _ from 'lodash';

const getCardGroupsBySuit = (hand: Card[]) => _.groupBy(hand, 'suit');
const getCardGroupsByRank = (hand: Card[]) => _.groupBy(hand, 'rank');

/**
 * Factory function for number of sets expected in 5 card array
 * @param {Array<Card>}hand array of 5 Card Objects
 * @param {number} kindNumber Number of cards expected (e.g. For a four cards of a kind it's 4)
 * @param {number} sets Number of sets expected (e.g. for 2 pairs set it to 2)
 */
const hasNumberOfCardsOfAKind = (hand:Card[], kindNumber: number, sets: number): boolean => {
  const rankGroups = getCardGroupsByRank(hand);
  return Object.keys(rankGroups).map((key:string) => rankGroups[key])
  .filter((cardGroup: Card[]) => cardGroup.length)
  .filter((cardGroup: Card[]) => cardGroup.length === kindNumber)
  .length === sets;
}

// TODO: getGroupValue this should return the value of a pair, or three of a kind of four of a kind

const hasStraight = (hand: Card[]): boolean => _.sortBy(hand, 'rank').reduce((isStraight: boolean, currentCard: Card, i: number, arr: Card[])=>{
  if (i === 0) return isStraight && true;
  if (arr[i-1].rank + 1 === currentCard.rank) return isStraight && true;
  return isStraight && false;
}, true);

const everyCardIsSameSuit = (hand: Card[]): boolean => Object.keys(getCardGroupsBySuit(hand)).length === 1;

const isRoyal = (hand: Card[]): boolean => {
  const sortedHandByValue = _.sortBy(hand, 'rank');
  if (sortedHandByValue[0].value !==14) return false;
  return sortedHandByValue.reduce((isRoyal: boolean, currentCard: Card, i: number)=>{
      if (i === 0) return isRoyal && true;
      if (sortedHandByValue[i-1].rank + 1 === currentCard.rank) return isRoyal && true;
      return isRoyal && false;
  }, true);
}

const hasFourOfAKind = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 4, 1)(hand);

const hasThreeOfAKind = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 3, 1)(hand);
const hasTwoPairs = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 2)(hand);
const hasOnePair = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 1)(hand);
const getHighCard = (hand: Card[]): Card => _.sortBy(hand, 'value').reverse()[0];

export {
  everyCardIsSameSuit,
  isRoyal,
  hasStraight,
  hasFourOfAKind,
  hasThreeOfAKind,
  hasTwoPairs,
  hasOnePair,
  getHighCard,
}