//
// Created by Martin Johannes Nilsen on 21/02/2020.
//

#include <iostream>
#include <thread>
#include <list>
#include <vector>

using namespace std;

class Workers{
private:
    vector<thread> listOfThreads;
    list<function<void()>> tasks;
    mutex thread_mutex;
    condition_variable conVar;
    int numberOfThreads;
    bool threadFinished = false;

public:
    Workers(int inputNumberOfThreads){
        numberOfThreads = inputNumberOfThreads;
    }

    void post(const function<void()> &task){
        {
            thread_mutex.lock();
            listOfThreads.emplace_back(task);
            thread_mutex.unlock();
        }
        conVar.notify_one();
    }

    void start(){
        for(int i = 0; i < numberOfThreads; i++){
            listOfThreads.emplace_back([this]{
                while(true){
                    function<void()> task;
                    {

                        unique_lock<mutex> lock(thread_mutex);

                        while(!threadFinished && tasks.empty()){
                            conVar.wait(lock);
                        }

                        if(tasks.empty()){
                            return;
                        }

                        task = *tasks.begin(); //Copy task for last method
                        tasks.pop_front(); //Remove task from list
                    }

                    task_timeout(25);
                    task(); //Run task outside of mutex lock
                }
            });
        }
    }

    void task_timeout(int timeoutMs){
        this_thread::sleep_for(std::chrono::milliseconds(timeoutMs));
    }

    void join(){
        for(auto &thread : listOfThreads)
            thread.join();
        stop();
    }

    void stop(){
        threadFinished = true;
        conVar.notify_all();
    }
};


/*
 * Må returnere en liste med tråder, eller "workers" om du vil. Disse trådene skal brukes i main
 */

