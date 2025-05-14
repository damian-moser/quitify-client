import util from "@/util";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function App() {
  const [facing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    checkRoute();
  }, []);

  const checkRoute = async () => {
    const token = await util.getItemWithTTL("authToken");
    if (!token) {
      router.push("/");
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const processImage = async () => {
    if (!photo) return;

    const response = await fetch(photo);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("multipartFile", blob, "receipt.png");

    const token = await util.getItemWithTTL("authToken");

    try {
      const response = await fetch("http://localhost:8080/api/ocr", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ein Fehler ist aufgetreten");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      alert(error);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: true,
      });
      if (picture && picture.uri) {
        setPhoto(picture.uri);
      } else {
        console.warn("Failed to take picture or picture has no URI.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.container}>
          <Image source={{ uri: photo }} style={styles.camera} />
          <Button
            color={"#000"}
            title="verwenden"
            onPress={() => processImage()}
          />
          <Button
            title="nochmals eins aufnehmen"
            onPress={() => setPhoto(null)}
          />
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
