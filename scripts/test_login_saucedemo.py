
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture
def driver():
    # Abrir navegador Chrome
    browser = webdriver.Chrome()
    browser.maximize_window()

    yield browser

    # Cerrar navegador al terminar
    browser.quit()


def test_login_exitoso(driver):

    wait = WebDriverWait(driver, 10)

    # Abrir aplicación
    driver.get("https://www.saucedemo.com/")

    # Capturar usuario
    usuario = wait.until(
        EC.visibility_of_element_located((By.ID, "user-name"))
    )
    usuario.send_keys("standard_user")

    # Capturar contraseña
    driver.find_element(
        By.ID, "password"
    ).send_keys("secret_sauce")

    # Ejecutar login
    driver.find_element(
        By.ID, "login-button"
    ).click()

    # Validar que ingrese al inventario
    wait.until(EC.url_contains("inventory"))

    assert "inventory" in driver.current_url

    # Validar que se muestre el inventario
    lista_productos = wait.until(
        EC.visibility_of_element_located(
            (By.CLASS_NAME, "inventory_list")
        )
    )

    assert lista_productos.is_displayed()


def test_login_invalido(driver):

    wait = WebDriverWait(driver, 10)

    # Abrir aplicación
    driver.get("https://www.saucedemo.com/")

    # Capturar usuario incorrecto
    driver.find_element(
        By.ID, "user-name"
    ).send_keys("usuario_incorrecto")

    # Capturar contraseña incorrecta
    driver.find_element(
        By.ID, "password"
    ).send_keys("clave_incorrecta")

    # Ejecutar login
    driver.find_element(
        By.ID, "login-button"
    ).click()

    # Esperar el mensaje de error
    mensaje = wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "[data-test='error']")
        )
    )

    # Validar mensaje
    assert "Username and password do not match" in mensaje.text
