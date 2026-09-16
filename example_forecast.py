"""Minimal TimesFM forecasting example.

Loads the pretrained TimesFM 3.0 checkpoint from Hugging Face and forecasts
a synthetic univariate time series.
"""

import numpy as np
import timesfm

MODEL_ID = "google/timesfm-3.0-pytorch"
CONTEXT_LENGTH = 128
HORIZON = 24


def main() -> None:
    forecaster = timesfm.TimesFM3Forecaster.from_pretrained(MODEL_ID)

    t = np.arange(CONTEXT_LENGTH, dtype=np.float32)
    context = np.sin(2 * np.pi * t / 24) + 0.1 * np.random.randn(CONTEXT_LENGTH).astype(np.float32)

    output = forecaster.predict(context, horizon=HORIZON, return_quantiles=True)

    print("Forecast:", output.forecast)
    print("Quantiles shape:", output.quantiles.shape)


if __name__ == "__main__":
    main()
