#include <winsock2.h>
#include <windows.h>
#include "resource.h"
#include <string>
#include <iostream>
#include <thread>
#include <ws2tcpip.h>

#pragma comment(lib, "Ws2_32.lib")

#define ID_BUTTON_DOCKER 1
#define ID_BUTTON_SYNCHRO 2
#define ID_BUTTON_STOP_DOCKER 3
#define ID_BUTTON_STOP_SYNCHRO 4

#define ID_DOCKER_STATUS 1001
#define ID_SYNCHRO_STATUS 1002

HWND hDockerStatus, hSynchroStatus;
HWND hButtonDocker, hButtonSynchro, hButtonStopDocker, hButtonStopSynchro;
PROCESS_INFORMATION dockerProcessInfo = {0};
PROCESS_INFORMATION synchroProcessInfo = {0};

// Fonction pour vérifier si un port est ouvert sur localhost
bool IsPortOpen(const std::string &hostname, int port)
{
    WSADATA wsaData;
    SOCKET ConnectSocket = INVALID_SOCKET;
    struct sockaddr_in clientService;

    // Initialiser Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
    {
        return false;
    }

    // Créer un socket
    ConnectSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (ConnectSocket == INVALID_SOCKET)
    {
        WSACleanup();
        return false;
    }

    // Configurer l'adresse du serveur
    clientService.sin_family = AF_INET;
    clientService.sin_addr.s_addr = inet_addr(hostname.c_str());
    clientService.sin_port = htons(port);

    // Essayer de se connecter au serveur
    int result = connect(ConnectSocket, (SOCKADDR *)&clientService, sizeof(clientService));
    closesocket(ConnectSocket);
    WSACleanup();

    return result == 0;
}

// Mettre à jour le texte d'un label
void UpdateStatus(HWND hwnd, const std::wstring &text)
{
    SetWindowTextW(hwnd, text.c_str());
    InvalidateRect(hwnd, NULL, TRUE); // Redessiner la fenêtre
}

// Fonction pour dessiner une pastille (cercle) à côté du label
void DrawCircle(HDC hdc, int x, int y, int radius, COLORREF color)
{
    HBRUSH hBrush = CreateSolidBrush(color);
    HBRUSH oldBrush = (HBRUSH)SelectObject(hdc, hBrush);

    HPEN hPen = CreatePen(PS_SOLID, 1, color);
    HPEN oldPen = (HPEN)SelectObject(hdc, hPen);

    Ellipse(hdc, x - radius, y - radius, x + radius, y + radius);

    SelectObject(hdc, oldBrush);
    DeleteObject(hBrush);
    SelectObject(hdc, oldPen);
    DeleteObject(hPen);
}

// Fonction pour attendre que le port soit ouvert avant de signaler l'état "En cours d'exécution"
void WaitForServiceReady(int port, HWND statusLabel)
{
    while (!IsPortOpen("127.0.0.1", port))
    {
        std::this_thread::sleep_for(std::chrono::seconds(1)); // Attendre 1 seconde avant de réessayer
    }
    UpdateStatus(statusLabel, L"En cours d'exécution"); // Mettre à jour l'interface une fois le service prêt
}

// Fonction pour repositionner les éléments lors du redimensionnement
void ResizeControls(HWND hwnd, int width, int height)
{
    // 1. Fixer des valeurs minimales pour la fenêtre
    if (width < 400)
        width = 400; // Largeur minimale de la fenêtre
    if (height < 200)
        height = 200; // Hauteur minimale de la fenêtre

    // 2. Tailles des boutons et labels
    int buttonWidth = 150;
    int buttonHeight = 50;
    int labelWidth = 200;
    int labelHeight = 30;
    int xOffset = 50;
    int yOffset = 50;

    // 3. Ajuster l'espacement vertical selon la taille de la fenêtre
    int ySpacing = (height - yOffset * 2 - buttonHeight * 2) / 2;
    if (ySpacing < 20)
        ySpacing = 20; // Espacement minimal

    // 4. Calcul des positions
    int xLabelOffset = xOffset + buttonWidth + 20; // Espace entre les boutons et les labels
    int xStopOffset = xLabelOffset + labelWidth + 20;

    // 5. Ajuster les positions et redimensionner les contrôles
    SetWindowPos(hButtonDocker, NULL, xOffset, yOffset, buttonWidth, buttonHeight, SWP_NOZORDER);
    SetWindowPos(hButtonStopDocker, NULL, xStopOffset, yOffset, buttonWidth, buttonHeight, SWP_NOZORDER);
    SetWindowPos(hDockerStatus, NULL, xLabelOffset, yOffset + 10, labelWidth, labelHeight, SWP_NOZORDER);

    SetWindowPos(hButtonSynchro, NULL, xOffset, yOffset + ySpacing + buttonHeight, buttonWidth, buttonHeight, SWP_NOZORDER);
    SetWindowPos(hButtonStopSynchro, NULL, xStopOffset, yOffset + ySpacing + buttonHeight, buttonWidth, buttonHeight, SWP_NOZORDER);
    SetWindowPos(hSynchroStatus, NULL, xLabelOffset, yOffset + ySpacing + buttonHeight + 10, labelWidth, labelHeight, SWP_NOZORDER);
}

// Fonction pour arrêter un processus en utilisant taskkill
void StopProcessWithTaskkill(PROCESS_INFORMATION &pi, HWND statusLabel)
{
    if (pi.hProcess)
    {
        // Tuer le processus en utilisant taskkill
        std::wstring taskkillCommand = L"taskkill /PID " + std::to_wstring(pi.dwProcessId) + L" /F /T";
        system(std::string(taskkillCommand.begin(), taskkillCommand.end()).c_str());

        // Mettre à jour l'état en "Inactif"
        UpdateStatus(statusLabel, L"Inactif");

        // Fermer les handles du processus
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
        pi.hProcess = NULL;
    }
}

// Fonction pour exécuter une commande système (docker-compose down)
void RunDockerComposeDown()
{
    STARTUPINFOW si = { sizeof(si) };
    PROCESS_INFORMATION pi = { 0 };

    // Commande docker-compose down
    std::wstring command = L"cmd.exe /c docker-compose down";

    // Spécifier le répertoire de travail où se trouve ton docker-compose.yml
    std::wstring workingDirectory = L"C:\\Users\\j.serafini\\Desktop\\Jordan\\Code\\nest_microServices";

    // Lancer la commande
    if (CreateProcessW(NULL, const_cast<LPWSTR>(command.c_str()), NULL, NULL, FALSE, 0, NULL, workingDirectory.c_str(), &si, &pi))
    {
        // Attendre que le processus se termine
        WaitForSingleObject(pi.hProcess, INFINITE);

        // Fermer les handles
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
    }
    else
    {
        MessageBoxW(NULL, L"Erreur lors de l'exécution de docker-compose down", L"Erreur", MB_ICONERROR);
    }
}

// Fonction pour arrêter Docker avec docker-compose down
void StopDockerProcess(PROCESS_INFORMATION &pi, HWND statusLabel)
{
    if (pi.hProcess)
    {
        // Exécuter "docker-compose down"
        RunDockerComposeDown();

        // Mettre à jour l'état en "Inactif"
        UpdateStatus(statusLabel, L"Inactif");

        // Fermer les handles du processus
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
        pi.hProcess = NULL;
    }
}

// Fonction pour lancer un processus .exe dans un thread séparé
void LaunchProcessInThread(const std::wstring &exePath, HWND statusLabel, PROCESS_INFORMATION &pi, int port)
{
    std::thread([exePath, statusLabel, &pi, port]()
                {
        STARTUPINFOW si = { sizeof(STARTUPINFOW) };

        // Mettre à jour l'UI avec le statut "En cours de lancement"
        UpdateStatus(statusLabel, L"En cours de lancement...");

        if (CreateProcessW(NULL, (LPWSTR)exePath.c_str(), NULL, NULL, FALSE, 0, NULL, NULL, &si, &pi)) {
            // Attendre que le service soit prêt (port ouvert)
            WaitForServiceReady(port, statusLabel);

            // Attendre que le processus se termine
            WaitForSingleObject(pi.hProcess, INFINITE);

            // Quand le processus se termine, mettre à jour le statut
            UpdateStatus(statusLabel, L"Inactif");

            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
        } else {
            // En cas d'échec, afficher une erreur
            UpdateStatus(statusLabel, L"Erreur lors du lancement");
        } })
    .detach(); // Détacher le thread pour éviter de bloquer le thread principal
}

// Gérer les couleurs des labels avec WM_CTLCOLORSTATIC
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    switch (uMsg)
    {
    case WM_CREATE:
    {
        // Espacement et tailles des éléments
        int buttonWidth = 150;
        int buttonHeight = 50;
        int labelWidth = 200;
        int labelHeight = 30;
        int xOffset = 50;
        int yOffset = 50;
        int ySpacing = 100;
        int xLabelOffset = xOffset + buttonWidth + 20; // Garder un espace entre les boutons et les labels
        int xStopOffset = xLabelOffset + labelWidth + 20;

        // Créer les boutons et labels
        hButtonDocker = CreateWindowW(L"BUTTON", L"Lancer Docker", WS_VISIBLE | WS_CHILD,
                                      xOffset, yOffset, buttonWidth, buttonHeight,
                                      hwnd, (HMENU)ID_BUTTON_DOCKER, NULL, NULL);

        hButtonStopDocker = CreateWindowW(L"BUTTON", L"Arrêter Docker", WS_VISIBLE | WS_CHILD,
                                          xStopOffset, yOffset, buttonWidth, buttonHeight,
                                          hwnd, (HMENU)ID_BUTTON_STOP_DOCKER, NULL, NULL);

        hDockerStatus = CreateWindowW(L"STATIC", L"Inactif", WS_VISIBLE | WS_CHILD | SS_OWNERDRAW,
                                      xLabelOffset, yOffset + 10, labelWidth, labelHeight,
                                      hwnd, (HMENU)ID_DOCKER_STATUS, NULL, NULL);

        hButtonSynchro = CreateWindowW(L"BUTTON", L"Lancer Synchro", WS_VISIBLE | WS_CHILD,
                                       xOffset, yOffset + ySpacing, buttonWidth, buttonHeight,
                                       hwnd, (HMENU)ID_BUTTON_SYNCHRO, NULL, NULL);

        hButtonStopSynchro = CreateWindowW(L"BUTTON", L"Arrêter Synchro", WS_VISIBLE | WS_CHILD,
                                           xStopOffset, yOffset + ySpacing, buttonWidth, buttonHeight,
                                           hwnd, (HMENU)ID_BUTTON_STOP_SYNCHRO, NULL, NULL);

        hSynchroStatus = CreateWindowW(L"STATIC", L"Inactif", WS_VISIBLE | WS_CHILD | SS_OWNERDRAW,
                                       xLabelOffset, yOffset + ySpacing + 10, labelWidth, labelHeight,
                                       hwnd, (HMENU)ID_SYNCHRO_STATUS, NULL, NULL);

        break;
    }
    case WM_CTLCOLORSTATIC:
    {
        HDC hdcStatic = (HDC)wParam;
        SetBkMode(hdcStatic, TRANSPARENT);
        return (LRESULT)GetStockObject(NULL_BRUSH); // Fond transparent
    }
    case WM_DRAWITEM:
    {
        LPDRAWITEMSTRUCT lpDrawItem = (LPDRAWITEMSTRUCT)lParam;
        if (lpDrawItem->hwndItem == hDockerStatus || lpDrawItem->hwndItem == hSynchroStatus)
        {
            // Remplir le fond avec la couleur de la fenêtre pour éviter la superposition
            FillRect(lpDrawItem->hDC, &lpDrawItem->rcItem, (HBRUSH)(COLOR_WINDOW + 1));

            // Récupérer le texte
            wchar_t text[256];
            GetWindowTextW(lpDrawItem->hwndItem, text, 256);

            // Définir la couleur du texte
            SetTextColor(lpDrawItem->hDC, RGB(0, 0, 0));
            SetBkMode(lpDrawItem->hDC, TRANSPARENT);

            // Dessiner le texte
            RECT rect = lpDrawItem->rcItem;
            DrawTextW(lpDrawItem->hDC, text, -1, &rect, DT_LEFT | DT_VCENTER | DT_SINGLELINE);

            // Déterminer la couleur de la pastille
            bool isRunning = false;
            if (lpDrawItem->hwndItem == hDockerStatus)
                isRunning = (dockerProcessInfo.hProcess != NULL);
            else if (lpDrawItem->hwndItem == hSynchroStatus)
                isRunning = (synchroProcessInfo.hProcess != NULL);

            COLORREF color = isRunning ? RGB(40, 167, 69) : RGB(220, 53, 69); // Vert ou Rouge

            // Dessiner la pastille à côté du texte
            int circleRadius = 10;
            int circleX = rect.right - circleRadius - 5; // Ajuster la position horizontale
            int circleY = (rect.top + rect.bottom) / 2;

            DrawCircle(lpDrawItem->hDC, circleX, circleY, circleRadius, color);

            return TRUE;
        }
        break;
    }
    case WM_COMMAND:
    {
        int wmId = LOWORD(wParam);
        if (wmId == ID_BUTTON_DOCKER)
        {
            LaunchProcessInThread(L"C:\\Users\\j.serafini\\Desktop\\Jordan\\Code\\nest_microServices\\Starter_c++\\docker_launcher.exe",
                                  hDockerStatus, dockerProcessInfo, 3000);
        }
        else if (wmId == ID_BUTTON_SYNCHRO)
        {
            LaunchProcessInThread(L"C:\\Users\\j.serafini\\Desktop\\Jordan\\Code\\nest_microServices\\Starter_c++\\synchro_launcher.exe",
                                  hSynchroStatus, synchroProcessInfo, 3005);
        }
        else if (wmId == ID_BUTTON_STOP_DOCKER)
        {
            StopDockerProcess(dockerProcessInfo, hDockerStatus);
        }
        else if (wmId == ID_BUTTON_STOP_SYNCHRO)
        {
            StopProcessWithTaskkill(synchroProcessInfo, hSynchroStatus);
        }
        break;
    }
    case WM_SIZE:
    {
        // Gestion du redimensionnement de la fenêtre
        int width = LOWORD(lParam);
        int height = HIWORD(lParam);
        ResizeControls(hwnd, width, height);
        break;
    }
    case WM_DESTROY:
    {
        PostQuitMessage(0);
        break;
    }
    default:
        return DefWindowProcW(hwnd, uMsg, wParam, lParam);
    }
    return 0;
}

// Fonction principale
int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PWSTR pCmdLine, int nCmdShow)
{
    const wchar_t CLASS_NAME[] = L"LauncherWindowClass";

    WNDCLASSW wc = {};
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME;

    // Charger l'icône directement depuis un fichier .ico
    wc.hIcon = (HICON)LoadImageW(NULL, L"C:\\Users\\j.serafini\\Desktop\\Jordan\\Code\\nest_microServices\\Starter_c++\\pat.ico", IMAGE_ICON, 0, 0, LR_LOADFROMFILE | LR_DEFAULTSIZE);

    RegisterClassW(&wc);

    HWND hwnd = CreateWindowExW(0, CLASS_NAME, L"Lanceur de Services", WS_OVERLAPPEDWINDOW,
                                CW_USEDEFAULT, CW_USEDEFAULT, 800, 400, NULL, NULL, hInstance, NULL);

    if (hwnd == NULL)
    {
        return 0;
    }

    ShowWindow(hwnd, nCmdShow);

    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return 0;
}
