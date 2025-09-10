---
name: perception
image: /subteams/perception_hero.jpg
summary: "Develops real-time vision systems that detect and localize cones using deep learning and stereo cameras"
---

# Perception

> The only path to build intelligent machines is to enable it with powerful visual intelligence, just like what animals did in evolution.

**— Fei-Fei Li**

<br />

<div style="display: flex; justify-content: flex-start; width: 100%;">
  <figure style="margin: 0; width: 60%;">
    <img src="/subteams/perception/object_detection.jpg" alt="Cone Detection" style="display: block; width: 100%; height: auto; border-radius: 8px;" />
    <figcaption style="text-align: center; margin-top: 6px;">Cone Detection</figcaption>
  </figure>
</div>
<br />
The Perception team brings this to life by building real-time vision systems that detect and localize cones with deep learning and stereo cameras, giving the car an accurate view of the track.

Perception is the eyes of the autonomous system. We design, train, and deploy computer vision models that detect and localize cones around the track, enabling safe and efficient navigation. By fusing cutting-edge object detection with stereo vision, we provide the Planning and Control team with accurate cone position maps of the race environment.
<br />
<div style="display: flex; justify-content: flex-end; width: 100%;">
  <figure style="margin: 0; width: 50%;">
    <img src="/subteams/perception/depth_map.jpg" alt="Depth Sensing" style="display: block; width: 100%; height: auto; border-radius: 8px;" />
    <figcaption style="text-align: center; margin-top: 6px;">Depth Sensing</figcaption>
  </figure>
</div>

---

## Focus Areas

* **Object Detection**: Training and benchmarking YOLO models on FSCOCO for cone detection.
* **Data Pipelines**: Preprocessing, augmentation, and automated ingestion of training data.
* **Stereo Vision**: Integrating detections with ZED depth sensing in ROS 2 nodes.
* **System Integration**: Optimizing camera configs and deploying during live events.

---

## Practices

* **Rigorous Evaluation**: Benchmarking models and feeding results into the ADR.
* **Real-Time Reliability**: Designing pipelines that balance accuracy with low latency.
* **Collaboration**: Working closely with Planning & Control to ensure seamless handover of data.
* **Optimization**: Fine-tuning ZED stereo cameras for high-pressure competition settings.

---

## Typical Deliverables

* **Trained Models**: YOLO detection networks ready for deployment.
* **3D Localization**: Real-time cone mapping for navigation.
* **Evaluation Reports**: Performance benchmarks for the Autonomous Design Report.
* **ROS 2 Nodes**: Perception modules integrated into the full autonomy stack.
