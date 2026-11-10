# game-development: Game Patterns

Part of the `game-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Game Patterns

### Entity Component System (ECS)

```csharp
// Unity DOTS example
using Unity.Entities;
using Unity.Mathematics;
using Unity.Transforms;

public struct MoveSpeed : IComponentData
{
    public float Value;
}

public partial class MovementSystem : SystemBase
{
    protected override void OnUpdate()
    {
        float deltaTime = SystemAPI.Time.DeltaTime;

        Entities.ForEach((ref LocalTransform transform, in MoveSpeed speed) =>
        {
            transform.Position += new float3(0, 0, speed.Value * deltaTime);
        }).ScheduleParallel();
    }
}
```

### Event System

```csharp
public static class GameEvents
{
    public static event Action<int> OnScoreChanged;
    public static event Action<float> OnHealthChanged;
    public static event Action OnGameOver;

    public static void ScoreChanged(int newScore) => OnScoreChanged?.Invoke(newScore);
    public static void HealthChanged(float newHealth) => OnHealthChanged?.Invoke(newHealth);
    public static void GameOver() => OnGameOver?.Invoke();
}

// Usage
public class UIManager : MonoBehaviour
{
    private void OnEnable()
    {
        GameEvents.OnScoreChanged += UpdateScoreUI;
        GameEvents.OnHealthChanged += UpdateHealthUI;
    }

    private void OnDisable()
    {
        GameEvents.OnScoreChanged -= UpdateScoreUI;
        GameEvents.OnHealthChanged -= UpdateHealthUI;
    }
}
```

### Save System

```csharp
[Serializable]
public class SaveData
{
    public int Level;
    public float PlayTime;
    public Vector3Serializable PlayerPosition;
    public List<string> UnlockedAchievements;
}

public static class SaveSystem
{
    private static readonly string SavePath =
        Path.Combine(Application.persistentDataPath, "save.json");

    public static void Save(SaveData data)
    {
        string json = JsonUtility.ToJson(data, true);
        File.WriteAllText(SavePath, json);
    }

    public static SaveData Load()
    {
        if (!File.Exists(SavePath)) return new SaveData();

        string json = File.ReadAllText(SavePath);
        return JsonUtility.FromJson<SaveData>(json);
    }
}
```

---
