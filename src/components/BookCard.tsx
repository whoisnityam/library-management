import {
    Card,
    CardContent,
    Typography,
    Button,
    CardActions,
  } from '@mui/material';
import { Book } from '../features/library/types/book';
  
  interface BookCardProps {
    book: Book;
    isBorrowed: boolean;
    onAction: () => void;
  }
  
  export default function BookCard({
    book,
    isBorrowed,
    onAction,
  }: BookCardProps) {
    return (
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {book.author}
          </Typography>
          {!isBorrowed && (
            <Typography variant="body2" color="text.secondary">
              {book.copies} {book.copies === 1 ? 'copy' : 'copies'} available
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color={isBorrowed ? 'secondary' : 'primary'}
            onClick={onAction}
            disabled={!isBorrowed && book.copies <= 0}
          >
            {isBorrowed ? 'Return' : 'Borrow'}
          </Button>
        </CardActions>
      </Card>
    );
  }
  