#include <iostream>
#include <cstdlib> // Pour la fonction system()

int main() {
    std::cout << "Lancement des services Docker pour NestJS..." << std::endl;

    // Commande Docker Compose pour démarrer les conteneurs
    const char* command = "cd C:\\Users\\j.serafini\\Desktop\\Jordan\\Code\\nest_microServices && docker-compose up -d";

    // Exécuter la commande
    int result = std::system(command);

    // Vérifier si la commande s'est exécutée correctement
    if (result == 0) {
        std::cout << "Services Docker démarrés avec succès !" << std::endl;
    } else {
        std::cerr << "Erreur lors du démarrage des services Docker." << std::endl;
    }

    return 0;
}
