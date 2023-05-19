import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function App() {
  const [inputValue, setInputValue] = useState("");

  const [height, setHeight] = useState(40);
  const handleContentSizeChange = (event) => {
    setHeight(event.nativeEvent.contentSize.height);
  };
  const [taskid, setTaskid] = useState();
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemPressedit = (item) => {
    setSelectedItem(item);
    setTaskid(item.id);
    setInputValue(item.value);
    console.log(selectedItem);
    console.log(taskid);
  };
  const [isRender, setisRender] = useState(false);

  const [taskItems, setTaskItems] = useState([]);
  const handlepress = () => {
    setHeight(42);

    setListData([
      ...listData,
      { id: Date.now().toString(), value: inputValue },
    ]);

    setInputValue("");

    console.log("listdata", listData);
  };
  const handleTextInputChange = (text) => {
    setInputValue(text);
    console.log(inputValue);
  };

  const renderTask = ({ item }) => (
    <View style={styles.containe}>
      <View style={styles.items}>
        <Text style={styles.itemText}>{item.value}</Text>
        <View style={{ top: 50, left: "50%", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleItemPressedit(item)}>
            <AntDesign
              name="edit"
              size={20}
              color="indigo"
              style={{ alignItems: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <AntDesign
              name="delete"
              size={20}
              color="indigo"
              style={{ marginLeft: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTextInputSubmit()}>
            <AntDesign
              name="save"
              size={20}
              color="indigo"
              style={{ marginLeft: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const deleteItem = (itemId) => {
    setListData((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const handleTextInputSubmit = (item) => {
    const updatedTasks = listData.map((task) => {
      if (task.id === taskid) {
        task.value = inputValue;
        return task;
      }
      return task;
    });
    setListData(updatedTasks);

    setSelectedItem(null);
    setInputValue("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO App</Text>
      <View style={[styles.container1, { height }]}>
        <TextInput
          style={[styles.input, { height }]}
          placeholder={"Add new task"}
          onContentSizeChange={handleContentSizeChange}
          multiline={true}
          onChangeText={handleTextInputChange}
          height={height}
          value={inputValue}
          editable={true}
        />

        <TouchableOpacity onPress={() => handlepress()}>
          <AntDesign name="plussquare" size={20} color="indigo"></AntDesign>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Tasks</Text>
      <FlatList
        data={listData}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  items: {
    backgroundColor: "lightgreen",
    width: "100%",
    height: 200,
    borderRadius: 10,

    alignItems: "flex-start",

    borderWidth: 5,
    borderColor: "green",
  },
  containe: {
    flex: 1,

    marginTop: 15,
  },
  input: {
    fontSize: 20,
  },
  container1: {
    marginTop: 10,
    height: 50,
    width: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: "lightgreen",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    fontWeight: "100",
  },
  input: {
    fontSize: 20,
  },
  heading: {
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "100",
    marginTop: 10,
  },
  itemText: {
    fontSize: 26,
  },
});
