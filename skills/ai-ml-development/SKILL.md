---
name: ai-ml-development
description: AI and machine learning development with PyTorch, TensorFlow, and LLM integration. Use when building ML models, training pipelines, fine-tuning LLMs, or implementing AI features.
---

# AI & Machine Learning Development

Comprehensive guide for building AI/ML systems from prototyping to production.

## Frameworks Overview

| Framework        | Best For               | Ecosystem                  |
| ---------------- | ---------------------- | -------------------------- |
| **PyTorch**      | Research, flexibility  | Hugging Face, Lightning    |
| **TensorFlow**   | Production, mobile     | TFX, TF Lite, TF.js        |
| **JAX**          | High-performance, TPUs | Flax, Optax                |
| **scikit-learn** | Classical ML           | Simple, batteries-included |

---

## PyTorch

### Model Definition

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class ConvNet(nn.Module):
    def __init__(self, num_classes: int = 10):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 256)
        self.fc2 = nn.Linear(256, num_classes)
        self.dropout = nn.Dropout(0.5)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        return self.fc2(x)
```

### Training Loop

```python
from torch.utils.data import DataLoader
from torch.optim import AdamW
from tqdm import tqdm

def train_model(
    model: nn.Module,
    train_loader: DataLoader,
    val_loader: DataLoader,
    epochs: int = 10,
    lr: float = 1e-3,
    device: str = "cuda"
) -> dict:
    model = model.to(device)
    optimizer = AdamW(model.parameters(), lr=lr)
    criterion = nn.CrossEntropyLoss()

    for epoch in range(epochs):
        model.train()
        for batch in tqdm(train_loader):
            inputs, labels = batch[0].to(device), batch[1].to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

        # Validation
        model.eval()
        correct = total = 0
        with torch.no_grad():
            for batch in val_loader:
                inputs, labels = batch[0].to(device), batch[1].to(device)
                outputs = model(inputs)
                _, predicted = outputs.max(1)
                total += labels.size(0)
                correct += predicted.eq(labels).sum().item()

        print(f"Epoch {epoch+1}: Val Acc {100.*correct/total:.2f}%")
```

### PyTorch Lightning

```python
import pytorch_lightning as pl
from torchmetrics import Accuracy

class LitModel(pl.LightningModule):
    def __init__(self, model: nn.Module, lr: float = 1e-3):
        super().__init__()
        self.model = model
        self.lr = lr
        self.criterion = nn.CrossEntropyLoss()
        self.accuracy = Accuracy(task="multiclass", num_classes=10)

    def training_step(self, batch, batch_idx):
        x, y = batch
        logits = self.model(x)
        loss = self.criterion(logits, y)
        self.log("train_loss", loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        logits = self.model(x)
        self.accuracy(logits, y)
        self.log("val_acc", self.accuracy)

    def configure_optimizers(self):
        return AdamW(self.parameters(), lr=self.lr)
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/ai-ml-development/`).

| Topic | File | Covers |
| --- | --- | --- |
| Hugging Face Transformers | [`references/hugging-face-transformers.md`](references/hugging-face-transformers.md) | Text Classification; Fine-Tuning LLMs with LoRA |
| LLM Integration | [`references/llm-integration.md`](references/llm-integration.md) | OpenAI API; Anthropic Claude API; LangChain |
| Vector Databases | [`references/vector-databases.md`](references/vector-databases.md) | Pinecone; ChromaDB (Local) |
| MLOps | [`references/mlops.md`](references/mlops.md) | Model Registry (MLflow); Model Serving (FastAPI) |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | Training; Deployment |
| LLM Application Development | [`references/llm-application-development.md`](references/llm-application-development.md) | RAG Architecture (Retrieval-Augmented Generation); Vector Databases; Prompt Engineering Patterns; Structured Outputs; Tool Use / Function Calling; Claude API / Anthropic SDK Patterns; and 3 more |
