---
name: planning_and_control
image: /subteams/planning_control_hero.gif
summary: "Trajectory generation and vehicle control, from planners to MPC/PID."
---

# Planning & Control

> If Perception is the eyes of the car, Planning & Control is the brain and hands—deciding the path and steering the vehicle safely through the track.

<br />

<div style="display: flex; justify-content: center; width: 100%;">
  <figure style="margin: 0; width: 60%;">
    <img src="/subteams/planning_control_hero.gif" alt="Trajectory Generation" style="display: block; width: 100%; height: auto; border-radius: 8px;" />
    <figcaption style="text-align: center; margin-top: 6px;">Trajectory Generation</figcaption>
  </figure>
</div>
<br />
The Planning & Control (P&C) team transforms cone detections into smooth, drivable trajectories. By fusing vehicle motion data with cone positions, we filter noise, estimate the track centreline, and generate cubic-spline trajectories. These are followed using a pure-pursuit controller that converts the path into safe, stable steering commands.

---

## Focus Areas

* **Trajectory Generation**: Using cubic spline interpolation for smooth centreline paths.
* **Control Algorithms**: Implementing pure-pursuit with PD feedback and low-pass filtering.
* **Noise Robustness**: Evaluating steering accuracy under Gaussian cone detection noise.

---

## Practices

* **Reliability First**: Designing controllers that remain stable under perception noise.
* **Safety Constraints**: Bounding steering commands to ensure feasible vehicle dynamics.
* **Close Integration**: Working hand-in-hand with Perception for real-time data fusion.
* **Iterative Testing**: Validating algorithms in simulation before on-track deployment.

---

## Typical Deliverables

* **Trajectory Planner**: Centreline paths generated from cone detections.
* **Controller Modules**: Pure-pursuit and PD steering controllers with filtering.
* **Simulation Reports**: RMSE and robustness evaluations under varying noise.
