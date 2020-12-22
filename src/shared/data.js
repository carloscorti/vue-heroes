import { format } from 'date-fns';

import { inputDateFormat } from './constants';

import axios from 'axios';

// export const mockHeroes = [
//   {
//     id: 10,
//     firstName: 'Ellen',
//     lastName: 'Stone',
//     description: 'fashionista',
//     bornDate: format(new Date(1998, 5, 25), inputDateFormat),
//     capeCounter: 0,
//   },
//   {
//     id: 20,
//     firstName: 'Megan',
//     lastName: 'Weiss',
//     description: 'the cat whisperer',
//     bornDate: format(new Date(1973, 3, 10), inputDateFormat),
//     capeCounter: 1,
//   },
//   {
//     id: 30,
//     firstName: 'Harold',
//     lastName: 'Morgan',
//     description: 'pen wielder',
//     bornDate: format(new Date(2008, 3, 16), inputDateFormat),
//     capeCounter: 3,
//   },
//   {
//     id: 40,
//     firstName: 'Paris',
//     lastName: 'Papper',
//     description: 'arc trooper',
//     bornDate: format(new Date(1920, 11, 12), inputDateFormat),
//     capeCounter: 4,
//   },
// ];

export const getApiData = async heroesUri => {
  try {
    const response = await axios.get(heroesUri);
    const data = parseList(response);
    return data.map(hero => {
      hero.originDate = format(new Date(hero.originDate), inputDateFormat);
      return hero;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};
