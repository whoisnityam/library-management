import { create, StateCreator } from 'zustand';
import { Book } from '../types/book';

type LibraryState = {
  books: Book[];
  borrowed: Book[];
  setBooks: (books: Book[]) => void;
  borrowBook: (book: Book) => void;
  returnBook: (bookId: string) => void;
};

const libraryStore: StateCreator<LibraryState, [], [], LibraryState> = (set, get) => ({
  books: [],
  borrowed: [],

  setBooks: (books: Book[]) => set({ books }),

  borrowBook: (book: Book): void => {
    const { books, borrowed } = get();

    const alreadyBorrowed: boolean = borrowed.some((b: Book): boolean => b.id === book.id);
    if (borrowed.length >= 2 || alreadyBorrowed) return;

    const updatedBooks: Book[] = books
      .map((b: Book): Book =>
        b.id === book.id ? { ...b, copies: b.copies - 1 } : b
      )
      .filter((b: Book): boolean => b.copies > 0);

    set({
      books: updatedBooks,
      borrowed: [...borrowed, { ...book, copies: 1 }],
    });
  },

  returnBook: (bookId: string): void => {
    const { books, borrowed } = get();

    const returningBook: Book | undefined = borrowed.find(
      (b: Book): boolean => b.id === bookId
    );
    if (!returningBook) return;

    const existing: Book | undefined = books.find(
      (b: Book): boolean => b.id === bookId
    );

    const updatedBooks: Book[] = existing
      ? books.map((b: Book): Book =>
          b.id === bookId ? { ...b, copies: b.copies + 1 } : b
        )
      : [...books, { ...returningBook, copies: 1 }];

    set({
      books: updatedBooks,
      borrowed: borrowed.filter((b: Book): boolean => b.id !== bookId),
    });
  },
});

export const useLibraryStore = create<LibraryState>(libraryStore);
