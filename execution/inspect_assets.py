import os
import struct

def inspect_webm_file(filepath):
    print(f"Inspecting: {filepath}")
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    size = os.path.getsize(filepath)
    print(f"File size: {size} bytes ({size / (1024*1024):.2f} MB)")
    
    # Read first 1MB to check for tracks
    with open(filepath, 'rb') as f:
        data = f.read(min(size, 1024*1024))
        
    # Check for Matroska TrackType: 0x83 followed by 0x01 (video) or 0x02 (audio)
    # Also check string signatures like 'A_VORBIS', 'A_OPUS', 'V_VP8', 'V_VP9', 'V_AV1'
    has_audio_track_tag = b'A_OPUS' in data or b'A_VORBIS' in data or b'A_AAC' in data
    has_video_track_tag = b'V_VP8' in data or b'V_VP9' in data or b'V_AV1' in data
    
    print(f"  Has Video Codec Signature: {has_video_track_tag}")
    print(f"  Has Audio Codec Signature: {has_audio_track_tag}")

for i in [1, 2, 3]:
    path = f"public/videos/Light-Mode-Videos/webm/phase-{i}.webm"
    inspect_webm_file(path)
