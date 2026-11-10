# ai-ml-development: MLOps

Part of the `ai-ml-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## MLOps

### Model Registry (MLflow)

```python
import mlflow

mlflow.set_experiment("my-experiment")

with mlflow.start_run():
    mlflow.log_params({"lr": 0.001, "epochs": 10})
    mlflow.log_metrics({"accuracy": 0.95})
    mlflow.pytorch.log_model(model, "model")
```

### Model Serving (FastAPI)

```python
from fastapi import FastAPI
from pydantic import BaseModel
import torch

app = FastAPI()
model = torch.load("model.pt")
model.eval()

class PredictionRequest(BaseModel):
    features: list[float]

@app.post("/predict")
async def predict(request: PredictionRequest):
    with torch.no_grad():
        tensor = torch.tensor([request.features])
        output = model(tensor)
        return {"prediction": output.argmax().item()}
```

---
