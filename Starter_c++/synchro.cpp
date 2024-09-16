#include <iostream>
#include <cstdlib> // Pour la fonction system()

// Fonction pour lancer la synchronisation
int synchronisation() {
    std::cout << "Lancement du service de synchronisation..." << std::endl;

    // Commande Docker Compose pour démarrer le service
    const char* command = "cd C:\\Users\\j.serafini\\Desktop\\Jordan\\Code\\nest_microServices\\Backend\\synchronisation_service && npm run start:dev";

    // Exécuter la commande
    int result = std::system(command);

    // Vérifier si la commande s'est exécutée correctement
    if (result == 0) {
        std::cout << "Service de synchronisation démarré avec succès !" << std::endl;
    } else {
        std::cerr << "Erreur lors du démarrage du service de synchronisation." << std::endl;
    }

    return result;
}

// Fonction main, point d'entrée du programme
int main() {
    // Appeler la fonction synchronisation
    return synchronisation();
}
