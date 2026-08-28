import os

# Check duration or basic info
for i in [1, 2, 3]:
    path = f"public/videos/Light-Mode-Videos/webm/phase-{i}.webm"
    print(f"Phase {i} exists: {os.path.exists(path)}, size: {os.path.getsize(path)}")
