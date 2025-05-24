import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [result, setResult] = useState<"" | "Heads" | "Tales">("");
  const [caption, setCaption] = useState<"" | "Heads" | "Tales">("");

  let head = require("../assets/images/heads.svg");
  let tail = require("../assets/images/tails.svg");

  const rotation = useSharedValue(0);
  const width = useSharedValue(1);

  const flip = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${rotation.value}deg` as `${number}deg`,
      },
    ],
  }));
  const size = useAnimatedStyle(() => ({
    transform: [{ scaleX: withSpring(width.value) }],
  }));

  const handlePress = () => {
    setCaption("");
    width.value = withSequence(
      withRepeat(
        withTiming(0.5, {
          duration: 200,
        }),
        6,
        true
      ),
      withTiming(1, {
        duration: 200,
      })
    );

    rotation.value = withSequence(
      withTiming(360 * 7, { duration: 1400 }),
      withTiming(0, { duration: 0 })
    );

    const myInterval = setInterval(() => {
      setResult((prev) => (prev === "Heads" ? "Tales" : "Heads"));
    }, 200);

    setTimeout(() => {
      clearInterval(myInterval);
      const flip = Math.random() > 0.5 ? "Heads" : "Tales";
      setResult(flip);
      setCaption(flip);
    }, 1400);
  };

  const AnimatedImage = Animated.createAnimatedComponent(Image);
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "#404A65",
          alignItems: "center",
          justifyContent: "space-around",
        },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={[
            {
              fontSize: 64,
              fontWeight: "600",
              color: "#ECEDF0",
              textShadowColor: "#35383F",
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 1,
            },
          ]}
        >
          Flip the coin.
        </Text>
        <Text style={[{ color: "#ECEDF0", fontSize: 20, fontWeight: "600" }]}>
          Press the coin or the button to flip the coin
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <AnimatedImage
          style={[
            styles.image,
            { marginBottom: 24 },
            // { transform: [{ translateY: -100 }] },
            flip,
          ]}
          source={result === "Heads" ? head : tail}
          // animatedProps={animatedProps}
        />
        <AnimatedImage
          style={[
            {
              width: 80,
              height: 7,
            },
            size,
          ]}
          source={require("../assets/images/shadow.svg")}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={[
            {
              color: "#ECEDF0",
              fontSize: 24,
              fontWeight: "600",
              marginBottom: 24,
            },
          ]}
        >
          {caption}
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            {
              backgroundColor: "#1F6FB0",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 5,
            },
          ]}
        >
          <Text style={[{ color: "#ECEDF0", fontSize: 24, fontWeight: "600" }]}>
            Random
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mt100: {
    marginTop: 100,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: "#fcb003",
  },
});
