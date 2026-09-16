# TimesFM

Instalación de [TimesFM](https://github.com/google-research/timesfm) (Time
Series Foundation Model), el modelo de forecasting de series temporales de
Google Research, junto con un script de ejemplo.

## Instalación

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Esto instala el paquete `timesfm` con soporte de PyTorch
(`timesfm[torch]`). En Apple Silicon también existe la variante nativa MLX:
`pip install "timesfm[mlx]"`.

## Uso

```bash
python example_forecast.py
```

El script descarga el checkpoint preentrenado `google/timesfm-3.0-pytorch`
desde Hugging Face (requiere acceso a internet la primera vez) y genera un
forecast de 24 pasos sobre una serie sintética.

```python
import numpy as np
import timesfm

forecaster = timesfm.TimesFM3Forecaster.from_pretrained("google/timesfm-3.0-pytorch")
context = np.random.randn(128).astype(np.float32)
output = forecaster.predict(context, horizon=24, return_quantiles=True)

print(output.forecast)
```
