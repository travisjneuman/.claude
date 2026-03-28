---
name: embedded-iot
description: Embedded systems firmware, microcontrollers (ESP32, STM32, Arduino, Raspberry Pi), RTOS (FreeRTOS, Zephyr), IoT protocols (MQTT, CoAP, BLE), bare-metal C/C++, and hardware peripheral interfaces (I2C, SPI, UART, GPIO). Use when developing firmware, working with microcontrollers, or building IoT devices.
---

# Embedded Systems & IoT

## Microcontroller Platforms

| Platform | Best For | Language | IDE |
|----------|----------|----------|-----|
| **ESP32** | WiFi/BLE IoT devices | C/C++, MicroPython | PlatformIO, Arduino IDE |
| **STM32** | Industrial, real-time | C/C++ | STM32CubeIDE, PlatformIO |
| **Arduino** | Prototyping, learning | C++ (Arduino) | Arduino IDE, PlatformIO |
| **Raspberry Pi Pico** | RP2040, dual-core | C/C++, MicroPython | Thonny, VS Code |
| **nRF52** | BLE-focused IoT | C, Zephyr | nRF Connect SDK |

## Firmware Patterns

### GPIO & Peripherals
```c
// ESP-IDF GPIO example
gpio_config_t io_conf = {
    .pin_bit_mask = (1ULL << GPIO_NUM_2),
    .mode = GPIO_MODE_OUTPUT,
    .pull_up_en = GPIO_PULLUP_DISABLE,
    .pull_down_en = GPIO_PULLDOWN_DISABLE,
    .intr_type = GPIO_INTR_DISABLE,
};
gpio_config(&io_conf);
gpio_set_level(GPIO_NUM_2, 1);
```

### I2C Communication
```c
// Read sensor via I2C
i2c_cmd_handle_t cmd = i2c_cmd_link_create();
i2c_master_start(cmd);
i2c_master_write_byte(cmd, (SENSOR_ADDR << 1) | I2C_MASTER_WRITE, true);
i2c_master_write_byte(cmd, REG_TEMP, true);
i2c_master_start(cmd);
i2c_master_write_byte(cmd, (SENSOR_ADDR << 1) | I2C_MASTER_READ, true);
i2c_master_read(cmd, data, 2, I2C_MASTER_LAST_NACK);
i2c_master_stop(cmd);
i2c_master_cmd_begin(I2C_NUM_0, cmd, pdMS_TO_TICKS(1000));
i2c_cmd_link_delete(cmd);
```

## RTOS (FreeRTOS)

```c
// Task creation
void sensor_task(void *pvParameters) {
    while (1) {
        float temp = read_temperature();
        xQueueSend(data_queue, &temp, portMAX_DELAY);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
xTaskCreate(sensor_task, "sensor", 4096, NULL, 5, NULL);

// Mutex for shared resources
SemaphoreHandle_t spi_mutex = xSemaphoreCreateMutex();
if (xSemaphoreTake(spi_mutex, pdMS_TO_TICKS(100)) == pdTRUE) {
    spi_transfer(data);
    xSemaphoreGive(spi_mutex);
}
```

## IoT Protocols

### MQTT
```c
// ESP-IDF MQTT client
esp_mqtt_client_config_t mqtt_cfg = {
    .broker.address.uri = "mqtt://broker.hivemq.com",
};
esp_mqtt_client_handle_t client = esp_mqtt_client_init(&mqtt_cfg);
esp_mqtt_client_start(client);
esp_mqtt_client_publish(client, "/sensors/temp", "23.5", 0, 1, 0);
```

### Key IoT Protocols
| Protocol | Transport | Use Case |
|----------|-----------|----------|
| **MQTT** | TCP/TLS | Pub/sub messaging, telemetry |
| **CoAP** | UDP/DTLS | Constrained devices, REST-like |
| **BLE** | Radio | Short-range, low power |
| **LoRaWAN** | Radio | Long-range, low data rate |
| **Matter** | IP | Smart home interoperability |

## Best Practices
- **Power management:** Deep sleep modes, wake-on-interrupt, duty cycling
- **Watchdog timers:** Always enable, reset periodically, catch firmware hangs
- **OTA updates:** Dual partition scheme, rollback on boot failure, signature verification
- **Memory:** Static allocation preferred, avoid heap fragmentation, use memory pools
- **Testing:** Hardware-in-the-loop (HIL), mock hardware interfaces for unit tests
