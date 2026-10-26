import os
import sys


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_DIR)
SKILL_ROOT = os.environ.get("JY_SKILL_ROOT", r"C:\Users\20651\.codex\skills\jianying-editor")
SCRIPTS_PATH = os.path.join(SKILL_ROOT, "scripts")
if not os.path.exists(os.path.join(SCRIPTS_PATH, "jy_wrapper.py")):
    raise ImportError(f"JianYing skill scripts not found: {SCRIPTS_PATH}")
if SCRIPTS_PATH not in sys.path:
    sys.path.insert(0, SCRIPTS_PATH)

from jy_wrapper import JyProject


VIDEO = r"C:\Users\20651\Videos\屏幕录制\2026-10-27 04-38-22.mp4"
PROJECT_NAME = "HairFit_Competition_Demo_Edit"

# 只保留主线：上传输入、生成等待、结果关系、3D 视角/试剪、沟通卡。
# 这些片段来自用户完整录制，按源视频时间轴取样，合计约两分钟。
CLIPS = [
    ("0s", "6s", "上传页开场"),
    ("50s", "14s", "已选完整照片与参考发型"),
    ("65s", "8s", "生成等待状态"),
    ("104s", "10s", "换发结果出现"),
    ("118s", "10s", "换发结果停留"),
    ("240s", "48s", "进入三维模型并切换视角试剪"),
    ("300s", "25s", "沟通卡与提交收尾"),
]


def main() -> None:
    if not os.path.exists(VIDEO):
        raise FileNotFoundError(VIDEO)

    project = JyProject(PROJECT_NAME, overwrite=True, width=1920, height=1080)
    for source_start, duration, label in CLIPS:
        print(f"Adding {label}: source={source_start}, duration={duration}")
        segment = project.add_clip(
            media_path=VIDEO,
            source_start=source_start,
            duration=duration,
            track_name="MainVideo",
        )
        if segment is None:
            raise RuntimeError(f"Failed to add clip: {label}")

    result = project.save()
    print(result)
    print(f"Saved JianYing draft: {PROJECT_NAME}")


if __name__ == "__main__":
    main()
