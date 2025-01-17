# Process Scheduling Simulator

A simple simulation program for process scheduling. Supports multi-level queue scheduling for the following scheduling algorithms:

- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Shortest Remaining Time First (SRTF)
- Round Robin (RR) with custom time quantum
- Non-preemptive priority
- Preemptive priority

You may use the tool [here](https://rian8337.github.io/process-scheduling-simulator/) or build it by yourself.

## Building

To build the program, you need [Node.js](https://nodejs.org) version 20 or later.

Begin by installing dependencies:

```sh
npm i
```

Afterwards, you may choose one of the following configurations:

- Production

    ```sh
    npm run build
    npm run preview
    ```

- Development
    ```sh
    npm run dev
    ```

Open the given link in your browser of choice.
