# game-development: Unreal Engine (C++)

Part of the `game-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Unreal Engine (C++)

### Actor Component

```cpp
// PlayerMovementComponent.h
#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "PlayerMovementComponent.generated.h"

UCLASS(ClassGroup=(Custom), meta=(BlueprintSpawnableComponent))
class MYGAME_API UPlayerMovementComponent : public UActorComponent
{
    GENERATED_BODY()

public:
    UPlayerMovementComponent();

    virtual void TickComponent(float DeltaTime, ELevelTick TickType,
        FActorComponentTickFunction* ThisTickFunction) override;

    UFUNCTION(BlueprintCallable, Category = "Movement")
    void Move(FVector2D Input);

    UFUNCTION(BlueprintCallable, Category = "Movement")
    void Jump();

protected:
    virtual void BeginPlay() override;

private:
    UPROPERTY(EditAnywhere, Category = "Movement")
    float MoveSpeed = 600.0f;

    UPROPERTY(EditAnywhere, Category = "Movement")
    float JumpForce = 400.0f;

    UPROPERTY()
    class UCharacterMovementComponent* MovementComponent;
};

// PlayerMovementComponent.cpp
#include "PlayerMovementComponent.h"
#include "GameFramework/CharacterMovementComponent.h"

UPlayerMovementComponent::UPlayerMovementComponent()
{
    PrimaryComponentTick.bCanEverTick = true;
}

void UPlayerMovementComponent::BeginPlay()
{
    Super::BeginPlay();

    if (ACharacter* Owner = Cast<ACharacter>(GetOwner()))
    {
        MovementComponent = Owner->GetCharacterMovement();
    }
}

void UPlayerMovementComponent::Move(FVector2D Input)
{
    if (!MovementComponent) return;

    FVector Forward = GetOwner()->GetActorForwardVector();
    FVector Right = GetOwner()->GetActorRightVector();

    FVector Direction = (Forward * Input.Y + Right * Input.X).GetSafeNormal();
    MovementComponent->AddInputVector(Direction * MoveSpeed);
}

void UPlayerMovementComponent::Jump()
{
    if (ACharacter* Character = Cast<ACharacter>(GetOwner()))
    {
        Character->Jump();
    }
}
```

### Gameplay Ability System (GAS)

```cpp
// MyGameplayAbility.h
#pragma once

#include "Abilities/GameplayAbility.h"
#include "MyGameplayAbility.generated.h"

UCLASS()
class MYGAME_API UMyGameplayAbility : public UGameplayAbility
{
    GENERATED_BODY()

public:
    UMyGameplayAbility();

    virtual void ActivateAbility(const FGameplayAbilitySpecHandle Handle,
        const FGameplayAbilityActorInfo* ActorInfo,
        const FGameplayAbilityActivationInfo ActivationInfo,
        const FGameplayEventData* TriggerEventData) override;

    virtual void EndAbility(const FGameplayAbilitySpecHandle Handle,
        const FGameplayAbilityActorInfo* ActorInfo,
        const FGameplayAbilityActivationInfo ActivationInfo,
        bool bReplicateEndAbility, bool bWasCancelled) override;

protected:
    UPROPERTY(EditDefaultsOnly, Category = "Ability")
    float Damage = 50.0f;

    UPROPERTY(EditDefaultsOnly, Category = "Ability")
    TSubclassOf<UGameplayEffect> DamageEffect;
};
```

---
