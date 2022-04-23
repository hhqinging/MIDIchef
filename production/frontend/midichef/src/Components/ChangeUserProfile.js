





import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Forms from './Forms';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const theme = createTheme();
const Input = styled('input')({
    display: 'none',
});

export default function CreateForm() {
    const handleSubmit = (event) => {
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        User Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    name="name"
                                // autoComplete="tilte"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="Description"
                                    label="Description"
                                    id="Description"
                                />
                            </Grid>


                            <Grid item xs={12}>
                                img
                                <label htmlFor="contained-button-file">
                                    <Input id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" component="span">
                                        Upload
                                    </Button>
                                </label>

                            </Grid>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>

                        </Grid>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>


    );
}
