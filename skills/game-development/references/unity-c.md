# game-development: Unity (C#)

Part of the `game-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Unity (C#)

### Project Structure

```
Assets/
├── Scripts/
│   ├── Player/
│   │   ├── PlayerController.cs
│   │   └── PlayerInput.cs
│   ├── Enemies/
│   ├── Systems/
│   └── Utils/
├── Prefabs/
├── Scenes/
├── Materials/
├── Animations/
└── Resources/
```

### Player Controller

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(CharacterController))]
public class PlayerController : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float sprintMultiplier = 1.5f;
    [SerializeField] private float jumpHeight = 2f;
    [SerializeField] private float gravity = -9.81f;

    [Header("Look")]
    [SerializeField] private float lookSensitivity = 2f;
    [SerializeField] private float maxLookAngle = 80f;

    private CharacterController _controller;
    private Vector2 _moveInput;
    private Vector2 _lookInput;
    private Vector3 _velocity;
    private float _xRotation;
    private bool _isSprinting;

    private void Awake()
    {
        _controller = GetComponent<CharacterController>();
        Cursor.lockState = CursorLockMode.Locked;
    }

    private void Update()
    {
        HandleMovement();
        HandleLook();
        ApplyGravity();
    }

    private void HandleMovement()
    {
        float speed = _isSprinting ? moveSpeed * sprintMultiplier : moveSpeed;
        Vector3 move = transform.right * _moveInput.x + transform.forward * _moveInput.y;
        _controller.Move(move * speed * Time.deltaTime);
    }

    private void HandleLook()
    {
        float mouseX = _lookInput.x * lookSensitivity * Time.deltaTime;
        float mouseY = _lookInput.y * lookSensitivity * Time.deltaTime;

        _xRotation -= mouseY;
        _xRotation = Mathf.Clamp(_xRotation, -maxLookAngle, maxLookAngle);

        Camera.main.transform.localRotation = Quaternion.Euler(_xRotation, 0f, 0f);
        transform.Rotate(Vector3.up * mouseX);
    }

    private void ApplyGravity()
    {
        if (_controller.isGrounded && _velocity.y < 0)
        {
            _velocity.y = -2f;
        }

        _velocity.y += gravity * Time.deltaTime;
        _controller.Move(_velocity * Time.deltaTime);
    }

    // Input System callbacks
    public void OnMove(InputAction.CallbackContext context) =>
        _moveInput = context.ReadValue<Vector2>();

    public void OnLook(InputAction.CallbackContext context) =>
        _lookInput = context.ReadValue<Vector2>();

    public void OnJump(InputAction.CallbackContext context)
    {
        if (context.performed && _controller.isGrounded)
        {
            _velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
        }
    }

    public void OnSprint(InputAction.CallbackContext context) =>
        _isSprinting = context.performed;
}
```

### State Machine

```csharp
public interface IState
{
    void Enter();
    void Update();
    void Exit();
}

public class StateMachine
{
    private IState _currentState;

    public void ChangeState(IState newState)
    {
        _currentState?.Exit();
        _currentState = newState;
        _currentState.Enter();
    }

    public void Update() => _currentState?.Update();
}

// Example: Enemy AI States
public class IdleState : IState
{
    private readonly EnemyAI _enemy;

    public IdleState(EnemyAI enemy) => _enemy = enemy;

    public void Enter() => _enemy.Animator.SetTrigger("Idle");

    public void Update()
    {
        if (_enemy.CanSeePlayer())
        {
            _enemy.StateMachine.ChangeState(new ChaseState(_enemy));
        }
    }

    public void Exit() { }
}

public class ChaseState : IState
{
    private readonly EnemyAI _enemy;

    public ChaseState(EnemyAI enemy) => _enemy = enemy;

    public void Enter() => _enemy.Animator.SetTrigger("Run");

    public void Update()
    {
        _enemy.NavAgent.SetDestination(_enemy.Player.position);

        if (_enemy.InAttackRange())
        {
            _enemy.StateMachine.ChangeState(new AttackState(_enemy));
        }
        else if (!_enemy.CanSeePlayer())
        {
            _enemy.StateMachine.ChangeState(new IdleState(_enemy));
        }
    }

    public void Exit() { }
}
```

### Object Pooling

```csharp
public class ObjectPool<T> where T : Component
{
    private readonly T _prefab;
    private readonly Transform _parent;
    private readonly Queue<T> _pool = new();

    public ObjectPool(T prefab, int initialSize, Transform parent = null)
    {
        _prefab = prefab;
        _parent = parent;

        for (int i = 0; i < initialSize; i++)
        {
            CreateInstance();
        }
    }

    public T Get()
    {
        if (_pool.Count == 0) CreateInstance();

        T obj = _pool.Dequeue();
        obj.gameObject.SetActive(true);
        return obj;
    }

    public void Return(T obj)
    {
        obj.gameObject.SetActive(false);
        _pool.Enqueue(obj);
    }

    private void CreateInstance()
    {
        T obj = Object.Instantiate(_prefab, _parent);
        obj.gameObject.SetActive(false);
        _pool.Enqueue(obj);
    }
}
```

---
