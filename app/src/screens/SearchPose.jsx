import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from "react-native";

const SearchAsana = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // Track if search button is clicked

  // Hardcoded asana list
  const asanas = [
    {
      _id: "1",
      asanaName: "Tadasana",
      englishName: "Mountain Pose",
      benefits: "Improves posture and balance.",
      difficulties: ["Easy"],
    },
    {
      _id: "2",
      asanaName: "Vrikshasana",
      englishName: "Tree Pose",
      benefits: "Enhances concentration and strengthens.",
      difficulties: ["Medium"],
    },
    {
      _id: "3",
      asanaName: "Bhujangasana",
      englishName: "Cobra Pose",
      benefits: "Strengthens the spine and relieves stress.",
      difficulties: ["Easy"],
    },
    {
      _id: "4",
      asanaName: "Adho Mukha Svanasana",
      englishName: "Downward Dog Pose",
      benefits: "Relieves tension and stretches the body.",
      difficulties: ["Intermediate"],
    },
    {
      _id: "5",
      asanaName: "Trikonasana",
      englishName: "Triangle Pose",
      benefits: "Stretches and strengthens the legs and torso.",
      difficulties: ["Easy"],
    },
    {
      _id: "6",
      asanaName: "Utkatasana",
      englishName: "Chair Pose",
      benefits: "Strengthens the thighs and core.",
      difficulties: ["Medium"],
    },
    {
      _id: "7",
      asanaName: "Setu Bandhasana",
      englishName: "Bridge Pose",
      benefits: "Opens the chest and strengthens the spine.",
      difficulties: ["Easy"],
    },
    {
      _id: "8",
      asanaName: "Virabhadrasana",
      englishName: "Warrior Pose",
      benefits: "Increases strength and stability.",
      difficulties: ["Medium"],
    },
    {
      _id: "9",
      asanaName: "Uttanasana",
      englishName: "Standing Forward Bend",
      benefits: "Relieves stress and stretches the hamstrings.",
      difficulties: ["Easy"],
    },
    {
      _id: "10",
      asanaName: "Paschimottanasana",
      englishName: "Seated Forward Bend",
      benefits: "Stretches the back and relieves tension.",
      difficulties: ["Medium"],
    },
  ];

  // Default popular asanas (can be any 3 specific asanas)
  const popularAsanas = [
    asanas[0], // Tadasana
    asanas[1], // Vrikshasana
    asanas[2], // Bhujangasana
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearched(true); // Mark that search was done

    if (!query) {
      setFilteredResults([]);
      return;
    }

    // Filter asanas based on query
    const results = asanas.filter(
      (asana) =>
        asana.asanaName.toLowerCase().includes(query.toLowerCase()) ||
        asana.englishName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(results);
    setSearchQuery("");

    // Dismiss the keyboard after searching
    Keyboard.dismiss();
  };

  const renderAsana = ({ item }) => (
    <TouchableOpacity className="bg-white p-4 rounded-lg mt-2 mb-2 shadow-md">
      <View className="flex-row justify-between items-center mb-[6px]">
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            {item.asanaName}
          </Text>
          <Text className="text-sm text-gray-600">({item.englishName})</Text>
          <Text className="text-sm text-gray-700 mt-1">
            Benefits: {item.benefits || "N/A"}
          </Text>
        </View>
        <Text
          className={`${
            item.difficulties.includes("Easy")
              ? "text-green-500"
              : item.difficulties.includes("Medium")
              ? "text-orange-500"
              : "text-red-500"
          } text-sm font-bold`}
        >
          {item.difficulties.join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <TextInput
        className="h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4"
        placeholder="Search for an asana..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSearch(searchQuery)}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {isSearched && (
        <View className="mb-[4px]">
          {filteredResults.length > 0 ? (
            <FlatList
              data={filteredResults}
              keyExtractor={(item) => item._id}
              renderItem={renderAsana}
              ListEmptyComponent={
                <Text className="text-center text-gray-500 mt-2">
                  No asanas found
                </Text>
              }
            />
          ) : (
            <Text className="text-center text-gray-500 mt-2">
              No results found
            </Text>
          )}
        </View>
      )}

      <Text className="text-lg text-center font-semibold text-gray-700 mt-4 mb-4">
        Popular Yoga Asanas
      </Text>
      <FlatList
        data={popularAsanas}
        keyExtractor={(item) => item._id}
        renderItem={renderAsana}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SearchAsana;
