import {
    Container,
    Typography,
    Divider,
    Stack,
  } from '@mui/material';
  import { useLibraryStore } from './store/useLibraryStore';
  import { mockBooks } from './data/books';
  import { useEffect } from 'react';
import BookCard from '../../components/BookCard';
  
  export default function Library() {
    const books = useLibraryStore((s) => s.books);
    const borrowed = useLibraryStore((s) => s.borrowed);
    const setBooks = useLibraryStore((s) => s.setBooks);
    const borrowBook = useLibraryStore((s) => s.borrowBook);
    const returnBook = useLibraryStore((s) => s.returnBook);
  
    useEffect(() => {
      setBooks(mockBooks);
    }, [setBooks]);
  
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* 📚 Library Section */}
          <Stack spacing={2}>
            <Typography variant="h4">📚 Library</Typography>
            <Stack spacing={2}>
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isBorrowed={false}
                  onAction={() => borrowBook(book)}
                />
              ))}
            </Stack>
          </Stack>
  
          <Divider />
  
          {/* 🧾 Borrowed Section */}
          <Stack spacing={2}>
            <Typography variant="h4">🧾 Borrowed Books</Typography>
            {borrowed.length > 0 ? (
              <Stack spacing={2}>
                {borrowed.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    isBorrowed={true}
                    onAction={() => returnBook(book.id)}
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body1">No books borrowed.</Typography>
            )}
          </Stack>
        </Stack>
      </Container>
    );
  }
  