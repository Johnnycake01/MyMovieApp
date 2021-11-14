import { StatusBar } from "expo-status-bar";
import React, { useEffect} from "react";
import { EvilIcons } from "@expo/vector-icons";
import { ActivityIndicator, Image, StyleSheet, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
import { MoviesInterface, Result } from "../interface/MoviesDataClass";
import { Pokedex, IResult } from "../interface/MovieTrailerData";
import axios from "axios";
import {
  API_KEY,
  API_URL,
  BASE_URL,
} from "../constants/API_Detail";
import MovieTrailer from "../components/MovieTrailer";


let isAdult: Boolean = false;
export default function ModalScreen({ route }) {
  const [apiResult, setApiResult] = React.useState<Result[]>([]);
  const [movieResult, setMovieResult] = React.useState<IResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { movieId } = route.params;

  console.log("id is " + movieId);

  useEffect(() => {
    setLoading(true);
    axios
      .get<MoviesInterface>(BASE_URL + API_URL)
      .then((response) => {
        setApiResult(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Pokedex>(BASE_URL + `movie/${movieId}/videos?api_key=${API_KEY}`)
      .then((response) => {
        setMovieResult(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );

  let movie: Result = new Result();
  apiResult.forEach((element) => {
    if (element.id === movieId) {
      movie = element;
    }
  });
  isAdult = movie.adult;
  return (
    <View style={styles.container}>
      <View style={{ height: 200, marginBottom:10}}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          style={{
            height: 300,
          }}
          data={movieResult}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <MovieTrailer videoId={item.key} />}
        />
      </View>

      <Text style={styles.movieTitle}>{movie.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          source={require("../assets/images/eighteenPlus.jpeg")}
          style={styles.overEighteenImage}
          resizeMode={"cover"}
        />
        <Text style={{ marginEnd: 20, marginStart: 5 }}>
          release date: {movie.release_date}
        </Text>
        <Text>{movie.vote_average}</Text>
        <EvilIcons
          name="star"
          size={18}
          color="black"
          style={{ justifyContent: "center", alignSelf: "center" }}
        />
      </View>
      <Text style={styles.movieDetail}> {movie.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageProps: {
    width: "100%",
    height: 300,
  },
  movieTitle: {
    fontWeight: "700",
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
  },
  movieDetail: {
    fontWeight: "500",
    fontSize: 15,
    marginHorizontal: 5,
    textAlign: "justify",
  },
  overEighteenImage: {
    opacity: isAdult ? 1 : 0,
    width: 30,
    height: 30,
    position: "absolute",
    end: 10,
    top: -27,
  },
});
