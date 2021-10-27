//
// Created by Martin Johannes Nilsen on 09/02/2020.
// This application tries to find the prime numbers in a given interval based on an given amount of threads.
// Potential improvements:
// 1. Square root instead of "teller" in the for-loop checking if it is a prime number or not
// 2. The partition for each thread works with the small numbers I use, but if the numbers becomes very large, the threads running the higher number interval will use much more time.
//

#include <iostream>
#include <thread>
#include <list>
#include <vector>
#include <math.h>
#include <atomic>


using namespace std;

list<int> finnPrimtallIIntervall(int endeligStartpunkt, int endeligSluttpunkt, int antTråder){
    list<int> primtallsListe;
    mutex tråd_mutex;
    vector<thread> trådListe;
    int intervallStørrelse = (int) ((endeligSluttpunkt-endeligStartpunkt)/antTråder);
    int startpunkt = endeligStartpunkt;
    int sluttpunkt = startpunkt + intervallStørrelse;
    cout << "Trådinformasjon" << endl << "---------" << endl;
    for(int tråder = 0; tråder < antTråder; tråder++){
        cout << "Tråd " << tråder + 1 << "\nStartpunkt: " << startpunkt << "\nSluttpunkt: " << sluttpunkt << endl;
        trådListe.emplace_back([&tråd_mutex, startpunkt, sluttpunkt, &primtallsListe, &tråder] {
            for(int teller = startpunkt; teller <= sluttpunkt; teller++){
                bool erPrimtall = true;
                for(int i = 2; i < teller; i++) {
                    if(teller % i == 0) {
                        erPrimtall = false;
                        break;
                    }
                }
                if(erPrimtall) {
                    tråd_mutex.lock();
                    primtallsListe.push_back(teller);
                    tråd_mutex.unlock();
                }
            }
        });
        startpunkt = sluttpunkt + 1;
        sluttpunkt = startpunkt + intervallStørrelse;
    }
    for (auto &t : trådListe) t.join();
    primtallsListe.sort();
    return primtallsListe;
}

int main() {
    list<int> res = finnPrimtallIIntervall(1,100,20);
    cout << "\nPrimtallene i det gitte intervallet: " << endl << "---------" << endl;
    for(auto const &primtall : res) {
        cout << primtall << "\n";
    }
}










