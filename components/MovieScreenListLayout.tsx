import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Pressable,
} from "react-native";
import { IMAGE_BASE_URL } from "../constants/API_Detail";

import Colors from "../constants/Colors";
import { Text, View } from "./Themed";
interface IPath {
  image: any;
  title: String;
  data: String;
  onPress: any;
}

export default function MovieScreenListLayout(path: IPath) {
  return (
    <Pressable
      onPress={path.onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <View style={styles.listContainer}>
        <Image
          style={styles.cardImage}
          source={{ uri: IMAGE_BASE_URL + path.image }}
        />
        <View style={{ marginEnd: 10, width: 220 }}>
          <Text style={styles.titleText}>{path.title}</Text>
          <Text
            style={styles.overViewText}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {path.data}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardInnerContainer: {
    padding: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 5,
    flexDirection: "row",
  },
  titleText: {
    fontSize: 15,
    marginVertical: 10,
    fontWeight: "700",
  },
  overViewText: {
    fontSize: 14,
    marginEnd: 10,
    paddingEnd: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
