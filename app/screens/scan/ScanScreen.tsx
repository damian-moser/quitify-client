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
  Modal,
  Alert,
  Pressable,
} from "react-native";

interface OcrResponse {
  currency: string;
  date: number;
  name: string;
  sum: number;
  result: string;
}

export default function App() {
  const [facing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<OcrResponse>();

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

      const result: OcrResponse = await response.json();
      console.log(result);
      setModalContent(result);
      setModalVisible(true);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalHeader}>{modalContent?.name}</Text>
              <Text style={styles.modalText}>
                {modalContent?.currency} {modalContent?.sum}
              </Text>
              <Text style={styles.modalText}>
                {new Date(
                  modalContent?.date ? modalContent.date : new Date()
                ).toDateString()}
              </Text>
              <Text style={styles.modalText}>{modalContent?.result}</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Schliessen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 512,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeader: {
    marginBottom: 20,
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
  },
});
