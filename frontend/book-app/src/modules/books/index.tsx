import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";

import CustomCombobox from "../../components/Combobox";

import "react-toastify/dist/ReactToastify.css";

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
  justifyContent: "space-between",
  padding: theme.spacing(2),
  marginTop: "auto",
}));

const Books: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState(data?.books || []);
  const [search, setSearch] = useState<string>("");

  const handleDelete = (index: number) => {
    setBooks((prevBooks: any) =>
      prevBooks.filter((_: any, i: number) => i !== index)
    );
  };

  const handleOptionChange = (
    value: string,
    option?: { title: string; coverPhotoURL: string; readingLevel: string }
  ) => {
    setSearch(value);
    console.log("Selected:", value, option);
  };

  const filteredBooks = books.filter((book: any) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (data && data.books) {
      setBooks(data.books);
    }
  }, [data]);

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  return (
    <Box m={4}>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        <CustomCombobox
          label="Book"
          placeholder="Select a book"
          options={books}
          renderOption={(option, index) => (
            <>
              <img src={option.coverPhotoURL} alt={option.title} width="50" />
              <span style={{ marginLeft: 10 }}>{option.title}</span>
            </>
          )}
          renderOptionString={(option) => option?.title || ""}
          onChange={handleOptionChange}
        />
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredBooks.map((book: any, index: number) => (
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
      )}
    </Box>
  );
};

export default Books;
