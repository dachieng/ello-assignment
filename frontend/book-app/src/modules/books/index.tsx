import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GetBooksQuery } from "../../gql/graphql";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const Books: React.FC<Props> = () => {
  const { loading, error, data } = useQuery<GetBooksQuery>(GET_BOOKS);

  const [books, setBooks] = useState(data?.books || []);

  const handleDelete = (index: number) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <Box sx={{ p: 2, m: 2 }}>
        {" "}
        <Grid container spacing={3}>
          {books &&
            books?.map((book: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <CustomCard>
                  <CardMedia
                    component="img"
                    alt={book.title}
                    height="200"
                    image={book.coverPhotoURL}
                    title={book.title}
                  />
                  <CardFooter>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold", flex: 1 }}
                    >
                      {book.title}
                    </Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardFooter>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Reading Level: {book.readingLevel}
                    </Typography>
                  </CardContent>
                </CustomCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

const CustomCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const CardFooter = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  marginTop: "auto",
}));

export default Books;
