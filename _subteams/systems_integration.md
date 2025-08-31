---
name: systems_integration
image: /subteams/systems-hero.jpeg
summary: "ROS graph, middleware, and the glue that keeps perception, planning, and hardware talking."
---

The **Systems Integration** team ensures that all the sub-systems work together as a reliable whole. We design the software architecture, handle middleware, manage builds and deployments, and make sure the car behaves consistently on track.

## Focus areas

- **ROS architecture:** node graphs, message definitions, topics/services/actions, and launch files.
- **Middleware & comms:** DDS/ROS2 configs, QoS tuning, real-time comms, and safety interlocks.
- **Build & CI/CD:** reproducible builds, cross-compilation, containerization, and automated tests.
- **Simulation integration:** bridge between Gazebo/Carla simulations and real-car deployments.
- **Monitoring & logging:** telemetry streams, bagging, performance metrics, and debugging tools.

## Practices

- **Reliability first:** catch errors early with CI/CD pipelines, test harnesses, and integration rigs.
- **Standardization:** consistent message formats and launch conventions across subteams.
- **Observability:** tools to understand what the system is doing in real time.
- **Cross-team collaboration:** working closely with perception, planning, and hardware for smooth handoffs.

## Typical deliverables

- ROS2 workspace layouts and node graphs.
- Launch/config packages for perception, planning, and control stacks.
- CI/CD pipelines with automated builds and simulation tests.
- Diagnostic dashboards and logging frameworks.
- On-track procedures for system bring-up and safety checks.
