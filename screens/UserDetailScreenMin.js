import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreenMin = (props) => {
  const initialState = {
    id: "",
    name: "",
    
    phone: "",
    
    description:"",
    destination:"",
    price:"",
    range:""
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      
      phone: user.phone,
      
      
      description:user.description,
      destination:user.destination,
      price:user.price,
      range:user.range
      
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          
          placeholder="description"
          style={styles.inputGroup}
          value={user.description}
          onChangeText={(value) => handleTextChange(value, "description")}
        />
      </View>
      <View>
        <TextInput
          
          placeholder="range"
          style={styles.inputGroup}
          value={user.range}
          onChangeText={(value) => handleTextChange(value, "range")}
        />
      </View>
      <View>
        <TextInput
          placeholder="destination"
         
          style={styles.inputGroup}
          value={user.destination}
          onChangeText={(value) => handleTextChange(value, "destination")}
        />
      </View>

      <View>
        <TextInput
          placeholder="price"
          
          style={styles.inputGroup}
          value={user.price}
          onChangeText={(value) => handleTextChange(value, "price")}
        />
      </View>


    <Text>Чтобы увидеть контакты заказчика,вам необходимо войти в систему!</Text>

      {/* <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreenMin;
