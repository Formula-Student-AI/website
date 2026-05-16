---
name: slam
summary: "Builds simultaneous localisation and mapping systems for real-time autonomous navigation"
---

# SLAM

The **SLAM** (Simultaneous Localisation and Mapping) team develops the algorithms that allow our autonomous vehicle to understand where it is and build a map of the track in real time. By fusing sensor data from LiDAR, IMU, and odometry, we provide a reliable localisation backbone that the rest of the autonomy stack depends on.

---

## Focus Areas

* **LiDAR-based mapping**: Processing point clouds to build accurate 2D/3D maps of the cone layout.
* **State estimation**: Fusing IMU, wheel odometry, and visual data for robust pose estimation.
* **Loop closure**: Detecting revisited areas to correct accumulated drift over multiple laps.
* **ROS 2 integration**: Publishing real-time pose and map data for downstream planning modules.

---

## Practices

* **Simulation-first development**: Validating algorithms in simulation before on-car deployment.
* **Benchmarking**: Comparing localisation accuracy across datasets and conditions.
* **Cross-team collaboration**: Working closely with Perception and APC to ensure consistent coordinate frames and data flow.
