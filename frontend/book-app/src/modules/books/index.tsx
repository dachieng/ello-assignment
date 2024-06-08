import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import CustomCombobox from "../../components/Combobox";
import type { GetBooksQuery } from "../../gql/graphql";

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
  const [search, setSearch] = useState("");

  const filteredBooks =
    books.filter((book) =>
      book?.title?.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  const handleDelete = (index: number) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  const handleOptionChange = (
    value: string,
    option?: { title: string; coverPhotoURL: string; readingLevel: string }
  ) => {
    setSearch(value);
  };

  useEffect(() => {
    if (data) {
      setBooks(data.books ?? []);
    }
  }, [data]);

  if (error) return toast.error(error.message);

  return (
    <div>
      <Box sx={{ p: 2, m: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CustomCombobox
            label=""
            placeholder="Select a book"
            // @ts-ignore
            options={books ? books : []}
            renderOption={(option: any, index) => (
              <>
                <img src={option.coverPhotoURL} alt={option.title} width="50" />
                <span style={{ marginLeft: 10 }}>{option.title}</span>
              </>
            )}
            renderOptionString={(option) => option?.title || ""}
            onChange={handleOptionChange}
          />
        </Box>{" "}
        <Grid container spacing={3}>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            filteredBooks &&
            filteredBooks?.map((book: any, index: number) => (
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
            ))
          )}
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
