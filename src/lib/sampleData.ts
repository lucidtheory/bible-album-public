/* eslint-disable import/prefer-default-export */
import { IBook } from 'api/types';
import { bibleBooks } from 'lib/sort';

export const BOOK_IMAGE_URL = 'http://www.petsworld.in/blog/wp-content/uploads/2015/03/How-To-Make-Your-Puppy-Gain-Weight.jpg';

export const sampleLibrary: IBook[] = bibleBooks.map((b) => ({
  id: `book-${Math.random()}-${Math.random()}-${Math.random()}-${Math.random()}`,
  coverImageUrl: BOOK_IMAGE_URL,
  title: b,
  bookUrl: 'https://www.google.com',
  pageCount: 21,
}));

export const defaultCurrentPages: { [book: string ]: number } = {};

bibleBooks.forEach((b) => {
  defaultCurrentPages[b] = 1;
});
