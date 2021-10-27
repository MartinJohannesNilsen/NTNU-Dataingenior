#include "Workers.cpp"

int main() {
    Workers worker_threads(4);
    Workers event_loop(1);

    worker_threads.start(); // Create 4 internal threads
    event_loop.start(); //Create 1 internal thread

    worker_threads.post([] {
        //Task A

        cout << "This is task A" << endl;
    });
    worker_threads.post([] {
        //Task B
        //Might run in parallel with task A

        cout << "This is task B" << endl;
    });

    event_loop.post([] {
        //Task C
        //Might run in parallel with task A and B

        cout << "This is task C, event loop" << endl;
    });
    event_loop.post([] {
        //Task D
        //Will run after C
        //Might run in parallel with task A and B

        cout << "This is task D, event loop" << endl;
    });

    this_thread::sleep_for(5s);
    worker_threads.stop();
    event_loop.stop();

    worker_threads.join();
    event_loop.join();

}

