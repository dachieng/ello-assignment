import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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
  const { loading, error, data } = useQuery(GET_BOOKS);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <Box sx={{ p: 2, m: 2 }}>
        {" "}
        <Grid container spacing={3}>
          {data &&
            data.books.map((book: any, index: number) => (
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
                    <Typography variant="h6" component="div">
                      {book.title}
                    </Typography>
                  </CardFooter>
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
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  marginTop: "auto",
}));

export default Books;
