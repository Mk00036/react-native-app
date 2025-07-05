import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import useFetchCompetitions from "../hooks/useFetchCompetitions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const HomeScreen = () => {
  const { data, loading, error } = useFetchCompetitions();
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <FlatList
      data={Array.isArray(data) ? data : [data]}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.emblem && (
            <Image source={{ uri: item.emblem }} style={styles.image} />
          )}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subText}>
            {item.area?.name ?? "N/A"} ({item.area?.code})
          </Text>
          <Text style={styles.typeTag}>
            {item.type} • {item.plan}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Seasons Available:</Text>
            <Text style={styles.value}>
              {item?.numberOfAvailableSeasons ?? 0}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Start:</Text>
            <Text style={styles.value}>
              {item?.currentSeason?.startDate ?? "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>End:</Text>
            <Text style={styles.value}>
              {item?.currentSeason?.endDate ?? "N/A"}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: "#F2F2F2", // light grey background
  },
  card: {
    backgroundColor: "#FFFFFF", // white card
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: "#2E3A59", // deep indigo for title
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#8A8A8A", // soft grey
    textAlign: "center",
    marginBottom: 4,
  },
  typeTag: {
    fontSize: 13,
    color: "#4CB5AB", // soft teal for tags
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6D6D6D", // medium grey
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A", // near-black for strong text
  },
});


export default HomeScreen;
