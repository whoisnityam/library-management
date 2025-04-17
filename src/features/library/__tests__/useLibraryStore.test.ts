import { act } from '@testing-library/react';
import { useLibraryStore } from '../store/useLibraryStore';
import { Book } from '../types/book';

describe('Library Store', () => {
  const mockBooks: Book[] = [
    { id: '101', title: 'The White Tiger', author: 'Aravind Adiga', copies: 2 },
    { id: '102', title: 'Train to Pakistan', author: 'Khushwant Singh', copies: 1 },
    { id: '103', title: 'God of Small Things', author: 'Arundhati Roy', copies: 3 },
    { id: '104', title: 'The Guide', author: 'R. K. Narayan', copies: 2 },
    { id: '105', title: 'Midnight’s Children', author: 'Salman Rushdie', copies: 1 },
  ];

  beforeEach(() => {
    useLibraryStore.setState({
      books: [],
      borrowed: [],
      setBooks: useLibraryStore.getState().setBooks,
      borrowBook: useLibraryStore.getState().borrowBook,
      returnBook: useLibraryStore.getState().returnBook,
    });
  });

  it('should initialize with empty state', () => {
    const { books, borrowed } = useLibraryStore.getState();
    expect(books).toEqual([]);
    expect(borrowed).toEqual([]);
  });

  it('should set books correctly', () => {
    act(() => {
      useLibraryStore.getState().setBooks(mockBooks);
    });

    const { books } = useLibraryStore.getState();
    expect(books).toHaveLength(5);
    expect(books[0].title).toBe('The White Tiger');
  });

  it('should borrow a book if under limit and not already borrowed', () => {
    act(() => {
      useLibraryStore.getState().setBooks(mockBooks);
      useLibraryStore.getState().borrowBook(mockBooks[0]);
    });

    const { books, borrowed } = useLibraryStore.getState();
    expect(borrowed).toHaveLength(1);
    expect(borrowed[0].title).toBe('The White Tiger');
    expect(books.find((b: Book) => b.id === '101')?.copies).toBe(1);
  });

  it('should not borrow more than 2 books', () => {
    act(() => {
      useLibraryStore.getState().setBooks(mockBooks);
      useLibraryStore.getState().borrowBook(mockBooks[0]);
      useLibraryStore.getState().borrowBook(mockBooks[1]);
      useLibraryStore.getState().borrowBook(mockBooks[2]); 
    });

    const { borrowed } = useLibraryStore.getState();
    expect(borrowed).toHaveLength(2);
  });

  it('should not borrow the same book twice', () => {
    act(() => {
      useLibraryStore.getState().setBooks(mockBooks);
      useLibraryStore.getState().borrowBook(mockBooks[0]);
      useLibraryStore.getState().borrowBook(mockBooks[0]); 
    });

    const { borrowed } = useLibraryStore.getState();
    expect(borrowed).toHaveLength(1);
    expect(borrowed[0].id).toBe('101');
  });

  it('should return a book and update library stock', () => {
    act(() => {
      useLibraryStore.getState().setBooks(mockBooks);
      useLibraryStore.getState().borrowBook(mockBooks[0]);
      useLibraryStore.getState().returnBook(mockBooks[0].id);
    });

    const { books, borrowed } = useLibraryStore.getState();
    expect(borrowed).toHaveLength(0);
    const restoredBook = books.find((b: Book) => b.id === mockBooks[0].id);
    expect(restoredBook?.copies).toBe(2);
  });
});
