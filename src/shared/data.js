import { format } from 'date-fns';

import { inputDateFormat } from './constants';

import axios from 'axios';

import { API } from '@/shared';

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

const getApiData = async () => {
  try {
    const response = await axios.get(`${API}/heroes`);
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

const getHero = async id => {
  try {
    const response = await axios.get(`${API}/heroes/${id}`);
    let hero = parseItem(response, 200);
    return hero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateHero = async hero => {
  try {
    const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
    const updatedHero = parseItem(response, 200);
    return updatedHero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
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

export { getApiData, getHero, updateHero };
