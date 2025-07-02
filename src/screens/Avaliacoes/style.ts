import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex:1,
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 2,
    borderRadius: 8,
  },
  separador:{
    height:1,
    backgroundColor:'orange',
    marginVertical:2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  comentario: {
    marginVertical: 8,
    fontStyle: "italic",
    color: "#555",
  },
  usuario: {
    fontSize: 14,
    color: "#f5a623",
  },
  data: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },

});
