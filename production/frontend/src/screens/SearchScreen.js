import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import TrackPlayer from "../screens-compo/TrackPlayer";
// import data from "../data";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MessageBox from "../screens-compo/MessageBox";
import { useParams } from "react-router-dom";


const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, tracks: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function SearchScreen() {
    const params = useParams();
    const { title } = params;
    // console.log("title", title);

    const [{ loading, error, tracks }, dispatch] = useReducer(logger(reducer), {
        tracks: [],
        loading: true,
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get("/api/tracks/search?title="+ title);
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err.message });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="tracks">
                <Grid
                    container
                    style={{
                        display: "flex",
                        width: "92%",
                        margin: "auto",
                        justifyContent: "space-evenly",
                        spacing: "2"
                    }}

                >
                    {loading ? (
                        <CircularProgress
                            style={{
                                padding: "2% 45% 2% 45%",
                            }}
                        />
                    ) : error ? (
                        <MessageBox severity="error">{error}</MessageBox>
                    ) : (
                        tracks.map((track) => (
                            <Card
                                style={{ marginTop: "1%", marginBottom: "1%", marginRight: "0.5%", marginLeft: "0.5%" }}
                                sx={{ maxWidth: 345 }}
                                key={track.assetID}>
                                <TrackPlayer track={track}></TrackPlayer>
                            </Card>
                        ))
                    )}
                </Grid>
            </div>
        </div>
    );
}
export default SearchScreen;
