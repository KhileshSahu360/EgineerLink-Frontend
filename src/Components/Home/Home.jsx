import "./Home.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Post from '../Post/Post'
import Toppost from "./Toppost";
import Button from '@mui/material/Button'; // Import Button from @mui/material
import LogoutIcon from '@mui/icons-material/Logout';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

// Define Postcont as a component
function Postcont() {
    return (
        <Item style={{ marginTop: '20px' }}>
            <div className="proright">
                <div>
                    <Post />
                </div>
            </div>
        </Item>
    );
}

export default function Home() {
    return (
          
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Item>
                                <div className="proleft">
                                    <div className="protop"></div>
                                    <div className="probottom relative">
                                        <hr />
                                        <div className="id"><img className="absolute top-[-100%] left-[35%]" src="https://wallpapers.com/images/featured/professor-money-heist-1yegj3ptnd8g5noc.jpg" alt="profile" /></div>
                                        <h1>Rahul_00</h1>
                                        <hr />
                                        <div className="btncen">
                                            <Button variant="contained" size="large" sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <span style={{ marginRight: '15px', marginTop: '0px', }}><LogoutIcon /></span>
                                                Log Out
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Item>
                                <div className="proright">
                                    <div>
                                        <Toppost />
                                    </div>
                                </div>
                            </Item>
                            <Postcont />
                            <Postcont />
                            <Postcont />
                            <Postcont />
                            
                        </Grid>
                    </Grid>
                </Box>
    );
}
