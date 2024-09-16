compiler rc pour ico:
windres resources.rc resources.o

compile generale:
g++ -o launcher.exe main.cpp resources.o -mwindows -municode -lws2_32
