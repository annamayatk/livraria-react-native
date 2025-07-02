import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    color: '#F57C00'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  imagem: {
    width: 60,
    height: 90,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  autor: {
    fontSize: 14,
    color: '#666',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});