import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

import ListItemSeperator from "../components/ListItemSeperator";
import MovieScreenListLayout from "../components/MovieScreenListLayout";
import { Text, View } from "../components/Themed";
import { API_URL, BASE_URL } from "../constants/API_Detail";
import { MoviesInterface, Result } from "../interface/MoviesDataClass";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
interface INavArgument{
  title: string;
  id:string
}

// { navigation }: RootTabScreenProps<"TabOne">
export default function TabOneScreen({ navigation }) {
  const [apiResult, setApiResult] = useState<Result[]>([]);
  const [loading, setLoading] = React.useState(false);

  // const handlePress = ({ title, id }) => {};
  interface IapiParam  {
    parameter: string
  }
  // const handlePress = ({parammm}:any) => navigation.navigate(screen:"Modal",param: parammm);

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

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Movies</Text>

      <FlatList
        style={{
          marginEnd: 10,
          backgroundColor: Colors.light.translucent_gray,
        }}
        showsVerticalScrollIndicator={false}
        data={apiResult}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MovieScreenListLayout
            title={item.title}
            data={item.overview}
            image={item.poster_path}
            onPress={() => navigation.navigate("Modal",{movieId:item.id})}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flatListStyle: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  }
});
