import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: 'white',
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButtonText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginLeft: 10,
    },
    saveButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});