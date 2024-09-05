import React from "react";
import {
  Modal,
  TextInput,
  Portal,
  Dialog,
  Button,
  HelperText,
} from "react-native-paper";
import {
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon_2 from "react-native-vector-icons/FontAwesome6";
import ButtonPerso from "../../../components/UI/ButtonPerso";
import { theme } from "../../../utils/theme";
import { createCustomer } from "../../../utils/functions/customer_functions";
import { nameRegex, phoneNumberRegex, emailRegex, addressRegex, postalCodeRegex, cityRegex, notesRegex } from "../../../utils/regex";

interface AddClientModalProps {
  visible: boolean;
  onDismiss: () => void;
}

interface Client {
  name: string;
  email?: string;
  phone: string;
  addressType: string;
  address: string;
  postalCode: string;
  city: string;
  note: string;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  visible,
  onDismiss,
}) => {
  const [client, setClient] = React.useState<Client>({
    name: "",
    email: "",
    phone: "",
    addressType: "Livraison",
    address: "",
    postalCode: "",
    city: "",
    note: "",
  });

  const [confirmationVisible, setConfirmationVisible] = React.useState(false);
  const [successMessageVisible, setSuccessMessageVisible] =
    React.useState(false);
  const [createdClient, setCreatedClient] = React.useState<{
    name: string;
    id: string | null;
  }>({
    name: "",
    id: null,
  });

  const handleAddressTypeChange = (type: string) => {
    setClient({ ...client, addressType: type });
  };

  const handleCreateCustomer = async (customer: Client) => {
    let customerData: any = {
      Name: customer.name,
      NotesClear: customer.note,
    };

    if (customer.addressType === "Livraison") {
      customerData.MainDeliveryContact_Email = customer.email;
      customerData.MainDeliveryContact_CellPhone = customer.phone;
      customerData.MainDeliveryAddress_Address1 = customer.address;
      customerData.MainDeliveryAddress_ZipCode = customer.postalCode;
      customerData.MainDeliveryAddress_City = customer.city;
    } else {
      customerData.MainInvoicingContact_Email = customer.email;
      customerData.MainInvoicingContact_CellPhone = customer.phone;
      customerData.MainInvoicingAddress_Address1 = customer.address;
      customerData.MainInvoicingAddress_ZipCode = customer.postalCode;
      customerData.MainInvoicingAddress_City = customer.city;
    }

    try {
      const response = await createCustomer(customerData);
      setCreatedClient({ name: response.Name, id: response.Id });
      setSuccessMessageVisible(true);
      setConfirmationVisible(false);
      onDismiss();
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);
  const hideSuccessMessage = () => setSuccessMessageVisible(false);


  //? ----------------------------------------------------------------------------------- Regex validation ---------------------------------------------------------------------------------------- */
  const hasErrorsName = () => {
    const name = client.name.trim();
    if (name === "") {
      return false;
    }
    const hasLetter = /[A-Za-zÀ-ÿ]/.test(name);
    const isValidName = nameRegex(name);
    return !(hasLetter && isValidName);
  };

  const hasErrorsPhone = () => {
    const phone = client.phone.trim();
    if (phone === "") {
      return false;
    }
    const isValidPhone = phoneNumberRegex(phone);
    return !isValidPhone;
  };

  const hasErrorsEmail = () => {
    const email = client.email ? client.email.trim() : "";

    if (email === "") {
      return false;
    }

    const isValidEmail = emailRegex(email);
    return !isValidEmail;
  };

  const hasErrorsAddress = () => {
    const address = client.address.trim();
    if (address === "") {
      return false;
    }
    const isValidAddress = addressRegex(address);
    return !isValidAddress;
  };

  const hasErrorsPostalCode = () => {
    const postalCode = client.postalCode.trim();
    if (postalCode === "") {
      return false;
    }
    const isValidPostalCode = postalCodeRegex(postalCode);
    return !isValidPostalCode;
  };

  const hasErrorsCity = () => {
    const city = client.city.trim();
    if (city === "") {
      return false;
    }
    const isValidCity = cityRegex(city);
    return !isValidCity;
  };

  const hasErrorsNotes = () => {
    const note = client.note.trim();
    if (note === "") {
      return false;
    }
    const isValidNote = notesRegex(note);
    return !isValidNote;
  };

  const handleClose = () => {
    setClient({
      name: "",
      email: "",
      phone: "",
      addressType: "Livraison",
      address: "",
      postalCode: "",
      city: "",
      note: "",
    });
    onDismiss();
  }

  return (
    <>
      <Modal visible={visible} onDismiss={onDismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ height: "100%" }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View className="h-9.5/10 w-9.5/10 bg-white self-center rounded-lg items-center">
              <TouchableOpacity
                className="absolute top-0 right-0 p-2 z-10"
                onPress={handleClose}
              >
                <Icon name="close" size={25} color="#e11d48" />
              </TouchableOpacity>
              <SafeAreaView className="h-9/10 w-full items-center pt-4">
                {/*---------------------------------------- Nom du client -----------------------------*/}
                <View className="w-full mt-6">
                  <View className="flex-row h-10 w-full justify-evenly items-center">
                    <Icon
                      name="person"
                      size={30}
                      color={`${theme.accent}`}
                      className="w-2/10"
                    />
                    <TextInput
                      placeholder="Nom du client"
                      className="justify-center w-8/10 rounded-xl  bg-white border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800"
                      value={client.name}
                      onChangeText={(text) =>
                        setClient({ ...client, name: text })
                      }
                    />
                  </View>
                  <HelperText type="error" visible={hasErrorsName()}>
                    Le nom du client est invalide
                  </HelperText>
                </View>
                {/*---------------------------------------- Tel du client -----------------------------*/}
                <View className="w-full ">
                  <View className="flex-row h-10 w-full justify-evenly items-center">
                    <Icon
                      name="contact-phone"
                      size={30}
                      color={`${theme.accent}`}
                      className="w-2/10"
                    />
                    <TextInput
                      placeholder="Téléphone"
                      className="justify-center w-8/10 rounded-xl  bg-white border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800"
                      value={client.phone}
                      onChangeText={(text) =>
                        setClient({ ...client, phone: text })
                      }
                    />
                  </View>
                  <HelperText type="error" visible={hasErrorsPhone()}>
                    Le numéro de téléphone doit comporter 10 chiffres
                  </HelperText>
                </View>
                {/*---------------------------------------- Email du client -----------------------------*/}
                <View className="w-full ">
                  <View className="flex-row h-10 w-full justify-evenly items-center">
                    <Icon
                      name="email"
                      size={30}
                      color={`${theme.accent}`}
                      className="w-2/10"
                    />
                    <TextInput
                      placeholder="Email"
                      className="justify-center w-8/10 rounded-xl  bg-white border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800"
                      value={client.email}
                      onChangeText={(text) =>
                        setClient({ ...client, email: text })
                      }
                    />
                  </View>
                  <HelperText type="error" visible={hasErrorsEmail()}>
                    L'email n'est pas valide
                  </HelperText>
                </View>
                {/*---------------------------------------- Selection type adresse -----------------------------*/}
                <View className="flex-row w-10/10 gap-1 mb-5 justify-center">
                  <TouchableOpacity
                    className={`w-4.5/10 items-center h-14 justify-center rounded-xl ${
                      client.addressType === "Livraison"
                        ? "border-2 border-blue-800 bg-gray-100"
                        : "bg-white"
                    }`}
                    onPress={() => handleAddressTypeChange("Livraison")}
                  >
                    <Icon_2
                      name="truck"
                      size={20}
                      color={`${
                        client.addressType === "Livraison"
                          ? "#1e3a8a"
                          : "#e5e7eb"
                      }`}
                    />
                    <Text
                      className={`text-lg ${
                        client.addressType === "Livraison"
                          ? "text-blue-800"
                          : "opacity-10"
                      }`}
                    >
                      Livraison
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`w-4.5/10 items-center h-14 justify-center rounded-xl ${
                      client.addressType === "Facturation"
                        ? "border-2 border-blue-800 bg-gray-100"
                        : "bg-white"
                    }`}
                    onPress={() => handleAddressTypeChange("Facturation")}
                  >
                    <Icon_2
                      name="file-invoice-dollar"
                      size={20}
                      color={`${
                        client.addressType === "Facturation"
                          ? "#1e3a8a"
                          : "#e5e7eb"
                      }`}
                    />
                    <Text
                      className={`text-lg ${
                        client.addressType === "Facturation"
                          ? "text-blue-800"
                          : "opacity-10"
                      }`}
                    >
                      Facturation
                    </Text>
                  </TouchableOpacity>
                </View>
                {/*---------------------------------------- adresse -----------------------------*/}
                <View className="w-full ">
                  {/*---------------------------------------- Selection type adresse -----------------------------*/}
                  <View className="w-full ">
                  <View className="flex-row h-10 w-full justify-evenly items-center">
                    <Icon
                      name="home"
                      size={30}
                      color={`${theme.accent}`}
                      className="w-2/10"
                    />
                    <TextInput
                      placeholder="Adresse"
                      className="justify-center w-8/10 rounded-xl  bg-white border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800"
                      value={client.address}
                      onChangeText={(text) =>
                        setClient({ ...client, address: text })
                      }
                    />
                  </View>
                  <HelperText type="error" visible={hasErrorsAddress()}>
                    L'adresse est invalide
                  </HelperText>
                  </View>
                  {/*---------------------------------------- CP + ville -----------------------------*/}
                  <View className="flex-row h-10 w-full justify-evenly  mb-10">
                    <View className="w-3/10">
                    <TextInput
                      placeholder="Code postal"
                      className="justify-center w-full rounded-xl  bg-white border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800"
                      value={client.postalCode}
                      onChangeText={(text) =>
                        setClient({ ...client, postalCode: text })
                      }
                    />
                    <HelperText type="error" visible={hasErrorsPostalCode()}>
                      CP invalide
                    </HelperText>
                    </View>
                    <View className="w-6/10">
                    <TextInput
                      placeholder="Ville"
                      className="justify-center w-full rounded-xl  bg-white border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800"
                      value={client.city}
                      onChangeText={(text) =>
                        setClient({ ...client, city: text })
                      }
                    />
                    <HelperText type="error" visible={hasErrorsCity()}>
                      La ville est invalide
                    </HelperText>
                    </View>
                  </View>
                                 </View>
                {/*---------------------------------------- Note -----------------------------*/}
                <View className="w-full ">
                <View className="flex-row w-full h-24 justify-evenly items-center">
                  <Icon
                    name="note"
                    size={30}
                    color={`${theme.accent}`}
                    className="w-2/10"
                  />
                  <TextInput
                    placeholder="..."
                    multiline={true}
                    numberOfLines={8}
                    className="justify-center w-8/10 rounded-xl  bg-white border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800"
                    value={client.note}
                    onChangeText={(text) =>
                      setClient({ ...client, note: text })
                    }
                  />
                </View>
                < HelperText type="error" visible={hasErrorsNotes()}>
                  La note est invalide
                </HelperText>
                </View>
              </SafeAreaView>
              {/*---------------------------------------- Bouton ajouter -----------------------------*/}
              <ButtonPerso
                css="w-9.5/10 bg-blue-800"
                icon="account-plus"
                mode="contained"
                text="Ajouter"
                onPress={showConfirmation}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <Portal>
        <Dialog visible={confirmationVisible} onDismiss={hideConfirmation}>
          <Dialog.Title>Confirmer la création du client</Dialog.Title>
          <Dialog.Content>
            <Text>Nom: {client.name}</Text>
            <Text>Email: {client.email}</Text>
            <Text>Téléphone: {client.phone}</Text>
            <Text>Type d'adresse: {client.addressType}</Text>
            <Text>Adresse: {client.address}</Text>
            <Text>Code postal: {client.postalCode}</Text>
            <Text>Ville: {client.city}</Text>
            <Text>Note: {client.note}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideConfirmation}>Annuler</Button>
            <Button onPress={() => handleCreateCustomer(client)}>
              Confirmer
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={successMessageVisible} onDismiss={hideSuccessMessage}>
          <Dialog.Title>Client créé avec succès</Dialog.Title>
          <Dialog.Content>
            <Text>Nom: {createdClient.name}</Text>
            <Text>ID: {createdClient.id}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideSuccessMessage}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default AddClientModal;
