# game-development: Performance Optimization

Part of the `game-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Performance Optimization

### LOD (Level of Detail)

```csharp
// Unity LOD Group setup
[RequireComponent(typeof(LODGroup))]
public class LODSetup : MonoBehaviour
{
    public Renderer[] lodRenderers;
    public float[] screenRelativeTransitions = { 0.5f, 0.2f, 0.01f };

    void Start()
    {
        LODGroup lodGroup = GetComponent<LODGroup>();
        LOD[] lods = new LOD[lodRenderers.Length];

        for (int i = 0; i < lodRenderers.Length; i++)
        {
            lods[i] = new LOD(screenRelativeTransitions[i], new[] { lodRenderers[i] });
        }

        lodGroup.SetLODs(lods);
        lodGroup.RecalculateBounds();
    }
}
```

### Spatial Partitioning

```csharp
public class QuadTree<T> where T : class
{
    private readonly int _maxObjects = 10;
    private readonly int _maxLevels = 5;
    private readonly int _level;
    private readonly List<(Rect bounds, T obj)> _objects = new();
    private readonly Rect _bounds;
    private QuadTree<T>[] _nodes;

    public QuadTree(int level, Rect bounds)
    {
        _level = level;
        _bounds = bounds;
    }

    public void Insert(Rect objBounds, T obj)
    {
        if (_nodes != null)
        {
            int index = GetIndex(objBounds);
            if (index != -1)
            {
                _nodes[index].Insert(objBounds, obj);
                return;
            }
        }

        _objects.Add((objBounds, obj));

        if (_objects.Count > _maxObjects && _level < _maxLevels)
        {
            if (_nodes == null) Split();

            int i = 0;
            while (i < _objects.Count)
            {
                int index = GetIndex(_objects[i].bounds);
                if (index != -1)
                {
                    var item = _objects[i];
                    _objects.RemoveAt(i);
                    _nodes[index].Insert(item.bounds, item.obj);
                }
                else i++;
            }
        }
    }

    public List<T> Retrieve(Rect area)
    {
        List<T> result = new();
        RetrieveAll(area, result);
        return result;
    }
}
```

---
